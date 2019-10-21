<template>
    <div class="mailPage">
        <b-container>
            <b-row  class="justify-content-md-center">
                <b-col md="10" class="padding0">
                    <div class="mailBody">
                        <div>
                            <b-form-textarea
                                    id="textarea-rows"
                                    placeholder="请留下你想说的话吧"
                                    v-model="firstText"
                                    rows="7"
                            ></b-form-textarea>
                            <div class="btns">
                                <b-button variant="success" @click="subFirst">确定</b-button>
                                <b-button @click="firstText=''">重置</b-button>
                            </div>
                        </div>
                        <b-container fluid>
                            <b-row align-v="center">
                                <b-col cols="4" class="myCols4">留言(<span v-text="paging.total"></span>)</b-col>
                                <b-col cols="8" class="myCols8">
                                    <b-pagination v-model="paging.currentPage" :total-rows="paging.total" size="sm" align="right" @change="changePage"></b-pagination>
                                </b-col>
                            </b-row>
                        </b-container>
                        <div class="oneMsg" v-for="(item,index) in msgList" :key="index">
                            <b-container fluid>
                                <b-row>
                                    <div class="headImg">
                                        <b-img :src="item.headImg" fluid v-if="item.headImg"></b-img>
                                        <i class="iconfont icon-yonghu-tianchong" v-else></i>
                                    </div>
                                    <b-col>
                                        <div class="nickStyle">{{item.userName}}<span v-text="item.uploadTime"></span></div>
                                        <div v-text="item.message"></div>
                                        <div class="otherOps">
                                            <i class="iconfont icon-dianzan" @click="isLike(item.id)"></i><span v-text="'('+item.goods+')'"></span>
                                            <i class="iconfont icon-message" @click="item.showTextarea = true"></i>
                                        </div>
                                    </b-col>
                                </b-row>
                                <b-row v-if="item.children.length>0">
                                    <b-col>
                                        <div class="reply">
                                            <b-container fluid>
                                                <b-row class="marginBot10" v-for="(childItem,childIndex) in item.children" :key="childIndex">
                                                    <div class="headImg">
                                                        <b-img :src="childItem.headImg" fluid v-if="childItem.headImg"></b-img>
                                                        <i class="iconfont icon-yonghu-tianchong" v-else></i>
                                                    </div>
                                                    <b-col>
                                                        <div class="replyNick">{{childItem.userName}}<span v-text="childItem.uploadTime"></span></div>
                                                        <div v-text="childItem.message"></div>
                                                    </b-col>
                                                </b-row>
                                            </b-container>
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
                                                <b-button variant="success" @click="yes(item)">确定</b-button>
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
        <b-modal id="my-modal" hide-footer size="sm" title="提示">
            <div class="d-block text-center">
                <p>您还没有登录,是否先去登录?</p>
            </div>
            <div class="btns" style="text-align: right">
                <b-button variant="success" @click="$router.push({path:'/login'})">确定</b-button>
                <b-button @click="$bvModal.hide('my-modal')">取消</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import {ADD_REPLY,QUERY_REPLY,MSG_GOODS} from "../../assets/api/api.js";
    export default {
        name: "index",
        data(){
            return{
                msgList:[],
                text:'',
                firstText:'',
                isBack:true,//留言点赞的节流阀
                paging:{
                    total: 0,//总留言
                    nums:10,//默认一页10条数据
                    currentPage: 1 //默认是第一页
                }
            }
        },
        created(){
          this.queryMsg();
        },
        methods:{
            queryMsg(){
                //查询留言数据
                QUERY_REPLY(this.paging).then(res=>{
                    if(res.succ){
                        this.paging.total=res.data.total;
                        this.paging.nums=res.data.nums;
                        this.paging.currentPage=res.data.currentPage;
                        //给每个留言增加上一个showTextarea属性来控制显示隐藏
                        let newList = [];
                        for(let val of res.data.backInfo){
                            val.showTextarea = false;
                            newList.push(val)
                        }
                        this.msgList = newList;
                    }
                })
            },
            //添加留言及回复
            addreply(requestRes){
                ADD_REPLY(requestRes).then(res=>{
                    if(res.succ){
                        //   重新查询一次渲染一次留言数据
                        this.queryMsg()
                        this.$bvToast.toast("留言成功!", {
                            title: '提示',
                            autoHideDelay: 3000
                        })
                    }
                })
            },
            //提交回复
            yes(item){
                if(this.$store.state.user.userId){
                    if(item.text==''){
                        this.$bvToast.toast(`请先留下你的笔墨..`, {
                            title: '提示',
                            autoHideDelay: 3000
                        })
                        return
                    }
                    let requestRes = {
                        userId:this.$store.state.user.userId,
                        message:item.text,
                        uploadTime:this.getTime(),
                        parentId:item.id
                    }
                    this.addreply(requestRes)
                }else{
                    this.$bvModal.show('my-modal')
                }
            },
            changePage(val){
                this.paging.currentPage = val;
                this.queryMsg()
            },
            //留言点赞
            isLike(id){
                if(this.$store.state.user.userId){
                    if(this.isBack){
                        this.isBack = false;
                        let requestRes = {
                            userId:this.$store.state.user.userId,
                            msgId:id
                        }
                        MSG_GOODS(requestRes).then(res=>{
                            if(res.succ){
                                this.queryMsg()
                            }
                            this.isBack = true;
                        })
                    }else{
                        this.$bvToast.toast(`请勿重复点击`, {
                            title: '提示',
                            autoHideDelay: 3000
                        })
                    }
                }else{
                    this.$bvModal.show('my-modal')
                }
            },
            //提交留言
            subFirst(){
                if(this.$store.state.user.userId){
                    if(this.firstText==''){
                        this.$bvToast.toast(`请先留下你的笔墨..`, {
                            title: '提示',
                            autoHideDelay: 3000
                        })
                        return
                    }
                    let requestRes = {
                        userId:this.$store.state.user.userId,
                        message:this.firstText,
                        uploadTime:this.getTime(),
                        parentId:'0'
                    }
                    this.addreply(requestRes)
                }else{
                    this.$bvModal.show('my-modal')
                }
            }
        }
    }
</script>

<style scoped>
.mailPage{
    width: 100%;
    min-height: 100%;
    padding-top: 60px;
    background-color: rgb(246,246,246);
}
.mailPage .col{
    padding: 0;
}
.mailPage .btn-success{
    background-color: #007bff;
    border-color: #007bff;
}
.padding0{
    padding: 0;
}
.marginBot10{
    margin-bottom: 10px;
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
        width: 42px;
        height: 42px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #ccc;
        text-align: center;
        line-height: 42px;
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
        padding:10px 0 10px 10px;
        color: #007bff;
    }
    .replyNick{
        color: #007bff;
    }
    .nickStyle span{
        margin-left: 15px;
        color: #bbb;
        font-size: 12px;
    }
.replyNick span{
    margin-left: 15px;
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
    color: #007bff;
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
    .reply{
        border-top: 1px solid #ccc;
        padding:15px 0 0 45px;
    }
</style>