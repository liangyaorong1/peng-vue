<template>
  <div class="chat">
    <!--购买宝贝-->
    <el-dialog title="购买宝贝" :visible.sync="data.buyBabyDialogVisible" width="35%" center>
      <div class="goodsInfo-box">
        <!--商品详情-->
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div style="display: flex;align-items: center;" class="box">
            <div class="img" style="width: 150px;height: 120px;padding: 10px;">
              <img :src="data.chatInfo.goodsUrl" style="width: 100%;height: 100%" />
            </div>

            <div class="info" style="width: 100%;height: 100%;">
              <!--内容-->
              <p style="margin: 0;">{{ data.chatInfo.goodsContent }}</p>
              <p style="margin: 0;">交易地点:{{ data.chatInfo.goodsAddress }}</p>
              <p style="margin: 0;">支付方式:<el-radio v-model="data.radio" label="1" style="margin-left:10px;">线下支付
                </el-radio>
              </p>
              <!--价格-->
              <p style="text-align:right;color:red;margin-right: 10px;">${{ data.chatInfo.goodsPrice }}</p>
            </div>
          </div>
        </el-card>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="data.buyBabyDialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="addOrder()">确定购买</el-button>
      </span>
    </el-dialog>

    <b-container class="bv-example-row">
      <b-row>
        <el-card class="box-card">
          <b-row>
            <div slot="header" class="clearfix" style="text-align: left;">
              <!-- <router-link to="/goodsinfo"><i class="el-icon-arrow-left"></i></router-link> -->
              
              <span>{{ data.chatInfo.nickName }}</span>
              <!--想要的商品信息-->
              <div class="goods-info">
                <div class="img">
                  <img :src="data.chatInfo.goodsUrl" />
                </div>
                <div class="info">
                  <div>
                    <p>￥{{ data.chatInfo.goodsPrice }}</p>
                    <p style="font-size: 12px;color: rgb(205, 205, 205);margin-left: 5px;">交易前聊聊</p>
                  </div>
                  <el-button type="danger" size="mini" style="height:30px" @click="openBuyBaby()">立刻购买</el-button>
                </div>
              </div>
            </div>
          </b-row>
          <b-row>
            <div class="text item">
              <!--聊天默认显示文本-->
              <div class="text-defalut">
                <div align="left" style="overflow:auto;text-align:center;">
                  <!--时间-->
                  <p>{{ new Date() }}</p>
                  <!--文本-->
                  <p>为确保您资金安全，请遵守规范一定在平台内成交。</p>
                  <!--聊天框-->
                  <div class="contact-box" id="contact-box" style="color:black;">
                    <div class="box" v-for="(item, index) in data.chatList" :key="index">
                      <div align="right" style="margin-right:20px;" v-if="item.fromName == data.user">
                        <p>{{ item.created }} &nbsp;&nbsp; {{ item.fromName }}</p>
                        <p style="margin-left: 20px;">{{ item.msg }}</p>
                      </div>
                      <div align="left" v-else>
                        <div>
                          <p>{{ item.created }} &nbsp;&nbsp; {{ item.fromName }}</p>
                          <p style="margin-left: 20px;">{{ item.msg }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--发送-->
              <div class="contact-btn">
                <el-input v-model="data.message.msg" placeholder="请输入聊天内容">
                  <template slot="append">
                    <el-button @click="send">发送</el-button>
                  </template>
                </el-input>
              </div>
            </div>
          </b-row>

        </el-card>
      </b-row>
    </b-container>

  </div>

</template>

<script>
import contact from '../assets/js/chat'
export default {
  ...contact
}
</script>

<style scoped src="../assets/css/chat.css">
</style>