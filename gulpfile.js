// 导入gulp
const gulp =require("gulp")

// 导入gulp-cssmin,css压缩第三方包
const cssmin=require("gulp-cssmin")

// 导入gulp-autoprefixer,
const autoprefixer=require("gulp-autoprefixer")

// 导入gulp-babel,转为ES5语法,还需下载@babel/core和@babel/preset-env两个包,但只需导入gulp-babel一个就行
const babel=require("gulp-babel")

// 导入gulp-uglify,压缩js第三方包
const uglify=require("gulp-uglify")

// 导入gulp-htmlmin,HTML压缩第三方包
const htmlmin=require("gulp-htmlmin")

// 导入del,删除目录的第三方包
const del=require("del")

// 导入gulp-webserver,开启服务器的第三方包
const webserver=require("gulp-webserver")



// 打包css的方法
const cssHandler=()=>{
    return gulp.src("./src/css/*.css")
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(".dist/css"))
}

// 移动图片的方法
const imgHandler =()=>{
    return gulp.src("./src/img/**")
    .pipe(gulp.dest("./dist/img"))
}

// 打包js的方法
const jsHandler=()=>{
    return gulp.src(".src/js/*.js")
    // ES6代码转为ES5
    .pipe(babel({
        presets:["@babel/env"]
    }))
    // 压缩js
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
}

// 移动lib文件夹的方法
const libHandler=()=>{
    return gulp.src("./src/lib/**")
    .pipe(gulp.dest("./dist/lib"))
}

//压缩html的方法
const htmlHandler=()=>{
    return gulp.src(".src/pages/*.html")
    // 压缩HTML需要设置的参数
    .pipe(htmlmin({
        collapseWhitespace: true, //压缩空格
        removeAttributeQuotes:true, //移除属性的引号
        collapseBooleanAttributes:true,//把值为布尔值的属性简写
        removeComments:true,//移除注释
        minifyCSS:true,//把页面里面的style标签里面的css样式也去空格
        minifyJS:true,//把页面里的script标签里面的js代码给去空格
    }))
    .pipe(gulp.dest("./dist/pages"))
}

// 自动删除dist目录的任务
const delHandler=()=>{
    return del([",.dist"])
}

// 自动监听文件的任务
const watchHandler=()=>{
    gulp.watch("./src/css/*.css",cssHandler)
    gulp.watch("./src/img/**",imgHandler)
    gulp.watch("./src/js/*.js",jsHandler)
    gulp.watch("./src/lib/*.js",libHandler)
    gulp.watch("./src/pages/*.html",htmlHandler)
}

// 书写配置服务器
const serverHandler=()=>{
    // 要把页面在服务器打开
    // 打开的是dist目录里已压缩好的页面
    return gulp.src("./dist")
    // 需要一些配置
    .pipe(webserver({
        port:8848,//端口号,0-65535间随意,尽量不要在0-1023内
        open:"./pages/txdj.html",//打开的首页
        livereload:true,//自动刷新浏览器
        proxies:[
            //每一个代理配置都是一个对象
            {
                source:"./"
            }
        ]

    }))
}
