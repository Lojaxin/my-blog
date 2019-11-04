<template>
    <div class="aboutPage">
        <div class="aboutTop">
            <b-container>
                <b-row  class="justify-content-md-center">
                    <b-col md="10" class="padding0">
                        <div class="aboutBody">
                            <h1>About Me</h1>
                            <h3>个人简介</h3>
                            <p>美男子前端开发攻城狮一枚，浊世佳公子，偏偏美少年。正是对在下的最好诠释！</p>
                            <h3>工作经历</h3>
                            <p>2016年3月——2018年5月  广州*优电子商务</p>
                            <p>2018年6月——2019年2月  武汉*思语科技</p>
                            <p>2019年3月——至今  上海*岩科技</p>
                            <h3>部分项目</h3>
                            <p>APP：Map智农，Map慧农</p>
                            <p>微信小程序：*平财险在线理赔，*平财险客服视频</p>
                            <p>微信公众号：*平财险</p>
                            <p>PC后台：*平车险后台管理</p>
                            <p>PC网站：*引官</p>
                            <h3>建站历程</h3>
                            <p>本站前端采用的Vue+BootstrapVue，所以这还是一个响应式的哦。</p>
                            <p>后端采用的Koa2+Mysql，阿里云服务器，用nginx做的代理。</p>
                            <p>UI嘛，纯属东拼西凑，看看就行，毕竟建站的目的也就是想用node练练手。</p>
                            <p>说明:本站除项目依赖以外,前后端代码全部为本人手写。</p>
                            <h3>联系方式</h3>
                            <a :href="myWeixin" download="share_l_weixin.png">
                                <img :src="myWeixin">
                            </a>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                myWeixin:require("../../assets/static/images/wode.jpg")
            }
        },
        methods:{

        }
    }
</script>

<style scoped>
.aboutPage{
    width: 100%;
    min-height: 100%;
    padding-top: 60px;
    background-color: rgb(246,246,246);
}
    /*.padding0{*/
        /*padding: 0;*/
    /*}*/
    .aboutBody{
        width: 100%;
        height: 100%;
        padding: 10px 0;
    }
.aboutBody>h1{
    margin: 0;
    padding: 25px 0;
    color: #555;
    text-align: left;
    font: 700 25px/1.1 ff-tisa-web-pro,Cambria,"Times New Roman",Georgia,Times,sans-serif;
}
.aboutBody h3{
    padding: 20px 0;
    font-size: 20px;
    }
    .aboutBody  p{
        margin: 0 0 1.234em;
        word-break: break-word;
        overflow-wrap: break-word;
    }
.aboutBody  img{
    width: 200px;
}
</style>