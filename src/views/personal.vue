<template>
    <div class="personal">
        <b-container class="bv-example-row">
            <b-row>
                <headBar></headBar>
            </b-row>
            <b-row>
                <el-tabs v-model="data.activeName" @tab-click="handleClick">
                    <el-tab-pane label="Personal Center" name="first">
                        <b-container class="bv-example-row">
                            <b-row>
                                <b-col>
                                    <el-card class="box-card">
                                        <div slot="header" class="clearfix">
                                            <span>personal information</span>
                                        </div>
                                        <div class="text item">
                                            <div style="text-align:left;">
                                                <p>username：{{ userInfo.username }}</p>
                                                <p>nickname：{{ userInfo.nickName }}</p>
                                            </div>
                                        </div>
                                    </el-card>
                                </b-col>
                                <b-col>
                                    <el-card class="box-card" style="height: 450px;">
                                        <div slot="header" class="clearfix">
                                            <span>news</span>
                                        </div>
                                        <div class="text item">
                                            <div class="message-list">
                                                <div v-if="data.msgList.length == 0">
                                                    You have no message
                                                </div>
                                                <div v-else class="list" style="text-align:left;
                                                    display:flex;
                                                    justify-content: space-between;
                                                    margin-bottom: 10px;
                                                    cursor: pointer;
                                                    " v-for="(item, index) in data.msgList" :key="index"
                                                    @click="toChat(item)">
                                                    <div>
                                                        <p style="margin:0">
                                                            {{ item.toName}}
                                                        </p>
                                                        <p style="margin:0">{{ item.msg }}</p>
                                                        <p style="margin:0">{{ item.created }}</p>
                                                    </div>
                                                    <div class="img">
                                                        <img :src="item.url" width="50px" height="50px">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-card>
                                </b-col>
                            </b-row>
                        </b-container>
                    </el-tab-pane>

                    <el-tab-pane label="All orders" name="second">
                        <el-card class="box-card" style="margin-top:20px;">
                            <div class="text item" style="text-align:left;font-weight: 700;">
                                <div class="order-item">
                                    <div class="item">
                                        <div v-if="data.orders.length == 0">
                                            You have no order
                                        </div>
                                        <el-card v-else class="box-card" style="margin-bottom: 10px;"
                                            v-for="(item, index) in data.orders" :key="index">
                                            <div slot="header" class="clearfix">
                                                <div style="display:flex;justify-content: space-between;">
                                                    <div>{{ item.created }}</div>
                                                    <div>{{ item.seller }}</div>
                                                    <div style="color:red;">{{ item.status == 0 ? 'To be traded' :
                                                            'Transaction completion'
                                                    }}</div>
                                                </div>
                                            </div>
                                            <div class="text item" style="display:flex;align-items: center;">
                                                <img :src="item.orderUrl" width="80px" height="80px" />
                                                <div class="info" style="margin-left:10px;width: 100%;">
                                                    <div
                                                        style="width: 100%;display:flex;justify-content:space-between;">
                                                        <div>{{ item.orderName }}</div>
                                                        <div>${{ item.orderPrice }}</div>
                                                    </div>
                                                    <p style="text-align: right;">
                                                        ✖️{{ item.orderNum }}
                                                    </p>
                                                    <div style="display:flex;justify-content: flex-end;">
                                                        <div style="margin-right: 10px;">Actual
                                                            payment:${{ item.orderPrice * item.orderNum }}</div>
                                                        <el-button v-show="item.status === 0" type="danger" size="mini"
                                                            @click="updateStatus(item.id)">Confirm receipt</el-button>
                                                        <el-button v-show="item.status===1" size="mini" type="warning" @click="openComment(index)">点评</el-button>
                                                    </div>
                                                </div>
                                            </div>
                                            <el-input v-show="data.commentIndex==index" style="margin-top:15px;"
                                                v-model="data.commentText" placeholder="Please enter the comments">
                                                <template slot="append">
                                                    <el-button @click="comment(item.goodsId)">发布</el-button>
                                                </template>
                                            </el-input>
                                        </el-card>
                                    </div>
                                </div>

                            </div>
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane label="Help documentation" name="third">
                        <el-card class="box-card" style="margin-top:20px;">
                            <div class="text item" style="text-align:left;font-weight: 700;">
                                <el-row class="tac">
                                    <el-container>
                                        <el-container>
                                            <el-aside width="300px">
                                                    <el-menu default-active="1" class="el-menu-vertical-demo"
                                                        @open="handleOpen" @close="handleClose"
                                                        @select="handleSelect"
                                                        background-color="#545c64" text-color="#fff"
                                                        active-text-color="#ffd04b">
                                                        <el-submenu index="1">
                                                            <template slot="title">
                                                                <span>common problem</span>
                                                            </template>
                                                            <el-menu-item-group>
                                                                <el-menu-item :index="item.index" v-for="(item,index) in problems " :key="index" @click="toProblem(item)">{{item.title}}</el-menu-item>
                                                            </el-menu-item-group>
                                                        </el-submenu>
                                                    </el-menu>
                                            </el-aside>
                                            <el-main>
                                                <problem :data="problem" ></problem>
                                            </el-main>
                                        </el-container>
                                    </el-container>
                                </el-row>
                            </div>
                        </el-card>
                    </el-tab-pane>
                </el-tabs>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import personal from '../assets/js/personal'
export default {
    ...personal
}
</script>

<style scoped src="../assets/css/personal.css">
</style>