import headBar from "../../components/headBar/headBar.vue";
import problem from "../../components/problem/problem.vue";
import { mapGetters } from "vuex";
export default {
  name: "personal",
  components: {
    headBar,
    problem,
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      data: {
        activeName: "first",
        msgList: [],
        orders: [],
        commentText: "",
        showCommentText: false,
        orderId: "",
        commentIndex: "",
      },
      problem: {
        title: "", //标题
        p1: "",
        img1: "",
        p2: "",
        img2: "",
        p3: "",
      },
      problems: [
        {
          index: "1-1",
          title: "How to register an account?",
          p1: '1. Open the home page, click the "register" button at the top right;',
          p2: "2. Enter the registration page, please fill in your email, password and other information to complete the registration;",
          p3: "3. login was successful",
        },
        {
          index: "1-2",
          title: "How to reset password?",
          p1: "1. Open the login page;",
          p2: "2. Click forget password",
          p3: "3. Fill in your email and new password and complete the password reset",
        },
        {
          index: "1-3",
          title: "How to contact the seller?",
          p1: "1. Click commodity",
          p2: "2. Enter the commodity details;",
          p3: "3. Click the dialogue I want to have with the merchant before the transaction.",
        },
        {
          index: "1-4",
          title: "How to view personal information?",
          p1: '1. Click the "user" drop-down button in the navigation bar',
          p2: "2. Click personal center inside.",
        },
        {
          index: "1-5",
          title: "How to buy goods?",
          p1: "1. Click commodity",
          p2: "2. Enter the commodity details;",
          p3: "3. Click I want to enter the chat interface and click buy now",
        },
        {
          index: "1-6",
          title: "How to view an order?",
          p1: '1. Click the "user" drop-down button in the navigation bar',
          p2: "2. Click personal center inside;",
          p3: "3. After entering the personal center, click all orders",
        },
        {
          index: "1-7",
          title: "How to view messages?",
          p1: '1. Click the "user" drop-down button in the navigation bar',
          p2: "2. Click personal center inside;",
          p3: "3. After entering the personal center, you can see the message",
        },
        {
          index: "1-8",
          title: "How to publish goods?",
          p1: '1. Click "I want to sell" in the navigation bar',
          p2: "2. Enter the release interface, please fill in your product information and complete the release",
          p3: "3. Publish successfully",
        },
      ],
    };
  },
  created() {
    this.init();
    this.data.activeName = this.$route.query.activeName;
    this.queryGroupByGoodsId();
    this.queryAll();
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
    },
    init() {
      const user = this.userInfo.username;
      console.log(user);
      if (!user) {
        this.$router.push({ path: "/login", query: { activeName: "first" } });
        return this.$message.error("Please log in as user");
      }
    },
    //消息列表
    queryGroupByGoodsId() {
      let user = JSON.parse(localStorage.getItem("USER_INFO"));
      console.log(user);
      this.$api.chat.queryGroupByGoodsId(user.nickName).then((res) => {
        if (res.code === 200) {
          this.data.msgList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //点击聊天记录进入到聊天窗口中
    toChat(val) {
      console.log(val);
      console.log(val.toName);
      //localStorage.setItem("goodsUserName", val.toName);
      this.$store.dispatch("setToName", val.toName); //向哪个用户发送信息
      this.$store.dispatch("setGoodsId", val.goodsId); //商品编号
      setTimeout(() => {
        this.$router.push("/chat");
      }, 1000);
    },
    queryAll() {
      const userId = this.userInfo.id;
      this.$api.order.queryAll(userId).then((res) => {
        if (res.code === 200) {
          this.data.orders = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    updateStatus(id) {
      this.$confirm("Confirm receipt?", "Tips", { type: "warning" }).then(
        () => {
          this.$api.order
            .updateStatus(id)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("Transaction completion");
                this.queryAll();
              } else {
                this.$message.success(res.msg);
              }
            })
            .catch((err) => {
              this.$message.error(res.msg);
            });
        }
      );
    },
    openComment(index) {
      this.data.commentIndex = index;
    },
    //点评
    comment(val) {
      if (this.data.commentText == "") {
        return this.$message.info("Please enter the comments");
      }
      const data = {
        userId: this.userInfo.id,
        goodsId: val,
        content: this.data.commentText,
      };

      this.$api.leavingMessage.push(data).then((res) => {
        if (res.code === 200) {
          this.$message.success("Comments successful");
          this.data.commentText = "";
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toProblem(item) {
      this.problem = {
        title: item.title,
        p1: item.p1,
        //img1:item.img1,
        p2: item.p2,
        // img2:item.img2,
        p3: item.p3,
      };
      console.log(this.problem);
    },
  },
};
