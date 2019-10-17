<template>
    <div class="mailPage">
        <b-container>
            <b-row  class="justify-content-md-center">
                <b-col md="10" cols="12">
                    <div class="mailBody">
                        <div>
                            <b-form-textarea
                                    id="textarea-rows"
                                    placeholder="请留下你想说的话吧"
                                    v-model="text"
                                    rows="7"
                            ></b-form-textarea>
                        </div>
                        <b-container fluid>
                            <b-row align-v="center">
                                <b-col cols="4" class="myCols4">留言(<span v-text="rows"></span>)</b-col>
                                <b-col cols="8" class="myCols8">
                                    <b-pagination v-model="currentPage" :total-rows="rows" size="sm" align="right" @change="changePage"></b-pagination>
                                </b-col>
                            </b-row>
                        </b-container>
                        <div class="oneMsg" v-for="(item,index) in msgList" :key="index">
                            <b-container fluid>
                                <b-row>
                                    <div class="headImg">
                                        <b-img :src="item.headImg" fluid v-if="item.headImg!=''"></b-img>
                                        <i class="iconfont icon-yonghu-tianchong" v-else></i>
                                    </div>
                                    <b-col>
                                        <div class="nickStyle">昵称 <span>2019-09-09</span></div>
                                        <div>留言的内容</div>
                                        <div class="otherOps">
                                            <i class="iconfont icon-dianzan"></i>
                                            <i class="iconfont icon-message" @click="item.showTextarea = true"></i>
                                        </div>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        <div v-show="item.showTextarea" class="longText">
                                            <b-form-textarea
                                                    id="textarea"
                                                    v-model="item.text"
                                                    placeholder="请输入"
                                            ></b-form-textarea>
                                            <div class="btns">
                                                <b-button variant="success" @click="yes">确定</b-button>
                                                <b-button @click="item.showTextarea = false">取消</b-button>
                                            </div>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                msgList:[
                    {
                        headImg:'',
                        text:'',
                        showTextarea:false
                    },
                    {
                        headImg:'',
                        text:'',
                        showTextarea:false
                    }
                ],
                text:'',
                rows: 100,
                currentPage: 1
            }
        },
        methods:{
            yes(){
                console.log(this.msgList);
            },
            changePage(val){
                console.log(val)//当前选中
                console.log(this.currentPage)//之前选中
            }
        }
    }
</script>

<style scoped>
.mailPage{
    width: 100%;
    height: 100%;
    padding-top: 60px;
    background-color: rgb(246,246,246);
}
    .mailBody{
        background-color: #fff;
        padding: 20px;
    }
    .oneMsg{
        border-top: 1px solid #ccc;
        padding: 15px 10px;
    }
    .headImg{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #ccc;
        text-align: center;
        line-height: 50px;
    }
    .headImg img{
        width: 100%;
    }
.headImg .iconfont{
    font-size: 22px;
    color: #fff;
}
    .nickStyle{
        font-size: 14px;
        padding:10px 0;
    }
    .nickStyle span{
        margin-left: 20px;
        color: #bbb;
        font-size: 12px;
    }
    .otherOps{
        text-align: right;
        /*margin-bottom: 15px;*/
        /*border-bottom: 1px solid #ccc;*/
    }
.otherOps .iconfont{
    margin-left: 25px;
    font-size: 22px;
    cursor: pointer;
}
.otherOps .iconfont:hover{
    color: deepskyblue;
}
.longText{
    border-top: 1px solid #ccc;
    padding-top: 15px;
}
    .btns{
        margin-top: 10px;
    }
.btns>button{
    margin-right: 20px;
}
.myCols4,.myCols8{
    padding:10px 0;
}
.myCols8 ul{
    margin-bottom: 0;
}
</style>