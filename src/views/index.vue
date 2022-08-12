<template>
  <div class="index">
    <b-container class="bv-example-row">
      <b-row>
        <headBar></headBar>
      </b-row>
      <b-row>
        <card  :title="'Latest second-hand goods'" :data="getGoods"></card>
      </b-row>
    </b-container>
    
     <!-- <card :title="'二手商品'"></card> -->
  </div>
</template>

<script>
import index from '../assets/js/index'
export default{
  ...index,
}
</script>

<style scoped>
.index{
    width: 100%;
    padding-left: 0px;
    background-color: #fff;
    position: relative;
}
</style>