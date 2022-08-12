import Cookies from "js-cookie";
import { mapGetters } from "vuex";
export default {
  name: "auth",
  computed: {
    ...mapGetters(["userInfo", "history"]),
  },
  created() {
    //this.queryAll();
  },
  data() {
    return {
      data: {
        sellVisible: false,
        imageUrl: "", //图片显示
        //FormData对象
        newFile: new FormData(),
        //msgList:[],
        errHtml: "",
        contactVisible: false,
      },
      //查询条件
      searchForm: {
        searchText: "",
      },
      form: {
        id: "", //商品编号
        userId: this.$store.state.user.userInfo.id, //用户编号
        goodsUrl: "", //商品图片地址
        goodsName: "", //商品名称
        goodsPrice: "", //置出价格
        goodsNum: "", //置出数量
        goodsAddress: "", //置出地点
        goodsContent: "", //商品介绍
      },
      //联系客服
      contactForm:{
          email:'291848819@qq.com',
          content:''//内容
      },
      //表单验证
      formRules: {
        goodsName: [
          {
            required: true,
            message: "Please enter the product name",
            trigger: "change",
          },
        ],
        goodsPrice: [
          {
            required: true,
            message: "Please enter the commodity price",
            trigger: "change",
          },
        ],
        goodsNum: [
          {
            required: true,
            message: "Please enter the quantity of goods",
            trigger: "change",
          },
        ],
        goodsAddress: [
          {
            required: true,
            message: "Please enter the transaction place",
            trigger: "change",
          },
        ],
        goodsContent: [
          {
            required: true,
            message: "Please enter the product introduction",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted(){
    
  },
  methods: {
    logout() {
      this.$api.login.logout().then((res) => {
        if (res.code === 200) {
          Cookies.remove("token");
          localStorage.clear();
          this.$message.success(res.msg);
          this.$router.push("/index"); // 登出成功，跳转到登录页
          window.location.reload();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //打开卖
    openSell() {
      if (localStorage.getItem("USER_INFO")) {
        this.data.sellVisible = true;
      } else {
        this.$message.error("请先登录用户");
      }
    },
    sell(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.httpRequest();
        setTimeout(() => {
          this.$api.goods.sell(this.form).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              this.data.sellVisible = false;
              this.queryAll();
            } else {
              this.$message.error(res.msg);
            }
          });
        }, 1000);
      });
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        //不等于jpeg和png
        this.$message.warning("上传的头像格式必须是JPG/PNG!");
      }
      if (!isLt2M) {
        this.$message.warning("上传头像的大小不能超过2M!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    onChange(file, fileList) {
      console.log(file.raw);
      this.data.newFile = new FormData();
      this.data.newFile.append("file", file.raw);
      this.data.imageUrl = file.url; //回显头像
    },
    httpRequest() {
      const file = this.data.newFile;
      this.$api.goods
        .upload(file)
        .then((res) => {
          if (res.code === 200) {
            this.form.goodsUrl = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("The server has an exception. Please contact the administrator");
        });
    },
    queryAll() {
      const data = {
        searchText: this.searchForm.searchText,
      };
      this.$api.goods.queryAll(data).then((res) => {
        if (res.code === 200) {
          this.$store.commit("setGoods", res.data);
          this.$router.push({
            path: "/",
            query: {
              search: this.searchForm.searchText,
            }
          });
          // this.data.goods=res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    search() {
      //this.searchForm.searchText=this.$route.query.searchText;
      this.queryAll(); //调用查询方法
      const data = {
        searchText: this.searchForm.searchText,
        maxLen: 4,
      };
      //拿到在输入框中输入的文字
      this.$store.commit("setHistory", data);
    },
    // historySearch(val) {
      
    //   console.log(this.searchForm.searchText);
      
    // },
    handleChange(val) {
      this.data.goodsNum = val;
    },
    // //搜索框监听获取焦点
    // focus() {
    //   const history = document.getElementById("history");
    //   history.style.visibility = "";
    // },
    // //搜索框监听失去焦点
    // blur() {
    //   const history = document.getElementById("history");
    //   history.style.visibility = "hidden";
    // },
    querySearch(queryString,cb){
      const history=this.history;
      console.log(history);
      cb(history);
    },
    autocompleteSelect(item){
      this.searchForm.searchText = item.title;
      this.queryAll(); //调用查询方法
      console.log(item);
    },
    contactCommand() {
      this.data.contactVisible = true;
    },
    sendFeedback(){
      const data={
        email:this.contactForm.email,
        content:this.contactForm.content
      }
      this.$api.auth.sendFeedback(data).then(res=>{
        if(res.code===200){
            this.$message.success("Sent successfully");
            this.data.contactVisible=false;
        }else{
          this.$message.error(res.msg);
        }
      }).catch(err=>{
        this.$message.error("The server has an exception. Please contact the administrator");
      })
    },
    toDocumentation(){
      this.$router.push({path:'/personal',query:{activeName:'third'}});
    }
  }
};
