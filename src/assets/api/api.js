/**
 * 分离请求处理
 */
import Ajax from "axios";
const baseURL = 'http://localhost:8099';  //线上的URL前缀
Ajax.defaults.baseURL = baseURL;
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