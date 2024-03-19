const express =require('express');
const path = require('path');
var ejs = require('ejs');
//导入cors包
const cors = require('cors');
var config = require('./config/default');

const app = express();

app.use(express.static(__dirname+'/views'));

//实现跨域
app.use(cors());
//加入html视图
app.engine('html',ejs.__express);
app.set('view engine','html');

const route = require('./routes/downLoad');
route(app); 

app.listen(config.port,()=>{
    //console.log(config.port)
    console.log('服务器在端口8000上运行')
})