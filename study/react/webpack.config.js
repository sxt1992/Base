var webpack=require('webpack');
var path=require('path');
var glob=require('glob');
var entries=function(globPath){
    var entryList={},entry,dirname,basename,ind,files=glob.sync(globPath);
    for(let i=0;i<files.length;i++){
        entry=files[i];
        dirname=path.dirname(entry);
        basename = path.basename(entry);
        ind=basename.lastIndexOf(".");
        basename=basename.substring(0,ind);
        entryList[basename]=entry;
    }
    return entryList;
};

const debug = process.env.NODE_ENV !== 'production';

module.exports={
    entry:entries('./src/app.js*'),
    output:{
        path:path.join(__dirname,"./dist/"),
        filename:"[name].js"
    },
    module:{
        loaders:[
            {
                test:/\.js$|\.jsx$/,
                exclude:/node_modules/,
                loader:"babel",
                query:{
                    presets:['react','es2015','stage-2']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss']
    },
    plugins:[
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:false
            },
            output: {
                comments:false
            }
        })*/
    ],
    watch:true
};