/**
 * 分离请求处理
 */
import Ajax from "axios";
//开发模式时需要开启，生产环境关闭
// const baseURL = 'http://localhost:8099';
// Ajax.defaults.baseURL = baseURL;
//返回token

Ajax.interceptors.request.use(
    config => {
        let token =localStorage.getItem('ljx_token');
        if (token) {
            config.headers.common['token'] =token;
        }
        return config
    },
    err => {
        return Promise.reject(err);
    }
)
//上传照片
export const UPLOAD_IMG=(params,config)=>{
    return Ajax.post('/upload/image',params,config).then(res=>res.data)
}
//登录
export const LOGIN=(params,config)=>{
    return Ajax.post('/api/login',params,config).then(res=>res.data)
}
//账号注册
export const REGISTER=(params,config)=>{
    return Ajax.post('/api/register',params,config).then(res=>res.data)
}
//富文本信息上传
export const EDIT_POST=(params,config)=>{
    return Ajax.post("/api/storageeditor",params,config).then(res=>res.data)
}
//查询所有的文章列表
export const ALL_ARTICLE=(params,config)=>{
    return Ajax.get("/api/allArticle",{params},config).then(res=>res.data)
}
//查询文章详情
export const QUERY_ARTICLE=(params,config)=>{
    return Ajax.get("/api/queryArticle",{params},config).then(res=>res.data)
}
//提交留言
export const ADD_REPLY=(params,config)=>{
    return Ajax.post("/api/addReply",params,config).then(res=>res.data)
}
//查询所有留言
export const QUERY_REPLY=(params,config)=>{
    return Ajax.post("/api/queryReply",params,config).then(res=>res.data)
}
//留言点赞接口
export const MSG_GOODS=(params,config)=>{
    return Ajax.post("/api/goods",params,config).then(res=>res.data)
}
//获取数据统计接口
export const GET_STATISTICS = (params,config)=>{
    return Ajax.get("/api/statistics",{params},config).then(res=>res.data)
}
//添加浏览量
export const ADD_BROWSE = (params,config)=>{
    return Ajax.get("/api/browse",{params},config).then(res=>res.data)
}
//修改个人信息接口
export const UPDATE_USER = (params,config)=>{
    return Ajax.post("/api/updateUser",params,config).then(res=>res.data)
}
//修改头像接口
export const UPDATE_HEAD_IMG = (params,config)=>{
    return Ajax.post("/api/updateHeadImg",params,config).then(res=>res.data)
}