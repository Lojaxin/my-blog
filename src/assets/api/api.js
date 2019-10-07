/**
 * 分离请求处理
 */
import Ajax from "axios";
const baseURL = 'http://localhost:8099';  //线上的URL前缀
Ajax.defaults.baseURL = baseURL;
//上传照片
export const UPLOAD_IMG=(param,config)=>{
    return Ajax.post('/upload/image',param,config).then(res=>res.data)
}
//登录
export const LOGIN=(param,config)=>{
    return Ajax.post('/api/login',param,config).then(res=>res.data)
}
//账号注册
export const REGISTER=(param,config)=>{
    return Ajax.post('/api/register',param,config).then(res=>res.data)
}
//富文本信息上传
export const EDIT_POST=(param,config)=>{
    return Ajax.post("/api/editPost",param,config).then(res=>res.data)
}