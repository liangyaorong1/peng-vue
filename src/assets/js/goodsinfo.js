import headBar from "../../components/headBar/headBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "goodsinfo",
  components: {
    headBar,
  },
  computed: {
    ...mapGetters(["id"]),
  },
  data() {
    return {
      data: {
        contentText: "",
        comments: [],
        goodsInfo: {},
      },
    };
  },
  created() {
    this.queryItem();
    this.queryAll();
  },
  methods: {
    queryItem() {
      const goodsId = this.id;
      this.$api.goods.queryItem(goodsId).then((res) => {
        if (res.code === 200) {
          this.data.goodsInfo = res.data;
          //console.log(this.data.chatInfo);
          //this.data.message.to=res.data.nickName;
          //this.$store.commit('setToName',res.data.nickName);
          //将发布商品id的userid记录下来
          //localStorage.setItem("goodsUserName", res.data.nickName);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //添加评论
    push() {
      if (this.data.contentText == "") {
        returnthis.$message.info("请输入留言内容");
      }
      const data = {
        userId: this.$store.state.user.userInfo.id,
        goodsId: this.id,
        content: this.data.contentText,
      };
      this.$api.leavingMessage
        .push(data)
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("发布成功");
            this.data.contentText == "";
            this.queryAll();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    //显示评论
    queryAll() {
      let goodsId = this.id;
      this.$api.leavingMessage.queryAll(goodsId).then((res) => {
        if (res.code === 200) {
          this.data.comments = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //我想要,前往在线联系页面
    toChat(val) {
      console.log(val);
      this.$store.dispatch("setGoodsId", val.id);
      this.$store.dispatch("setToName", val.nickName);
      this.$router.push("/chat");
    },
  },
};
