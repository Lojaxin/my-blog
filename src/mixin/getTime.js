export default {
    methods: {
        getTime(){
            var date = new Date();
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate()>9? date.getDate()+ ' ':'0'+date.getDate()+' ';
            var h = date.getHours()>9?date.getHours() + ':':'0'+date.getHours() + ':';
            var m = date.getMinutes()>9?date.getMinutes() + ':':'0'+date.getMinutes() + ':';
            var s = date.getSeconds()>9?date.getSeconds():'0'+date.getSeconds();
            return Y+M+D+h+m+s;
        }
    }
}