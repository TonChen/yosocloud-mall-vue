<template>
  <ProductDetail :is-detail="false" />
</template>

<script>
  import {getList} from '@/api/product'
  import ProductDetail from './components/detail'

  export default {
    name:"ProductAdd",
    components:{ProductDetail},
    data() {
      return {

      }
    },
    filters: {

    },
    created() {
    },
    methods: {

    }
  }
</script>
