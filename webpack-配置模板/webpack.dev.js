let {smart} =require('webpack-merge')
let base=require('./webpack.base.js')
let webpack=require('webpack')
module.exports=smart(base,{
    mode:'development',
    plugins:[
        new webpack.DefinePlugin({//定义环境变量（webpack内置的插件）
            DEV:JSON.stringify('development'),//这里需要使用stringify来进行字符串化，直接使用DEV:"dev"会把dev认为是一个变量
        }),
    ],
    //1. source-map 源码映射，会单独生成一个sourcemap文件，出错会标识当前报错的列和行
    //特点：大而全,会产生单独的文件，会显示行和列
    //2. eval-source-map 
    //特点：不会产生单独的文件，但可以显示出行和列
    //3. cheap-module-source-map  
    //特点：不会产出列，但是是一个单独的映射文件，这个文件可以单独保存起来，方便以后调试
    //4.cheap-module-eval-source-map
    //特点：不会产生列，不会产生文件，集成在打包中的文件中
    devtool:'source-map',//增加映射文件，可以帮我们调试源代码
    // devtool:'eval-source-map',
    // devtool:'cheap-module-source-map',
    // devtool:'cheap-module-eval-source-map',


})