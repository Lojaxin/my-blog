<template>
    <div class="userCpot">
        <div class="uscTop">
            <div class="headImg" @click="toInfo">
                <b-img :src="userInfo.headImg" fluid v-if="userInfo.headImg"></b-img>
                <i class="iconfont icon-yonghu-tianchong" v-else></i>
            </div>
        </div>
        <b-container class="bv-example-row marginTop40">
            <b-row v-if="!userInfo.userName">
                <b-col><b-button variant="danger" @click="$router.push({path:'/login'})">注册</b-button></b-col>
                <b-col><b-button variant="success" @click="$router.push({path:'/login'})">登录</b-button></b-col>
            </b-row>
            <b-row v-else>
                <b-col>
                    <div>{{'亲爱的'+(userInfo.nickName || userInfo.userName)+', 欢迎你!'}}</div>
                    <div style="margin-top: 20px;"><b-button variant="success" @click="$router.push({path:'/addArticle'})">发表文章</b-button></div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "rightUser",
        data(){
            return{
                userInfo:{}
            }
        },
        created(){
            if(this.$store.state.user.userName){
                this.userInfo = this.$store.state.user
            }
        },
        methods:{
            toInfo(){
                if(this.userInfo.userName){
                    this.$router.push({path:"/userInfo"})
                }
            }
        }
    }
</script>

<style scoped>
.userCpot{
    margin-left: 15px;
    width: 20rem;
    background-color: #fff;
    max-height: 800px;
    min-height: 600px;
}
.uscTop{
    border-bottom: 1px solid #ccc;
    position: relative;
    padding-top: 75px;
    height: 50px;
    background:url("../assets/static/images/titleImg.jpg") no-repeat center;
}
.headImg{
    background-color: #fff;
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 70px;
}
.headImg img{
    width: 100%;
    cursor: pointer;
}
.headImg .iconfont{
    color: #bbb;
    font-size: 50px;
}
    .marginTop40{
        margin-top: 60px;
        text-align: center;
    }
</style>