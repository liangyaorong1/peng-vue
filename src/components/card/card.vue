<template>
    <div class="cards">
        <div class="nav-title">
            <span>—{{ title }}—</span>
        </div>
        <div class="index">
            <b-container class="bv-example-row">
                <b-row>
                    <el-card>
                        <div v-if="data.length>0" style="display:flex;justify-content:center;flex-wrap: wrap;flex-direction: row;align-content:space-between;">
                            <el-card class="box-card" v-for="(item,index) in data" :key="index" @click.native="to(item.id)">
                                <img :src="item.goodsUrl"
                                    class="image">
                                <div style="padding: 3px;">
                                    <div style="width:100%">
                                        <span style="float:left">{{item.goodsName}}</span>
                                        <span style="float:right;font-weight: bold;">Price:${{item.goodsPrice}}</span>
                                    </div>
                                    
                                    <div class="bottom clearfix">
                                        <time class="time" style="font-size:14px">Release time:{{item.created}}</time>
                                        <!-- <el-button type="text" class="button">了解商品</el-button> -->
                                    </div>
                                </div>
                            </el-card>
                        </div>
                        <el-empty v-else description="找不到该商品"></el-empty>
                    </el-card>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        title: String,
        data: Array
    },
    methods:{
        to(item){
            this.$store.commit('setId',item)
            this.$router.push('/goodsinfo');
        }
    }
}
</script>

<style scoped>
.cards .nav-title {
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 28px;
    color: #8e8e8e;
    position: relative;
    margin-top: 20px;
}


img {
    width: 200px;
    height: 150px;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.bottom {
    margin-top: 35px;
    line-height: 17px;
}

.button {
    padding: 0;
    float: right;
}
.time{
    float: left;
}

.box-card {
    
    width: 250px;
    margin: 0 2% 2% 2%;
    cursor: pointer;
}
</style>