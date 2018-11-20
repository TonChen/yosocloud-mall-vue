<template>
  <ProductDetail :is-detail="isDetail || false" :detail-id="(this.$route.params.id || this.detailId)"/>
</template>

<script>
  import {getList} from '@/api/product'
  import ProductDetail from './components/detail'

  export default {
    name: "ProductEdit",
    components: {ProductDetail},
    props: ["detailId", "isDetail"],
    data() {
      return {}
    },
    filters: {},
    created() {
    },
    methods: {}
  }
</script>
