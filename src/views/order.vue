<template>
    <div class="order">
        <headBar></headBar>
        <div class="order-box">
            <b-container class="bv-example-row">
                <b-row>
                    <el-card class="box-card">
                        <div class="text item" style="text-align:left;font-weight: 700;">
                            <span>My order</span>
                        </div>
                    </el-card>
                </b-row>
                <b-row>
                    <el-card class="box-card" style="margin-top:20px;">
                        <div class="text item" style="text-align:left;font-weight: 700;">
                            <el-tabs v-model="data.activeName" @tab-click="handleClick">
                                <el-tab-pane label="All orders" name="first"></el-tab-pane>
                            </el-tabs>
                            <div class="order-item">
                                <div class="item">
                                    <el-card class="box-card" style="margin-bottom: 10px;" v-for="(item, index) in data.orders" :key="index">
                                        <div slot="header" class="clearfix">
                                            <div style="display:flex;justify-content: space-between;">
                                                <div>{{ item.created }}</div>
                                                <div>{{ item.seller }}</div>
                                                <div style="color:red;">{{ item.status == 0 ? 'To be traded' : 'Transaction completion' }}</div>
                                            </div>
                                        </div>
                                        <div class="text item" style="display:flex;align-items: center;">
                                            <img :src="item.orderUrl" width="80px" height="80px" />
                                            <div class="info" style="margin-left:10px;width: 100%;">
                                                <div style="width: 100%;display:flex;justify-content:space-between;">
                                                    <div>{{ item.orderName }}</div>
                                                    <div>${{ item.orderPrice }}</div>
                                                </div>
                                                <p style="text-align: right;">
                                                    ✖️{{ item.orderNum }}
                                                </p>
                                                <div style="display:flex;justify-content: flex-end;">
                                                    <div style="margin-right: 10px;">Actual payment:${{item.orderPrice*item.orderNum}}</div>
                                                    <el-button v-show="item.status===0" type="danger" size="mini" @click="updateStatus(item.id)">Confirm receipt</el-button>
                                                    <!-- <el-button v-show="item.status===1" size="mini" type="warning" @click="comment(item.id)">点评</el-button> -->
                                                </div>
                                            </div>
                                        </div>
                                        <el-input  v-show="item.status===1" style="margin-top:15px;" v-model="data.commentText" placeholder="Please enter the comments">
                                            <template slot="append">
                                                <el-button @click="comment(item.goodsId)">发布</el-button>
                                            </template>
                                        </el-input>
                                    </el-card>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import order from '../assets/js/order'
export default {
    ...order
}
</script>

<style scoped src="../assets/css/order.css">
</style>