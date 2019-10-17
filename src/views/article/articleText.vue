<template>
    <div class="artTextBody">
        <b-container class="bv-example-row">
            <b-row v-if="Object.keys(artInfo)">
                <b-col>
                    <h2 v-text="artInfo.title"></h2>
                    <div style="padding-bottom: 10px">
                        <p class="skyBlue">作者:<span v-text="artInfo.userName"></span></p>
                        <p class="gary"><span v-text="artInfo.uploadDate"></span></p>
                    </div>
                    <div class="artHtml" v-html="artInfo.articleText"></div>
                </b-col>
            </b-row>
            <b-row v-else>
                <b-col>
                    哎呀!页面被火星人劫持走了...
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import {QUERY_ARTICLE} from "../../assets/api/api.js";
    export default {
        name: "articleText",
        data(){
            return{
                artInfo:{}
            }
        },
        created(){
            this.init(this.$route.query.id)
        },
        methods:{
            init(id){
                QUERY_ARTICLE({id}).then(res=>{
                    if(res.succ)this.artInfo = res.data
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