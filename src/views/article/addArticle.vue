<template>
    <div class="myEdit">
        <!-- <div>
            <input name="file" type="file" multiple ref="fulAvatar"/>
            <button type="submit" @click="updateImg">上 传</button>
        </div> -->
        <b-container>
            <b-row  class="justify-content-md-center">
                <b-col md="10" cols="12">
                    <div class="goods-editor">
                        <b-form-input v-model="title" placeholder="请输入标题" class="titInput"></b-form-input>
                        <!-- 工具栏容器 -->
                        <div id="toolbar-container"></div>

                        <!-- 编辑器容器 -->
                        <div id="editor">
                            <!-- <p>This is the initial editor content.</p> -->
                        </div>
                        <div class="subBtn">
                            <b-button variant="success" @click="geteditor">发布</b-button>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <b-modal id="my-modal" hide-footer size="sm" title="提示">
            <div class="d-block text-center">
                <p>您还没有登录,是否先去登录?</p>
            </div>
            <div class="bvModalBtn" style="text-align: right">
                <b-button variant="success" @click="$router.push({path:'/login'})">确定</b-button>
                <b-button @click="$bvModal.hide('my-modal')">取消</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import {UPLOAD_IMG,EDIT_POST} from "../../assets/api/api.js"
    import CKEditor from '@ckeditor/ckeditor5-build-classic'//只在这个页面引入富文本
    import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn' //中文包
    export default {
        name: "addArticle",
        data() {
            return {
                editor: null, // 编辑器实例
                oldValue:'',
                title:''
            }
        },
        mounted() {
            this.initCKEditor()
        },
        methods: {
            //七牛云图片上传
            updateImg(){
                let files = this.$refs.fulAvatar.files;
                let param = new FormData(); //创建form对象
                for(let key in files){
                    param.append('file',files[key]);//通过append向form对象添加数据
                }
                param.append('userId','1');
                param.append('takeTime','2019-12-18');
                param.append('upTime','2019-12-19');
                console.log(param)
                // console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                  headers:{'Content-Type':'multipart/form-data'}
                }; //添加请求头
                this.$axios.post('http://localhost:8099/api/qiniuUp',param,config)
                  .then(response=>{
                    console.log(response);
                })
            },
            //初始化富文本编辑器
            initCKEditor() {
                let that = this;
                class MyUploadAdapter {
                    constructor( loader ) {
                        // The file loader instance to use during the upload.
                        that.loader = loader;
                        that.oldValue = that.editor.getData();//保存原来的内容
                    }

                    upload() {
                        return that.loader.file
                            .then( file => new Promise( ( resolve, reject ) => {
                                const data = new FormData();
                                data.append('file', file);
                                // console.log(data.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                                let config = {
                                    headers:{'Content-Type':'multipart/form-data'}
                                }; //添加请求头
                                UPLOAD_IMG(data,config).then(res=>{
                                    resolve({default: res.url})
                                })
                            } ) );
                    }
                }

                //初始化编辑器
                CKEditor.create(document.querySelector('#editor'), {
                    // toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList' ],
                    removePlugins: ['MediaEmbed'], //除去视频按钮
                    language: 'zh-cn',  // 中文
                    ckfinder: {
                        'uploaded': 1, 'url': '/'
                        // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
                    }
                }).then(editor => {
                    const toolbarContainer = document.querySelector('#toolbar-container')
                    toolbarContainer.appendChild(editor.ui.view.toolbar.element)
                    // 加载了适配器
                    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                        return new MyUploadAdapter( loader );
                    };
                    this.editor = editor // 将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
                }).catch(error => {
                    that.$bvToast.toast(error.errMsg, {
                        title: '保存失败',
                        autoHideDelay: 3000
                    })
                })
            },
            //获取富文本编辑器内容
            geteditor(){
                // if(this.$store.state.user.userId){
                    let requestRes={
                        title:this.title,
                        editor:this.editor.getData(),
                        userId:this.$store.state.user.userId,
                        upDate:this.getTime()
                    };
                    EDIT_POST(requestRes).then(res=>{
                        if(res.succ){
                            this.$bvToast.toast("恭喜您!文章发表成功啦!", {
                                title: '发表成功',
                                autoHideDelay: 3000
                            })
                            this.$router.push({path:'/article'})
                        }else{
                            this.$bvToast.toast(res.errMsg, {
                                title: '发表失败',
                                autoHideDelay: 3000
                            })
                            if(res.errCode==666){
                                let that = this;
                                setTimeout(()=>{
                                    that.$router.push({path:'/login'})
                                },2000)
                            }
                        }
                    })
                // }else{
                //     this.$bvModal.show('my-modal')
                // }
            }
        }
    }
</script>

<style scoped>
.myEdit{
    width: 100%;
    height: 100%;
    padding-top: 60px;
    background-color: rgb(246,246,246);
}
    .goods-editor{
        background-color: #fff;
        padding: 20px;
    }
    .titInput{
        margin-bottom: 20px;
    }
    .subBtn{
        margin-top: 20px;
        text-align: center;
    }
</style>