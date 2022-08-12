// import Cookies from "js-cookie";
export default {
    state: {
        history:JSON.parse(localStorage.getItem("HISTORYS")) || [] //浏览记录
    },
    getters: {
        //获取用户信息
        history(state){
            return state.history;
        }
    },
    mutations: {
        setHistory(state, perms){
           let history=localStorage.getItem("HISTORY");//浏览记录{}
            //判断是否存储值
            if(!history){
                history={};
            }else{
                history=JSON.parse(history);

            } 
            history["title"]=perms.searchText;//{title:'sss'}
            
            localStorage.setItem("HISTORY",JSON.stringify(history));

            const index=state.history.findIndex((i)=>{
                return i.title===history["title"];
            })
            if(index>=0){
                state.history.splice(index,1);
            }
            state.history.unshift(history);//存储到数组中
            if( perms.maxLen && state.history.length>perms.maxLen){
                state.history.pop()
            }
            localStorage.setItem("HISTORYS",JSON.stringify(state.history));
        }
    },
    actions: {
    }
}