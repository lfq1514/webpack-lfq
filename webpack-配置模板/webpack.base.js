let path=require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyjsPlugin = require('uglifyjs-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
let CopyWebpackPlugin= require('copy-webpack-plugin')
let webpack=require('webpack')
let Happypack=require('happypack')
module.exports={
    // mode:'production',
    //多入口
    entry:{
        index:'./src/index.js',
        // home:'./src/home.js'
    },
    output:{
        //[name] 相当于上面两个入口的名字home和other
        filename:'[name].js',
        path:path.resolve(__dirname,'dist'),
        // publicPath:'http://www.baidu.com'//在所有引用的资源前添加路径
    },
   
    module: {//模块
        // noParse:/jquery/,//不去解析jquery的相关依赖，（如果提前知道某一个包并没有一些依赖项，可以设置这个优化项，提高打包速度）

        //loader特点 功能专一，一个loader负责一个功能职责
        //loader用法  如果只有一个loader 以字符串形式写即可；如果是多个loader，使用[]
        //多个loader的使用顺序， 默认是从右向左，从下到上 
        //loader还可以写成对象方式

        //css-loader 解析@import这种语法
        //style-loader 把css插入到head标签中
        rules: [//规则
            //配置代码校验(需要在eslint官网配置好配置项，然后下载生成的文件.eslintrc.json,放在项目中)
            // {
            //     test:/\.js$/,
            //     use:{
            //         loader:'eslint-loader',
            //         options:{
            //             enforce:'pre' //前置loader 
            //         }
            //     },

            // },
            //html-withimg-loader  解析html，
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
             //file-loader (一般不用这个，优先用url-loader)
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 esModule: false,
            //             }
            //         }
            //     ]
            // }
            //url-loader   可以限制图片的输出，当图片小于设定的限制，会输出base64，否则输入原文件（输出源文件会请求http）
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 2 * 1024,
                        outputPath:'/img/',//将图片资源打包分类放在img目录下
                        publicPath:'http://www.baidu.com'//资源前添加路径
                    }

                }
            },
            //多线程打包（js，css等）
            // {
            //     test: /\.js$/,
            //     use: 'Happypack/loader?id=js',
            //     include: path.resolve(__dirname, 'src'),//包含src目录下的js
            //     exclude: /node_modules/ //排除node_modules文件下的js
            // },

            //处理js文件
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',//语法转化
                    options: {
                        presets: [//包含babel转化需要的模块
                            "@babel/preset-env" //js语法转化(如es6转es5)
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',//转化class类的语法
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),//包含src目录下的js
                exclude: /node_modules/ //排除node_modules文件下的js
            },
            //处理css文件
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader:'style-loader',
                    //     options:{
                    //         // insert:''//css插入的位置
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,//将css样式抽离出来，通过link再引入进来
                    "css-loader",
                    "postcss-loader",//样式属性自动添加浏览器前缀(需要使用autoprefixer插件,注意:使用9.xx版本的不会生效,改成7.xx版本的就生效了)
                ]


            },
            //处理less文件 sass stylus
            {
                test: /\.less$/,
                use: [
                    // {
                    //     loader:'style-loader',
                    //     options:{
                    //         // insert:''//css插入的位置
                    //     }
                    // },//将样式放在style标签中，并插入都head标签中
                    MiniCssExtractPlugin.loader,//将css样式抽离出来，通过link再引入进来
                    "css-loader",//解析@import这类语法，解析路径
                    "postcss-loader",//样式属性自动添加浏览器前缀
                    "less-loader"//把less转化为css
                ]


            },
            //expose-loader  暴露全局的loader 暴露给window全局对象上（内联loader）
            {
                test: require.resolve('jquery'),
                use: 'expose-loader?$'
            },
           
        ]
    },
    
    // watch:true,//监控代码，代码变动就会实时打包
    // watchOptions:{//监控的选项
    //     poll:1000,//每秒问我1000次，是否需要更新(目前1000比较合理)
    //     aggregateTimeout:1000,//监控防抖处理，（1000ms内如果再次输入不执行打包）
    //     ignored:/node_modules/ //不需要进行监控的文件
    // },
    resolve:{//解析
        // modules:[path.resolve('node_modules')],//指定解析第三方模块的位置,(commonjs规范会先从当前目录下找，找不到再从上级目录下找)
        // extensions:['.js','.css','.vue','.json'],//解析文件时,(优先解析文件的css文件，找不到再找js，依次解析)
        // alias:{//别名
        //     // '@h':path.resolve(__dirname,'/home'),//给某一常用路径起别名
        // }

    },
    devServer: {
        port:3000,
        open:true,//开启服务以后自动打开浏览器
         contentBase:'./dist'
        // proxy: {
        //   '/api': {
        //     target: 'http://localhost:9999',
        //     pathRewrite: {'^/api' : ''}
        //   }
        // }
      },
    plugins:[
        //配置多线程打包
        // new Happypack({
        //     id:'js',
        //     use:[{
        //         loader: 'babel-loader',//语法转化
        //         options: {
        //             presets: [//包含babel转化需要的模块
        //                 "@babel/preset-env" //js语法转化(如es6转es5)
        //             ],
        //             plugins: [
        //                 '@babel/plugin-proposal-class-properties',//转化class类的语法
        //                 '@babel/plugin-transform-runtime'
        //             ]
        //         }

        //     }]
        // }),

          //引用动态链接库插件
        //   new webpack.DllReferencePlugin({
        //     manifest:path.resolve(__dirname,'dist','manifest.json')
        // }),

        //指定要忽略打包的模块
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        // new webpack.DefinePlugin({//定义环境变量（webpack内置的插件）
        //     DEV:JSON.stringify('dev'),//这里需要使用stringify来进行字符串化，直接使用DEV:"dev"会把dev认为是一个变量
        // }),
        new HtmlWebpackPlugin({
            template: './src/index.html',//指定打包的模板
            filename: 'index.html',//指定打包后的名字
            minify: {//设置模板的最小化操作
                removeAttributeQuotes: true,//删除属性的双引号
                collapseWhitespace: false,//折叠空行(一行显示)
            },
            hash: true,//在引用的时候加上哈西戳(解决缓存的问题)

        }),
         //将css样式抽离出来
         new MiniCssExtractPlugin({
            filename: 'css/main.css' //抽离出来样式的文件名(css/是自定义的资源目录)
        }),
        // new webpack.ProvidePlugin({//在每个模块中都注入$
        //     $: 'jquery'
        // }),
        //打包之前删除指定的文件(这个插件默认会清除 output.path 输出的目录)
        // new CleanWebpackPlugin({
        //     //这个参数配置要删除那些文件，和不要删除那些文件，不要删除的文件前面加个逻辑运算符非 ! ，*号可以通过站位符来处理，表示什么开头，什么结尾啥的
        //     // cleanOnceBeforeBuildPatterns:''
        // }),

        //打包的时候将其他一些不在依赖关系里的文件拷贝到指定打包目录下。
        // new CopyWebpackPlugin([
        //     {from:'./src/rename.md',to:'./'}//to设置为./，就会默认拷贝到打包生成的根目录下
        // ]),
        //在打包生成的文件中添加一些说明(如版权声明，文件说明等等)

        new webpack.BannerPlugin('make 2020 by lfq')
    ],
    externals: {//配置不打包的模块（如已经通过cdn的方式引入，又在文件中通过import方式引入，可以在这里配置，防止被打包进入）（通过cdn引入后就不要再打包相关的依赖包了）
        jquery: '$'

    },


}