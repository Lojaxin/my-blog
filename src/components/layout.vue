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
                                <b-col v-for="(item,index) in memuList" :key="index"><span :class="item.check?'menu active':'menu'" @click="checkWho(item)">{{item.text}}</span></b-col>
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
                <ul class="menuUL">
                    <li v-for="(item,index) in memuList" :key="index" @click="linkTo(item.path)"><i :class="item.icon"></i>{{item.text}}</li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
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
                showLeft:false
            }
        },
        watch:{
            nowPath(newVal){
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
        },
        methods:{
            checkWho(item){
                this.$router.push({path:item.path});
            },
            linkTo(path){
                this.$router.push({path})
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
    margin-top: 7rem;
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