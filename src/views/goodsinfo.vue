<template>
  <div class="goodsinfo">
    <b-container class="bv-example-row">
      <b-row>
        <headBar></headBar>
      </b-row>
      <b-row>
        <div class="goodsinfo-box">
          <el-card class="box-card">
            <div class="text item">
              <div class="img">
                <img :src="data.goodsInfo.goodsUrl" />
              </div>
              <div class="info">
                <!--商品名称-->
                <h3>{{ data.goodsInfo.goodsName }}</h3>
                <p style="color: red; font-weight: 700; font-size: 20px">
                  Second hand price:${{ data.goodsInfo.goodsPrice }}
                </p>
                <div class="line"></div>
                <div style="font-size: 17px; margin-top: 5%">
                  <p>
                    <el-tag type="success">Item No</el-tag>
                    {{ data.goodsInfo.id }}
                  </p>
                  <p>
                    <el-tag type="success">Release time</el-tag>
                    {{ data.goodsInfo.created }}
                  </p>
                  <p>
                    <el-tag type="success">Place of transaction</el-tag>
                    {{ data.goodsInfo.goodsAddress }}
                  </p>
                  <p>
                    <el-tag type="success">Commodity quantity</el-tag>
                    {{ data.goodsInfo.goodsNum }}
                  </p>
                  <p>
                    <el-tag type="success">seller</el-tag>
                    {{ data.goodsInfo.nickName }}
                  </p>
                  <p>
                    <el-tag type="success">Product introduction</el-tag>
                    {{ data.goodsInfo.goodsContent }}
                  </p>
                  <p
                    style="text-align: center"
                    v-show="
                      data.goodsInfo.nickName !==
                      this.$store.state.user.userInfo.nickName
                    "
                  >
                    <b-button
                      variant="danger"
                      size="lg"
                      @click="toChat(data.goodsInfo)"
                      >I want</b-button
                    >
                  </p>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="box-card" style="margin-top: 3%">
            <div class="comment">
              <h4>Leaving a message.</h4>
              <div class="comment-body">
                <div style="margin-bottom: 1%">
                  <el-input
                    v-model="data.contentText"
                    placeholder="Write down your message..."
                  >
                    <template slot="append">
                      <el-button @click="push()">release</el-button>
                    </template>
                  </el-input>
                </div>
                <div
                  class="body"
                  v-for="(item, index) in data.comments"
                  :key="index"
                >
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      font-size: 14px;
                    "
                  >
                    <p style="font-weight: 700">{{ item.nickName }}</p>
                    <p>{{ item.created }}</p>
                  </div>
                  <div style="font-size: 16px; text-align: left">
                    <p style="margin-left: 2%">{{ item.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import goodinfo from "../assets/js/goodsinfo";
export default {
  ...goodinfo,
};
</script>

<style scoped src="../assets/css/goodsinfo.css"></style>
