<template>
  <div class="problem">
        <h4>{{data.title}}</h4>
        <div class="info">
          <p v-show="data.p1">{{data.p1}}</p>
          <!-- <img :src="data.img1" v-show="data.img1" width="200" height="150" alt="只是一张表情包"/> -->
          <p v-show="data.p2">{{data.p2}}</p>
          <!-- <img :src="data.img2" v-show="data.img2" width="200" height="150" alt="只是一张表情包"/> -->
          <p v-show="data.p3">{{data.p3}}</p>
        </div>
  </div>
</template>

<script>
export default {
    name:'problem',
    props:{
      data:Object
    }
}
</script>

<style scoped>
.info{
  font-size: 14px;
}
</style>