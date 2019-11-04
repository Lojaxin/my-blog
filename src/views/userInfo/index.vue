<template>
    <div class="userBody">
        <b-container>
            <b-row  class="justify-content-md-center">
                <b-col md="10" class="padding0">
                    <div class="userCont">
                        <h3 class="topTit">个人资料</h3>
                        <b-container fluid>
                            <b-row>
                                <b-col cols="12" md="3" class="headInfo">
                                    <div class="headImg">
                                        <b-img :src="userInfo.headImg" fluid v-if="userInfo.headImg"></b-img>
                                        <i class="iconfont icon-yonghu-tianchong" v-else></i>
                                    </div>
                                    <div class="allWidth">
                                        <div class="updateImg">
                                            <span>修改头像</span>
                                            <input type="file" accept="image/jpg,image/png,image/jpeg" class="upInput" title="" @change="changeImg" ref="inputer">
                                        </div>
                                    </div>

                                </b-col>
                                <b-col cols="12" md="9" class="borderTop">
                                    <div class="updateBox"><span class="updateBtn" @click="$bvModal.show('my-modal')">修改资料</span></div>
                                    <p>ID:{{userInfo.userName || ''}}</p>
                                    <p>昵称:{{userInfo.nickName || ''}}</p>
                                    <p>性别:{{userInfo.sex}}</p>
                                </b-col>
                            </b-row>
                        </b-container>
                        <div style="text-align: center">
                            <b-button variant="danger" @click="logingOut">退出登录</b-button>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>

        <b-modal id="my-modal" scrollable hide-footer centered title="信息修改">
            <div>
                <b-container fluid>
                    <b-row>
                        <b-col cols="3">
                            <label>用户名</label>
                        </b-col>
                        <b-col cols="9">
                            <b-form-input disabled v-model="userInfo.userName" type="text"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="marginTop10">
                        <b-col cols="3">
                            <label>昵称</label>
                        </b-col>
                        <b-col cols="9">
                            <b-form-input v-model="userInfo.nickName" type="text"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="marginTop10">
                        <b-col cols="3">
                            <label>性别</label>
                        </b-col>
                        <b-col cols="9" class="upMoudel">
                            <b-dropdown :text="userInfo.sex!=''?userInfo.sex:'请选择'">
                                <b-dropdown-item v-for="(item,index) in sexList" :key="index" @click="clickSelect(item.lable)">{{item.lable}}</b-dropdown-item>
                            </b-dropdown>
                        </b-col>
                    </b-row>
                    <div class="subBtn" @click="changeInfo">确认</div>
                </b-container>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import {UPDATE_USER,UPLOAD_IMG,UPDATE_HEAD_IMG} from "../../assets/api/api.js";
    export default {
        name: "index",
        data(){
            return{
                userInfo:{
                    sex:''
                },
                sexList:[{
                    code:'1',
                    lable:"男"
                },{
                    code:'2',
                    lable:"女"
                }]
            }
        },
        created(){
            this.init();
            console.log(this.$store.state.user)
        },
        methods:{
            init(){
                if(this.$store.state.user.userName){
                    this.userInfo = this.$store.state.user;
                    if(this.$store.state.user.sex=='1'){
                        this.userInfo.sex ="男"
                    }else{
                        this.userInfo.sex ="女"
                    }
                }
            },
            logingOut(){
                localStorage.clear();
                if(!localStorage.getItem('userInfoForMe')){
                    this.$store.commit('getUser',{});
                    this.$bvToast.toast("退出登录,2秒后返回首页", {
                        title: '提示',
                        autoHideDelay: 2000
                    })
                    this.$router.push({path:'/'})
                }else{
                    localStorage.removeItem("userInfoForMe");
                    this.$store.commit('getUser',{});
                    localStorage.clear();
                }
            },
            //修改用户信息
            changeInfo(){
                let thisSex = null
                if(this.userInfo.sex=='男'){
                    thisSex= '1'
                }else if(this.userInfo.sex=='女'){
                    thisSex= '2'
                }
                let requestRes = {
                    userId:this.userInfo.userId,
                    userName:this.userInfo.userName,
                    nickName:this.userInfo.nickName,
                    sex:thisSex
                }
                UPDATE_USER(requestRes).then(res=>{
                    if(res.succ){
                        //更新信息
                        this.$store.commit('getUser',res.data);
                        localStorage.setItem('userInfoForMe',JSON.stringify(res.data));
                        this.init();
                        this.$bvToast.toast("信息修改成功!", {
                            title: '成功提示',
                            autoHideDelay: 3000
                        })
                        this.$bvModal.hide('my-modal')
                    }else{
                        this.$bvToast.toast(res.errMsg, {
                            title: '失败提示',
                            autoHideDelay: 3000
                        })
                    }
                })
            },
            clickSelect(lable){
                this.userInfo.sex = lable;
            },
            //修改头像
            changeImg(){
                /*
                * 上传图片
                * */
                let inputDOM = this.$refs.inputer;
                let file =inputDOM.files[0];//上传的文件
                let param = new FormData(); //创建form对象
                param.append('file',file);//通过append向form对象添加数据
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                }; //添加请求头
                UPLOAD_IMG(param,config).then(res=>{
                    if(res.code=='1'){
                        let queRes = {
                            userId:this.$store.state.user.userId,
                            headImg:res.url
                        }
                        UPDATE_HEAD_IMG(queRes).then(result=>{
                            if(result.succ){
                                this.$store.commit('getUser',result.data);
                                localStorage.setItem('userInfoForMe',JSON.stringify(result.data));
                                this.init();
                                this.$bvToast.toast("头像修改成功!", {
                                    title: '成功提示',
                                    autoHideDelay: 3000
                                })
                            }
                        })
                    }else{
                        this.$bvToast.toast("修改失败!请检查文件格式及当前网络环境!", {
                            title: '失败提示',
                            autoHideDelay: 3000
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
.userBody{
    width: 100%;
    min-height: 100%;
    padding-top: 75px;
    background-color: rgb(246,246,246);
}
.padding0{
    padding: 0;
}
.marginTop10{
    margin-top: 10px;
}
.userCont{
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
}
.topTit{
    font-weight: 600;
    padding-bottom: 20px;
    /*border-bottom: 1px solid #ccc;*/
}
    .headInfo{
        border-top: 1px solid #ccc;
        padding-top: 20px;
        text-align: center;
    }
.headImg{
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    line-height: 45px;
    border-radius: 50%;
    overflow: hidden;
}
.headImg>img{
    width: 100%;
}
.headImg .iconfont{
    font-size: 24px;
    color: #ccc;
}
.allWidth{
    width: 100%;
    text-align: center;
}
    .updateImg{
        display: inline-block;
        width: 60px;
        color: #3399ea;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .upInput{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 2;
    }
    .updateBox{
        color: #3399ea;
        text-align: right;
    }
    .updateBtn{
        cursor: pointer;
    }
    .borderTop{
        border-top: 1px solid #ccc;
        padding-top: 10px;
    }
    .subBtn{
        width: 100%;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        text-align: center;
        padding: 10px 0;
        background-color: rgb(35,144,59);
        color: #fff;
        font-size: 16px;
        margin: 20px 0;
    }

</style>