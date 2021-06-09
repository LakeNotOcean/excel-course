const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin=require('html-webpack-plugin');
const CopyPlugin=require('copy-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');


const path=require('path');

const isProd=process.env.NODE_ENV==='production'
const isDev=!isProd

const fileName = ext => isDev? `bundle.${ext}`:`bundle.[hash].${ext}`;

const jsLoaders = () =>{
    const loaders = [
        {
            loader:"babel-loader",
            options:{
                presets:['@babel/preset-env']
            }
        }
    ]

    if (isDev) {
        loaders.push({loader:'eslint-loader'});  
    }  
    console.log(loaders);
    return loaders;
}

console.log('is Prod', isProd);
console.log('isDev', isDev);

module.exports={
    context:path.resolve(__dirname,'src'),
    mode:'development',
    entry:['@babel/polyfill','./index.js'],
    output:{
        filename:fileName('js'),
        path:path.resolve(__dirname,'dist') 
    },
    resolve:{
        extensions:['.js'],
        alias:{
            '@':path.resolve(__dirname,'src'), 
            '@core':path.resolve(__dirname,'src/core'),
            '@components':path.resolve(__dirname,'src/components')
        }
    },
    devtool:isDev? 'source-map':false,
    devServer:{
        port:3000,
        hot:isDev,
    },  
    plugins:[
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin(
            {
                template:'index.html',
                minify:{
                    collapseWhitespace:isProd,
                    removeComments:isProd
                }
            }
        ),
        new CopyPlugin(
            {
                patterns:[
                    {from:path.resolve(__dirname,'src/favicon.ico'),to:path.resolve(__dirname,'dist')}
                ]
            }
        ),
        new MiniCssExtractPlugin({
            filename:fileName('css')
        })
    ],
    module: {
        rules: [
            {
            test: /\.s[ac]ss$/i,
            use: [    
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
            ]
            },
            {
            test:/\.js$/, 
            exclude: /node_modules/, 
            use:jsLoaders()
            } 
        ]
      },
    
}
