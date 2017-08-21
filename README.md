# reactApp

基于node，express，react，redux，immutableJs，mongodb，jwt的前后端spa同构示例项目

## 效果图

![img](https://github.com/ozil-110/reactApp/blob/master/assets/images/VIDEO0010.mp4_1502088898.gif)
![img](https://github.com/ozil-110/reactApp/blob/master/assets/images/VIDEO0010.mp4_1502089018.gif)

## 依赖

- mongodb 3.6
- webpack 2.2
- node 7.7

## 技术栈

- node
- express
- react
- redux
- react-router
- immutableJs
- mongodb
- jwt token

## 数据结构

### 用户

```js
{
    id,        //用户id
    score,     //所得分数
    password,  //密码
    name,      //姓名
    _v
}
```
### 主题

```js
{
    id,             //用户id
    type,           //发表类型
    time: {         //时间，包括年，天，小时，分，秒
        minute,
        day,
        month,
        year,
        date
    },
    content,        //发表的内容
    title,          //标题
    author,         //作者
    flag,           //标记
    votes： [],          //点赞人姓名的数组
    discussion: [   //评论
        {
            content,       //评论内容
            author: {      //评论人，包括姓名，分数
                name,
                score
            }
            time           //评论时间
        },
        ...
    ],
    _v
}
```

## 运行demo

### 环境

安装node，mongodb；配置webpack

### 准备

修改src/constant/config.js文件，指定自己的数据库地址，端口，数据库名；node服务器端口，ip；启动mongodb服务


### 开发环境

推荐

```js
git clone https://github.com/ozil-110/reactApp.git
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
```
#### 运行

```js
npm run run-dev-server
npm run dev
```

### 生产环境


```js
npm run start
npm run build
```

### 打开4000端口

### 兼容性

建议使用chrome，IE和firefox有兼容性问题

### 功能


1. token身份验证
2. 个人中心
3. 搜索用户文章
4. 发表文章
5. 评论点赞
6. 获取分数排名
 
 
### 希望和大家一起分享、交流和学习
