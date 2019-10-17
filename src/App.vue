<template>
  <div id="app">
    <Layout></Layout>
    <!--<router-link to="/">Home</router-link> |-->
    <router-view/>
  </div>
</template>
<script>
    import Layout from "./components/layout";
    export default {
        name: 'app',
        components:{
            Layout
        }
    }
</script>
<style>
body{
  font-family: SimSun;
  font-size: 14px;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
.swiperBox .carousel-inner{
  max-height: 650px;
}
.swiperBox .carousel-caption{
  bottom: 40%;
}
.swiperBox .carousel-caption h3{
  font-size: 2.5rem;
}
.ck-editor__editable{ min-height: 300px; }
/*所有父类有all这个类的都会满足宽度100%,并不会存在padding和margin*/
.all .container{
  max-width: 100%;
  padding: 0;
  margin: 0;
}
.all .container .row{
  margin: 0;
}
.all .container .col{
  padding: 0;
}
.loginBox .nav-tabs .nav-item{
  width: 50%;
  text-align: center;
}

.image img{
  width: 100%;
}
</style>
