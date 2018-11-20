<template>
  <div class="app-container">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">

      <el-form-item label="名称">
        <el-input v-if="!isDetail" v-model="formData.name"/>
        <span v-if="isDetail">{{formData.name}}</span>
      </el-form-item>

      <el-form-item label="库存">
        <el-input v-if="!isDetail" v-model="formData.stock"/>
        <span v-if="isDetail">{{formData.stock}}</span>
      </el-form-item>

      <el-form-item label="价格">
        <el-input v-if="!isDetail" v-model="formData.price"/>
        <span v-if="isDetail">{{formData.price}}</span>
      </el-form-item>

      <el-form-item label="备注">
        <el-input
          v-if="!isDetail"
          type="textarea"
          :rows="2"
          placeholder="备注"
          v-model="formData.remark">
        </el-input>
        <span v-if="isDetail">{{formData.remark}}</span>
      </el-form-item>

      <el-form-item v-if="!isDetail">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {getEditInfo} from '@/api/product/modify'

  export default {
    name: "isDetail",
    props: ["isDetail", "detailId"],
    data() {
      return {
        formData: {
          id: null,
          name: null,
          stock: null,
          price: null,
          remark: null,
        },
        rules:{}
      };
    },
    mounted: function () {
      this.getEditInfo();
    },
    filters: {

    },
    methods: {
      getEditInfo() {
        getEditInfo({detailId: this.detailId}).then(response => {
          let res = response.data;
          if(res.success){
            this.formData = res.resultMap.items || []
          }
        })
      },
      onSubmit(){
        this.$refs.formData.validate(valid => {
          if (valid) {
            console.log('表单校验通过!')
          } else {
            console.log('表单校验不通过!')
            return false
          }
        })
      }
    }
  }


</script>

<style scoped>
</style>
