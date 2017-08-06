import express from 'express';
import path from 'path';
import qs from 'qs';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import apiRouter from './api/apiRouter';
import logger from 'morgan';

import handleRender from './render';


const app = new express();
const port = 4000;

app.set('jwtTokenSecret',"liulang");

if(process.env.NODE_ENV === 'development'){
    app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//静态资源路径
app.use(express.static(path.join(__dirname,'../assets')))
app.use(express.static(path.join(__dirname,'../public')))
app.use(express.static(path.join(__dirname,'../dist')))
//跨域请求
app.all("*",(req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});
//后端路由
app.use('/api',apiRouter);
//所有请求导向前端页面
app.use('*',handleRender);
app.listen(port,err=>{
    if(err){
        console.error(err);
    } else {
        console.info(`the server has been listened at port: ${port}`)
    }
})