<template>
    <!--导航高度统一60px-->
    <div>
        <div class="topBody">
            <!--视图992以上的电脑显示-->
            <div class="d-none d-md-block showLg">
                <b-container class="bv-example-row">
                    <b-row align-v="center" class="pcHeight">
                        <b-col md="3" lg="5" class="logo">Arbort的博客</b-col>
                        <b-col>
                            <b-row class="list">
                                <b-col v-for="(item,index) in memuList" :key="index"><span :class="item.check?'menu active':'menu'" @click="checkWho(item.path)">{{item.text}}</span></b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
            <!--视图768以下的显示-->
            <div class="d-md-none showMd">
                <b-container class="bv-example-row">
                    <b-row align-v="center" class="iphoneShow">
                        <b-col cols="10" class="logo">Arbort的博客</b-col>
                        <b-col>
                            <i :class="showLeft?'iconfontTop icon-cuowu':'iconfontTop icon-daohangshouqi-'" @click="showLeft=!showLeft"></i>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>
        <transition name="box">
            <div class="box d-md-none" v-if="showLeft">
                <div class="leftTop">
                    <div class="headImage">
                        <b-img :src="headImg" fluid v-if="headImg!=''"></b-img>
                        <i class="iconfont icon-yonghu-tianchong" v-else></i>
                    </div>
                    <div class="logOr">
                        <b-row v-if="nickName==''">
                            <b-col>
                                <b-button @click="toLogin">登录/注册</b-button>
                            </b-col>
                        </b-row>
                        <b-row v-else>
                            <b-col>
                                <div v-text="nickName"></div>
                            </b-col>
                        </b-row>
                    </div>
                </div>
                <ul class="menuUL">
                    <li v-for="(item,index) in memuList2" :key="index" @click="linkTo(item.path)"><i :class="item.icon"></i>{{item.text}}</li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    import {ADD_BROWSE} from '../assets/api/api.js';
    export default {
        name: "layout",
        computed:{
            nowPath(){
                return this.$route.path
            }
        },
        data(){
            return{
                memuList:[{
                    check:true,
                    icon:"iconfont icon-shouye",
                    path:'/',
                    text:"博客首页"
                },{
                    check:false,
                    icon:"iconfont icon-wenzhangfenlei",
                    path:'/article',
                    text:"一些文章"
                },{
                    check:false,
                    icon:"iconfont icon-solid-person",
                    path:'/about',
                    text:"关于博主"
                },{
                    check:false,
                    icon:"iconfont icon-message",
                    path:'/mailbox',
                    text:"我的留言"
                }],
                memuList2:[{
                    check:true,
                    icon:"iconfont icon-shouye",
                    path:'/',
                    text:"博客首页"
                },{
                    check:false,
                    icon:"iconfont icon-wenzhangfenlei",
                    path:'/article',
                    text:"一些文章"
                },{
                    check:false,
                    icon:"iconfont icon-zuozhe1",
                    path:'/addArticle',
                    text:"发表文章"
                },{
                    check:false,
                    icon:"iconfont icon-solid-person",
                    path:'/about',
                    text:"关于博主"
                },{
                    check:false,
                    icon:"iconfont icon-message",
                    path:'/mailbox',
                    text:"我的留言"
                }],
                showLeft:false,
                oldVal:'/',
                headImg:'',
                nickName:''
            }
        },
        watch:{
            nowPath(newVal,oldVal){
                if(newVal!=oldVal){
                    //添加一条浏览量
                    ADD_BROWSE()
                    for(let val of this.memuList){
                        if(val.path==newVal){
                            val.check = true
                        }else{
                            val.check =  false;
                        }
                    }
                    if(newVal=='/addArticle' || newVal=='/articleText'){
                        this.memuList[1].check = true
                    }
                }
            }
        },
        created(){
            this.oldVal = this.getNowPath();
            let userInfo = this.$store.state.user;
            if(userInfo.userName){
                this.nickName = userInfo.nickName || userInfo.userName;
                this.headImg = userInfo.headImg || '';
            }
        },
        methods:{
            getNowPath(){
                let allPath = window.location.href;
                var index=allPath.indexOf("#/");
                let newPath =allPath.substring(index+1,allPath.length);
                return newPath;
            },
            checkWho(path){
                if(path!=this.oldVal){
                    this.oldVal = path;
                    this.$router.push({path});
                }
            },
            linkTo(path){
                if(path!=this.oldVal){
                    this.oldVal = path;
                    this.$router.push({path});
                }
                this.showLeft=!this.showLeft
            },
            toLogin(){
                this.showLeft=!this.showLeft;
                this.$router.push({path:'/login'})
            }
        }
    }
</script>

<style scoped>
.topBody{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
}
.leftTop{
    text-align: center;
    margin-top: 3rem;
}
.headImage{
    display: inline-block;
    background-color: #fff;
    padding: 3px;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    overflow: hidden;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 50px;
}
.headImage img{
    width: 100%;
}
.headImage .iconfont{
    color: #bbb;
    font-size: 35px;
}
.pcHeight{
    height: 60px;
}
.showLg{
    border-bottom: 1px solid #ccc;
}
.logo{
    color: #912e2c;
    font-size: 1.5rem;
    font-weight: 700;
    font-family: SimSun;
}
.showMd{
    height: 60px;
    background-color: #000;
}
.iphoneShow{
    height: 60px;
    background-color: #000;
    color: #fff;
}
.iphoneShow .logo{
    font-size: 30px;
    color: #fff;
}
.menuUL{
    margin-top: 2rem;
    text-align: center;
    font-size: 18px;
}
.menuUL li{
    margin-bottom: 1rem;
}
.list{
   text-align: center;
}
.menu{
    display: inline-block;
    padding: 15px 20px;
    cursor: pointer;
}
.menu:hover{
    background-color: #912e2c;
    color: #fff;
}
.active{
    background-color: #912e2c;
    color: #fff;
}
.box{
    background: url("../assets/static/images/bgc.jpeg") no-repeat 0 center;
    position: fixed;
    padding-top: 60px;
    width: 12rem;
    height: 100%;
    z-index: 99;
    top: 0;
    left: 0;
}
/*动画*/
.box-enter,.box-leave-to{
    transform: translateX(-12rem);
}
.box-enter-active,.box-leave-active{
    transition: all 0.5s;
}
.box-enter-to,.box-leave{
    transform: translateX(0);
}
</style>