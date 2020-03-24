let {smart} =require('webpack-merge')
let webpack=require('webpack')
let base=require('./webpack.base.js')
let UglifyjsPlugin = require('uglifyjs-webpack-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
module.exports=smart(base,{
    mode:'production',
    optimization:{//优化项(webpack4新提供的),----->添加这一项后,js文件就不会压缩了,需要添加UglifyjsPlugin配置
        // minimizer:[//压缩
        //     new UglifyjsPlugin({
        //         cache:true,//是否使用缓存
        //         parallel:true,//是否并发打包(同时压缩多个js文件)
        //         sourceMap:true//是否源码映射(如es6转es5,方便调试)
        //     }),//压缩js
        //     new OptimizeCss(),//压缩css，使用后必须使用uglifyjs-webpack-plugin插件js才会被压缩
        // ],
        splitChunks:{//分割代码块(这个是webpack4里的，以前用的是commonChunkPlugins)
            cacheGroups:{//缓存组
                common:{//公共的模块
                    chunks:'initial',
                    minSize:0,//设置公共文件大小限制
                    minChunks:2 //设置被引用的次数限制

                },
                vendor:{//第三方模块
                    priority:1,
                    test:/node_modules/,
                    chunks:'initial',
                    minSize:0,//设置公共文件大小限制
                    minChunks:2 //设置被引用的次数限制
                }

            }

        }
    },
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
    // devtool:'source-map',//增加映射文件，可以帮我们调试源代码
    devtool:'eval-source-map',
    // devtool:'cheap-module-source-map',
    // devtool:'cheap-module-eval-source-map',
})