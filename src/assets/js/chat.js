import { mapGetters } from "vuex";
let socket = null;
export default {
  name: "chat",
  computed: {
    ...mapGetters(["goodsId", "userInfo", "toName"]),
  },
  data() {
    return {
      data: {
        //登录用户
        user: "",
        //消息记录列表
        msgList: [],
        //全部消息
        chatList: [],
        buyBabyDialogVisible: false,
        radio: "1",
        message: {
          time: null, //时间
          to: "", //发给谁
          from: "", //谁接收
          msg: "", //消息
          goodsId: "", //商品编号
          url: "",
        },
        chatInfo: {},
        //在线用户列表
        userList: [],
        content: "", //聊天内容
      },
    };
  },
  methods: {
    //发送信息
    send() {
      if (!this.data.message.msg) {
        this.$message.info("请输入聊天信息");
      } else {
        if (typeof WebSocket == "undefined") {
          this.$message.info("您的浏览器不支持WebSocket");
        } else {
          this.data.message.to = this.toName; //接受方
          this.data.message.from = this.data.user; //接受方
          this.data.message.time = new Date().toLocaleTimeString();
          this.data.message.goodsId = this.data.chatInfo.id; //商品编号
          this.data.message.url = this.data.chatInfo.goodsUrl;

          this.createContent(this.data.user, null, null);
          const data = {
            goodsId: this.data.message.goodsId,
            fromName: this.data.message.from,
            //toName: localStorage.getItem("goodsUserName"),
            toName: this.toName,
            msg: this.data.message.msg,
            lastTime: this.data.message.time,
            url: this.data.message.url,
            userId: this.userInfo.id,
          };
          console.log(data);
          //将聊天记录保存到数据库中
          this.$api.chat.saveSend(data).then((res) => {
            if (res.code === 200) {
              console.log("success");
              this.queryAll();
            } else {
              console.log("error");
            }
          });
          socket.send(JSON.stringify(this.data.message));

          this.data.message.msg = "";
        }
      }
    },
    createContent(nowUser, remoteUser, data) {
      console.log(data);
      let html = "";
      //当前用户消息
      if (nowUser) {
        html = `
                    <div align="right">
                        <p>${new Date().toLocaleTimeString()} &nbsp;&nbsp; ${
          this.data.user
        }</p>
                        <p style="margin-left: 20px;">${
                          this.data.message.msg
                        }</p>
                    </div>
                `;
      } else if (remoteUser) {
        html = `
                    <div align="left">
                        <div>
                            <p>${data.time}&nbsp;&nbsp;${data.from}</p>
                            <p style="margin-left: 20px;">${data.msg}</p>
                        </div>
                    </div>
                `;
      }
      this.data.content += html;
    },
    //全部消息记录模板
    content(data) {
      let html = "";
      //当前用户消息
      html = `
                    <div align="right">
                        <p>${data.created} &nbsp;&nbsp; ${data.fromName}</p>
                        <p style="margin-left: 20px;">${data.msg}</p>
                    </div>
                `;
      html += `
                    <div align="left" style="overflow-x: auto;">
                        <div>
                            <p>${data.created}&nbsp;&nbsp;${data.toName}</p>
                            <p style="margin-left: 20px;">${data.msg}</p>
                        </div>
                    </div>
                `;
      this.data.content += html;
    },
    init() {
      //如果store没有登录的用户信息则跳转到登录页面
      this.data.user = this.userInfo.nickName;
      console.log(this.userInfo);
      const user = this.data.user;
      if (!user) {
        this.$router.push({ path: "/login", query: { activeName: "first" } });
        return this.$message.error("Please log in as user");
      }
      let that = this;
      if (typeof WebSocket == "undefined") {
        //如果WebSocket对象的类型为undefined
        this.$message.info("您的浏览器不支持WebSocket");
      } else {
        let socketUrl = "ws://localhost:8070/api/socket/" + this.data.user;
        if (socket != null) {
          socket.close();
          socket = null;
        }
        //开启WebSocket的服务
        socket = new WebSocket(socketUrl);
        //打开事件
        socket.onopen = function () {
          console.log("WebSocket已打开");
        };
        socket.onmessage = function (msg) {
          console.log("收到消息====" + msg.data);
          let data = JSON.parse(msg.data);
          console.log(data);
          // if(that.toName){

          // }
          // that.data.message.to = that.toName;

          if (data.userNickNames) {
            that.queryAll();

            //获取在线人数
            //过滤掉自己昵称
            that.data.userList = data.userNickNames.filter(
              (item) => item.nickName !== that.data.user
            );
          } else {
            that.queryAll();
          }
        };
      }
    },
    //显示商品的全部聊天信息
    queryAll() {
      //   const goodsId = this.goodsId;  这里不能只存商品id
      let params = {
        goodsId: this.goodsId,
        //toName: localStorage.getItem("goodsUserName"),
        toName: this.toName,
        fromName: this.userInfo.nickName,
      };
      this.$api.chat.queryAll(params).then((res) => {
        if (res.code === 200) {
          this.data.chatList = res.data;
          console.log(this.data.chatList);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //立刻购买
    openBuyBaby() {
      this.data.buyBabyDialogVisible = true;
    },
    //生成订单
    addOrder() {
      console.log(this.chatinfo);
      const data = {
        userId: this.userInfo.id,
        goodsId: this.data.chatInfo.id,
        seller: this.data.chatInfo.nickName,
        orderName: this.data.chatInfo.goodsName,
        orderPrice: this.data.chatInfo.goodsPrice,
        orderUrl: this.data.chatInfo.goodsUrl,
        orderNum: this.data.chatInfo.goodsNum,
      };
      this.$api.order.add(data).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.$router.push("/order");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    queryItem() {
      const goodsId = this.goodsId;
      this.$api.goods.queryItem(goodsId).then((res) => {
        if (res.code === 200) {
          this.data.chatInfo = res.data;
          // if(this.toName==""){
          //     this.data.message.to=res.data.nickName;
          // }

          //this.$store.commit('setToName',res.data.nickName);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
  created() {
    this.queryItem();
  },
  mounted() {
    this.init();
    this.queryAll();
  },
};
