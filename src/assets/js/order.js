import headBar from "../../components/headBar/headBar"
export default {
    name:'order',
    components: {
        headBar
    },
    data(){
        return{
            data:{
                activeName:'first',
                orders:[],
                commentText:'',
                showCommentText:false,
                orderId:''

            }
        }
    },
    created() {
        this.queryAll();
    },
    methods: {
        handleClick(){

        },
        queryAll(){
            const userId=this.$store.state.user.userInfo.id;
            this.$api.order.queryAll(userId).then(res=>{
                if(res.code===200){
                    this.data.orders=res.data;
                }else{
                    this.$message.error(res.msg)
                }
            }).catch(err=>{
                this.$message.error("服务器出现异常，请联系管理员")
            })
        },
        updateStatus(id){
            this.$confirm('确定收货？', '提示', { type: 'warning' })
            .then(()=>{
                this.$api.order.updateStatus(id).then(res=>{
                    if(res.code===200){
                        this.$message.success("交易完成");
                        this.queryAll();
                    }else{
                        this.$message.success(res.msg);
                    }
                }).catch(err=>{
                    this.$message.error(res.msg);
                })
            }).catch(err=>{
                this.$message.error("取消收货");
            }) 
        },
        //点评
        comment(val){
            if(this.data.commentText==""){
                return this.$message.info("Please enter the comments")
            }
            const data={
                userId: this.$store.state.user.userInfo.id,
                goodsId: val,
                content: this.data.commentText
            }
            
            this.$api.leavingMessage.push(data).then(res=>{
                if(res.code===200){
                    this.$message.success("点评成功")
                    this.data.commentText="";
                }else{
                    this.$message.error(res.msg);
                }
            })
        }
    }
}