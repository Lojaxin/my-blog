<template>
    <div class="userCpot">
        <div class="uscTop">
            <div class="headImg">
                <b-img :src="headImg" fluid v-if="headImg!=''"></b-img>
                <i class="iconfont icon-yonghu-tianchong" v-else></i>
            </div>
        </div>
        <b-container class="bv-example-row marginTop40">
            <b-row v-if="nickName==''">
                <b-col><b-button variant="danger" @click="$router.push({path:'/login'})">注册</b-button></b-col>
                <b-col><b-button variant="success" @click="$router.push({path:'/login'})">登录</b-button></b-col>
            </b-row>
            <b-row v-else>
                <b-col>{{'亲爱的'+nickName+', 欢迎你!'}}</b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "rightUser",
        data(){
            return{
                headImg:'',
                nickName:''
            }
        }
    }
</script>

<style scoped>
.userCpot{
    margin-left: 15px;
    width: 20rem;
    background-color: #fff;
}
.uscTop{
    border-bottom: 1px solid #ccc;
    position: relative;
    padding-top: 75px;
    height: 50px;
    background:url("../assets/static/images/titleImg.png") no-repeat center;
}
.headImg{
    background-color: #fff;
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
    padding: 3px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 90px;
}
.headImg img{
    width: 100%;
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