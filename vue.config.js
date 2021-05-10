const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');
module.exports = {
    publicPath: '/',//这里必须加上/,不能加二级路径,否则打包不会成功
    devServer: {

        sockHost: 'http://127.0.0.1:8099'
    },
    //修改webpack的配置
    configureWebpack:config=>{
        if (process.env.NODE_ENV !== 'production') return;
        return {
            plugins: [
                new PrerenderSPAPlugin({
                    // 生成文件的路径，也可以与webpakc打包的一致。
                    // 下面这句话非常重要！！！
                    // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
                    staticDir: path.join(__dirname,'dist'),
                    // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
                    routes: ['/', '/articleText','/article'],
                    // 这个很重要，如果没有配置这段，也不会进行预编译
                    renderer: new PrerenderSPAPlugin.PuppeteerRenderer({//这样写renderAfterTime生效了
                        renderAfterTime: 5000
                    })
                }),
            ],
        }
    }
}