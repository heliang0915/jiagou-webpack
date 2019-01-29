
//webpack 是node写的 支持commonjs语法
let path=require("path");
let CleanWebpackPlugin=require('clean-webpack-plugin');
let HtmlWebpackPlugin=require('html-webpack-plugin');
//合并css
let MiniCssExtractPlugin=require('mini-css-extract-plugin');
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let OptimizeCSSAssets=require('optimize-css-assets-webpack-plugin')
const PUBLISH_DIR="dist";

module.exports={
    // optimization: { //优化项
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             cache: true,
    //             parallel: true,
    //             sourceMap: true
    //         }),
    //         new OptimizeCSSAssets()] //压缩css
    // },
    //打包模式 production生产模式 development 开发模式
    mode: "development",
    // mode: "development",
    //入口
    entry:"./src/index.js",
    //出口
    output: {
        filename: "bundle.[hash:8].js", //输出文件名
        path: path.resolve(__dirname,PUBLISH_DIR) //输出文件路径
    },
    devServer:{ //开发服务器
        port:3000,//端口
        progress:true,//进度条
        open:true,//自动打开浏览器
        compress:true,//gzip
        contentBase:path.resolve(__dirname,PUBLISH_DIR) //根目录
    },
    //解析
    resolve: {},
    //处理各个文件的loader
    module: {
        rules: [
            {
            test:/\.js$/,
            use:[
                {
                    loader: 'babel-loader'
                }],
            exclude:/node_modules/
           },
            {
            test:/\.css$/,
            use:[
                MiniCssExtractPlugin.loader, //需要放到顶部

            //     { //从右到左解析
            //     loader: "style-loader", //将解析的css转换为style插入页面
            //     options:{
            //         // insertAt:'top', //将style标签插到顶部
            //         // insertInto:'body' //插到指定dom位置
            //     }
            // }
            // ,
                {
                loader: "css-loader" //解析css成一个模块
            }, "postcss-loader"]
         },{
            test:/\.scss$/,
            use:[MiniCssExtractPlugin.loader,'css-loader',"postcss-loader",'sass-loader']  //此处注意顺序 postcss 要放在css-loader之前 scss之后
        }]},
    //所有插件
    plugins: [
        new CleanWebpackPlugin(PUBLISH_DIR),
        new MiniCssExtractPlugin({
            filename:"[name].[hash:8].css",
            chunkName:"[id].[hash:8].css"
        }),
        new HtmlWebpackPlugin({
            template:"./template/index.html",
            filename: "index.html",
            // hash:true, //hash
            minify: {  //压缩html  添加选项 不压缩的话就配置为false
                removeAttributeQuotes:true, //删除属性双引号
                collapseWhitespace:true, //折叠空行
            }
        })
    ]
}