<template>
    <div class="loginPage" ref="loginPage">
        <div class="loginBox">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="登录" active>
                        <b-card-text>
                            <b-row>
                                <b-col cols="3">
                                    <label>用户名</label>
                                </b-col>
                                <b-col cols="9">
                                    <b-form-input v-model="login.userName" type="text"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="marginTop10">
                                <b-col cols="3">
                                    <label>密码</label>
                                </b-col>
                                <b-col cols="9">
                                    <b-form-input v-model="login.password" type="password"></b-form-input>
                                </b-col>
                            </b-row>
                            <div class="loginBtn" @click="toLogin">登录</div>
                        </b-card-text>
                    </b-tab>
                    <b-tab title="注册">
                        <b-card-text>
                            <b-row>
                                <b-col cols="3">
                                    <label>用户名</label>
                                </b-col>
                                <b-col cols="9">
                                    <b-form-input v-model="register.userName" type="text"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="marginTop10">
                                <b-col cols="3">
                                    <label>邮箱</label>
                                </b-col>
                                <b-col cols="9">
                                    <b-form-input v-model="register.email" type="email"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="marginTop10">
                                <b-col cols="3">
                                    <label>密码</label>
                                </b-col>
                                <b-col cols="9">
                                    <b-form-input v-model="register.password" type="password"></b-form-input>
                                </b-col>
                            </b-row>
                            <div class="loginBtn" @click="toRegister">注册</div>
                        </b-card-text>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
    import {LOGIN,REGISTER} from "../assets/api/api.js"
    export default {
        name: "Login",
        data(){
          return{
              login:{
                  userName:'',
                  password:''
              },
              register:{
                  userName:'',
                  email:'',
                  password:''
              },
              tips:''
          }
        },
        methods:{
            toLogin(){
                if(this.login.userName==''){
                    this.$bvToast.toast(`请输入用户名`, {
                        title: '提示',
                        autoHideDelay: 3000
                    })
                    return
                }
                if(this.login.password==''){
                    this.$bvToast.toast(`请输入密码`, {
                        title: '提示',
                        autoHideDelay: 3000
                    })
                    return
                }
                LOGIN(this.login).then(res=>{
                    if(res.succ){
                        this.$router.push({path:'/'})
                    }else{
                        this.$bvToast.toast(res.errMsg, {
                            title: '登录失败',
                            autoHideDelay: 3000
                        })
                    }
                })

            },
            toRegister(){
                if(this.register.userName==''){
                    this.$bvToast.toast(`请输入用户名`, {
                        title: '提示',
                        autoHideDelay: 3000
                    })
                    return
                }
                if(this.register.email==''){
                    this.$bvToast.toast(`请输入用户名`, {
                        title: '提示',
                        autoHideDelay: 3000
                    })
                    return
                }
                if(this.register.password==''){
                    this.$bvToast.toast(`请输入密码`, {
                        title: '提示',
                        autoHideDelay: 3000
                    })
                    return
                }
                REGISTER(this.register).then(res=>{
                    if(res.succ){
                        this.$bvToast.toast("请您 继续登录", {
                            title: '注册成功',
                            autoHideDelay: 3000
                        })
                    }else{
                        this.$bvToast.toast(res.errMsg, {
                            title: '注册失败',
                            autoHideDelay: 3000
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
.loginPage{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0,0,0,0.4);
}
.loginBox{
    position: absolute;
    z-index: 8888;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 300px;
    min-height: 450px;
}
.marginTop10{
    margin-top: 10px;
}
.loginBtn{
    margin-top: 20px;
    padding:0 10%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: rgb(35,144,59);
    color: #fff;
    border-radius: 5px;
    font-size: 20px;
}
</style>