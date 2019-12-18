<template>
    <div class="artTextBody">
        <b-container class="bv-example-row">
            <b-row v-if="Object.keys(artInfo).length != 0">
                <b-col>
                    <h2 v-text="artInfo.title"></h2>
                    <div style="padding-bottom: 10px">
                        <p class="skyBlue">作者:<span v-text="artInfo.nickName || artInfo.userName"></span></p>
                        <p class="gary"><span v-text="artInfo.uploadDate"></span></p>
                    </div>
                    <div class="artHtml" v-html="artInfo.articleHtml"></div>
                </b-col>
            </b-row>
            <b-row v-else>
                <b-col>
                    哎呀!页面被火星人劫持走了...
                </b-col>
            </b-row>
        </b-container>
        <b-modal id="my-modal" hide-footer size="sm" title="提示">
            <div class="d-block text-center">
                <p v-text="errMsg"></p>
            </div>
            <div class="bvModalBtn" style="text-align: right">
                <b-button variant="success" @click="$router.push({path:'/login'})">确定</b-button>
                <b-button @click="$bvModal.hide('my-modal')">取消</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import {QUERY_ARTICLE} from "../../assets/api/api.js";
    export default {
        name: "articleText",
        metaInfo(){//异步用法
            return{
                title: this.artInfo.title,
                meta: [{
                    name: 'keywords',
                    content: this.artInfo.title
                }]
            }
        },
        data(){
            return{
                artInfo:{},
                errMsg:'请求失败,请重新登录'
            }
        },
        created(){
            this.init(this.$route.query.id)
        },
        methods:{
            init(id){
                QUERY_ARTICLE({id}).then(res=>{
                    if(res.succ){
                        this.artInfo = res.data
                    }else{
                        localStorage.clear();
                        this.errMsg = res.errMsg;
                        this.$bvModal.show('my-modal')
                    }
                })
            }
        }
    }
</script>

<style scoped>
.artTextBody{
    padding-top: 60px;
    text-align: center;
}
.artTextBody p{
    margin: 0;
}
.artHtml{
   text-align: left;
    text-indent:25px;
}
.skyBlue{
    color: #1e90ff;
}
    .gary{
        color: #bbb;
    }
</style>