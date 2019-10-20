<template>
    <div class="artPage">
        <b-container class="bv-example-row">
            <b-row>
                <b-col class="artBody" v-if="allArticle.length>0">
                    <div class="oneArt" v-for="(item,index) in allArticle" :key="index">
                        <h3 class="title" v-text="item.title"></h3>
                        <div class="someInfo">
                            <i class="iconfont icon-zuozhe1"></i><span v-text="item.userName"></span>
                            <i class="iconfont icon-time" style="margin-left: 20px;"></i><span v-text="item.uploadDate"></span>
                        </div>
                        <div class="artCont" v-html="item.articleText"></div>
                        <div class="artBottom">
                            <span @click="$router.push({path:'/articleText?id='+item.id})">阅读详情>></span>
                        </div>
                    </div>
                </b-col>
                <rightUser class="d-none d-md-block"></rightUser>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import {ALL_ARTICLE} from "../../assets/api/api.js";
    import rightUser from "../../components/rightUser";
    export default {
        name: "index",
        components:{
            rightUser
        },
        data(){
            return{
                allArticle:[],
            }
        },
        created(){
            this.init()
        },
        methods:{
            init(){
                ALL_ARTICLE().then(res=>{
                    if(res.succ){
                        this.allArticle = res.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .artPage{
        width: 100%;
        min-height: 100%;
        background-color: rgb(246,246,246);
        padding-top: 75px;
        padding-bottom: 15px;
    }
    .artBody{
        box-sizing: border-box;
        background-color: #fff;
        padding: 20px 20px 0 20px;
    }
    .oneArt{
        padding-bottom: 15px;
    }
    .title{
        color: #1e90ff;
    }
    .someInfo{
        color: #ccc;
        padding-bottom: 10px;
    }
    .artCont{
        display: -webkit-box;
        /* -webkit-box-orient: vertical; */
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-indent:25px;
        font-size: 14px;
        max-height: 180px;
    }
    .artBottom{
        color: #1e90ff;
        text-align: right;
        padding: 10px 0;
        border-bottom: 1px solid #1e90ff;
    }
    .artBottom>span{
        cursor: pointer;
    }
</style>