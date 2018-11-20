<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input clearable placeholder="名称" v-model="queryForm.name" style="width: 200px;" class="filter-item" @keyup.enter.native="queryHandle"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="queryHandle">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="add">新增</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column type="index" fixed sortable="custom" align="center" width="65">  </el-table-column>

      <el-table-column label="ID" prop="id" width="110px" align="center">
      </el-table-column>

      <el-table-column label="名称" prop="name" width="110px" align="center">
      </el-table-column>

      <el-table-column label="库存" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.stock }}</span>
        </template>
      </el-table-column>

      <el-table-column label="价格" min-width="100px">
        <template slot-scope="scope">
          <span class="link-type" @click="edit(scope.row)">{{ scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" prop="remark" width="250px" align="center">
      </el-table-column>

      <el-table-column label="时间" prop="createTime" width="200px" align="center">
      </el-table-column>

      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/product/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <!--<el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>-->
          <el-button size="mini" type="danger" @click="show(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <!--<ProductEdit v-if="dialogStatus === 'update'" />-->
        <ProductEdit v-if="dialogStatus === 'detail'" :detailId="rowId" :isDetail="true"/>
        <ProductAdd  v-if="dialogStatus === 'create'" />
    </el-dialog>

    <pagination v-show="totalCount>0" :total="totalCount" :page.sync="queryForm.pageNumber" :limit.sync="queryForm.pageSize" @pagination="getList" />

  </div>
</template>

<script>
  import waves from '@/directive/waves'
  import { parseTime } from '@/utils'
  import {getList} from '@/api/product'
  import Pagination from '@/components/Pagination'
  import ProductEdit from './edit'
  import ProductAdd from './add'

  export default {
  name:"ProductList",
  components: { Pagination, ProductAdd,  ProductEdit},
  directives: { waves },
  data() {
    return {
      dialogFormVisible: false,
      tableKey: 0,
      tableData: [],
      totalCount:0,
      tableStyle: "width:100%;",
      queryForm:{
        id:null,
        pageNumber:1,
        pageSize:10,
        orderBy:"create_time",
        orderType:"DESC",

        name:null,
      },
      rowId:null,
      listLoading: true,
      downloadLoading: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        detail: '详情'
      },
    }
  },
  filters: {
    dateFormatter(){
      return new Date();
    }
  },
  created() {
    this.getList()
  },
  methods: {
    add(){
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    edit(row){
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    show(row){
      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
      this.rowId = row.id;
    },
    queryHandle() {
      this.queryForm.pageNumber = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.queryForm.orderBy = '+id'
      } else {
        this.queryForm.orderBy = '-id'
      }
      this.queryHandle()
    },
    getList() {
      this.listLoading = true
      getList(this.queryForm).then(response => {
        let res = response.data;
        if(res.success){
          this.tableData = res.resultMap.items || []
          this.totalCount = res.total || 0;
        }
        this.listLoading = false
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['名称', '库存', '价格', '备注', '创建时间']
        const filterVal = ['name', 'stock', 'price', 'remark', 'createTime']
        const data = this.formatJson(filterVal, this.tableData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '商品信息',
          bookType: 'xlsx' //非必填:xlsx, csv, txt and more,see : https://github.com/SheetJS/js-xlsx#supported-output-formats
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.queryForm.pageNumber = val;
      this.getData();
    },
  }
}
</script>
