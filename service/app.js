const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
const path = require('path');
const app = express();

const userApi = require('./api/userApi.js');

// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// 解析 application/json
app.use(bodyParser.json());

app.use(cors());

//设置跨域请求
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

// 配置静态文件服务
const imgPath = path.join(__dirname, 'img');
console.log('静态文件目录路径:', imgPath); // 调试信息

// 添加静态文件服务的错误处理
app.use('/img', express.static(imgPath, {
  setHeaders: (res, path) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cache-Control', 'public, max-age=31536000');
  }
}));

// 添加一个测试路由来检查静态文件服务
app.get('/test-image', (req, res) => {
  const testImagePath = path.join(imgPath, 'gongbaojiding.jpg');
  console.log('测试图片路径:', testImagePath); // 调试信息
  res.sendFile(testImagePath, (err) => {
    if (err) {
      console.error('发送测试图片失败:', err);
      res.status(500).send('图片发送失败');
    }
  });
});

app.use("/api/user",userApi);

// 尝试启动服务器，如果端口被占用则尝试其他端口
const startServer = (port) => {
  app.listen(port, () => {
    console.log(`服务器启动成功，监听端口 ${port}`);
    console.log("静态文件目录:", imgPath);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`端口 ${port} 已被占用，尝试端口 ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error('服务器启动失败:', err);
    }
  });
};

startServer(10520);