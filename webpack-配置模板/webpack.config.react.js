let path=require('path')
let wepback=require('webpack')
module.exports={
    mode:'development',
    entry:{
       react:['react','react-dom']
    },
    output:{
        filename:'_dll_[name].js',
        path:path.resolve(__dirname,'dist'),
        library:'_dll_[name]',//指定当前打包文件后的结果名字
        // libraryTarget:'commonjs'//挂在exports下（ 默认使用var） ，还有umd模式等
    },
    plugins:[
        new wepback.DllPlugin({
            name:'_dll_[name]',//规定名字需要与上面的library名字同名
            path:path.resolve(__dirname,'dist','manifest.json')
        })

    ]
}