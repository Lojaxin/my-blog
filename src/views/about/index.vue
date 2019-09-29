<template>
    <div class="aboutPage">
        <input type="file" @change="changeImg" ref="inputer">
    </div>
</template>

<script>
    import {UPLOAD_IMG} from "../../assets/api/api.js"
    export default {
        name: "index",
        data(){
            return{

            }
        },
        methods:{
            changeImg(){
                /*
                * 以下注释为上传图片
                * */
                let inputDOM = this.$refs.inputer;
                let file =inputDOM.files[0];//上传的文件
                let param = new FormData(); //创建form对象
                param.append('file',file);//通过append向form对象添加数据
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                }; //添加请求头
                UPLOAD_IMG(param,config).then(res=>{
                    console.log(res)
                })
            },
        }
    }
</script>

<style scoped>
.aboutPage{
    padding-top: 60px;
}
</style>