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
            SPRING
          </b-col>
          <div class="centerBox">
          </div>
          <b-col class="redColor">
            SUMMER
          </b-col>
        </b-row>
        <b-row>
          <b-col class="greenCol"></b-col>
          <div class="bottomBox">
            <div class="left">AUTUMN</div>
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
            <div class="arms">{{item.num}}</div>
            <p v-text="item.title"></p>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
    data(){
      return{
          imgsList:[{
              text:'生活不止眼前的苟且,还有诗和远方!',
              url:require("../assets/static/images/life1.png")
            },{
              text:'不是因为成功才坚持,而是因为坚持才能成功!',
              url:require("../assets/static/images/life2.png")
            },{
              text:'以兴趣驱动工作才是最好的状态!',
              url:require("../assets/static/images/life3.png")
            }
          ],
          datas:[{
              num:"0",
              title:"文章数量",
              describe:''
          },{
              num:"1",
              title:"留言数量",
              describe:''
          },{
              num:"1",
              title:"总浏览量",
              describe:''
          }]
      }
    },
    methods:{

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
    background: url("../assets/static/images/life44.jpg") no-repeat center;
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
    background-color: #46a751;
  }
  .bottomBox{
    background-color: #46a751;
    width: 200px;
    height: 200px;
    position: relative;
  }
  .left{
    position: absolute;
    top: 0;
    right: 0;
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
    width: 65px;
    height: 45px;
    color: #fff;
    line-height: 45px;
    text-align: center;
    display: inline-block;
    position: relative;
    background-color: #393939;
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
    top: 32px;
    left: 12px;
  }
</style>
