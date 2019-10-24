<template>
  <div class="home">
    <div class="swiperBox">
        <b-carousel
                id="carousel-fade"
                style="text-shadow: 0px 0px 2px #000"
                fade
                indicators
                img-width="1024"
                img-height="480"
        >
          <b-carousel-slide
                  v-for="(item,index) in imgsList"
                  :key="index"
                  caption="WELCOME TO MY BLOG"
                  content-visible-up="md"
                  :text="item.text"
                  :img-src="item.url"
          ></b-carousel-slide>
        </b-carousel>
      </div>
    <div class="d-none d-md-block all">
      <b-container>
        <b-row>
          <b-col class="fffCol" >
            <div class="leftFull">
              <h4 v-text="sentence1.title" style="color:#9b252c;"></h4>
              <p class="padRigth" v-text="sentence1.text"></p>
            </div>
          </b-col>
          <div class="centerBox">
          </div>
          <b-col class="redColor">
            <div class="rightFull fffText">
              <h4 v-text="sentence2.title"></h4>
              <p class="padLeft" v-text="sentence2.text"></p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="greenCol"></b-col>
          <div class="bottomBox">
            <div class="left fffText">
              <h4 v-text="sentence3.title"></h4>
              <p class="alignRight" v-text="sentence3.text"></p>
            </div>
          </div>
          <b-col class="bgc">
            <div>
              <div class="botRight"></div>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <div class="botImg"></div>
    </div>
    <div class="datas">
        <h3>数据统计</h3>
      <b-container class="bv-example-row">
        <b-row>
          <b-col class="aData" v-for="(item,index) in datas" :key="index">
            <div class="arms" @click="toWhere(item.path)">{{item.num}}</div>
            <p v-text="item.title"></p>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
  import {GET_STATISTICS} from "../assets/api/api.js";
export default {
  name: 'home',
    data(){
      return{
          imgsList:[{
              text:'生活不止眼前的苟且,还有诗和远方!',
              url:require("../assets/static/images/life1.png") ||''
            },{
              text:'不是因为成功才坚持,而是因为坚持才能成功!',
              url:require("../assets/static/images/life2.png") || ''
            },{
              text:'以兴趣驱动工作才是最好的状态!',
              url:require("../assets/static/images/life3.png") || ''
            }
          ],
          sentence1:{
              title:"Only love can withstand the long years",
              text:"唯有热爱方能抵御岁月漫长。"
          },
          sentence2:{
              title:"Save tenderness for those closest to you",
              text:"把温柔留给最亲近的人。"
          },
          sentence3:{
              title:"The future,dreams can be expected",
              text:"未来,梦想可期。"
          },
          datas:[{
              num:"0",
              title:"文章数量",
              path:"",
              describe:''
          },{
              num:"0",
              title:"留言数量",
              path:"",
              describe:''
          },{
              num:"",
              title:"总浏览量",
              path:"",
              describe:''
          }]
      }
    },
    created(){
        this.getStatis()
    },
    methods:{
      getStatis(){
          GET_STATISTICS().then(res=>{
              if(res.succ){
                this.datas = res.data
              }
          })
      },
        toWhere(path){
          if(path!='')this.$router.push({path})
        }
    }
}
</script>
<style scoped>
  .home{
    overflow: hidden;
    padding-top: 60px;
  }
  .fffCol{
    background-color: #fff;
  }
  .fffText{
    color: #fff;
  }
  .centerBox{
    width: 200px;
    height: 200px;
    overflow: hidden;
    background: url("../assets/static/images/bgc11.png") no-repeat center;
    background-size: cover;
  }
  .bgc{
    position: relative;
  }
  .bgc>div{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 400px;
    background: url("../assets/static/images/life44.png") no-repeat center;
    background-size: cover;
    z-index: 10;
  }
  .botRight{
    position: absolute;
    top: 200px;
    left: 0;
    width: 200px;
    height: 200px;
    background: url("../assets/static/images/life33.png") no-repeat center;
    background-size: cover;
  }
  .greenCol{
    background-color: #28a745;
  }
  .bottomBox{
    background-color: #28a745;
    width: 200px;
    height: 200px;
    position: relative;
  }
  .leftFull{
    padding-top: 60px;
    padding-right: 30px;
    text-align: right;
  }
  .rightFull{
    padding-top: 60px;
    padding-left: 30px;
    text-align: left;
  }
  .leftFull h4,.rightFull h4{
    font-weight: 600;
  }
  .padRigth{
    padding-right: 30px;
  }
  .padLeft{
    padding-left: 30px;
  }
  .alignRight{
    text-align: right;
    padding-right: 30px;
  }
  .left{
    padding-top: 70px;
    position: absolute;
    top: 0;
    right: 0;
    width: 480px;
  }
  .left h4{
    padding-right: 20px;
    text-align: right;
    font-weight: 600;
  }
.redColor{
  background-color: #9b252c;
}
  .botImg{
    width: 100%;
    height: 200px;
    background: url("../assets/static/images/life55.jpg") no-repeat center;
    background-size: cover;
  }
  .datas{
    padding:30px 20px 0 20px;
    text-align: center;
  }
  .datas h3{
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 500;
  }
  .datas p{
    padding: 20px;
    font-size: 16px;
  }

  /*倒三角*/
  .arms {
    width: 55px;
    height: 45px;
    color: #fff;
    line-height: 45px;
    text-align: center;
    display: inline-block;
    position: relative;
    background-color: #393939;
    cursor: pointer;
    box-shadow: 0px 0px 10px #000
  }
  .arms::after {
    content: '';
    display: block;
    position: absolute;
    height: 0;
    width: 0;
    overflow: hidden;
    font-size: 0;
    line-height: 0;
    border-color: #393939 transparent transparent transparent;
    border-style: solid;
    border-width: 20px;
    top: 30px;
    left: 8px;
  }
</style>
