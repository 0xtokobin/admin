// 导入所需的库
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = mongoose.connection;
//导入User模型
const User = require("./models/User/index.js");

// 初始化 Express 应用
const app = express();
//将其转换为json格式
app.use(express.json());
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// 连接 MongoDB 数据库
mongoose.connect("mongodb://127.0.0.1:27017/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// 检查数据库连接是否成功
db.on("connected", () => {
  console.log("MongoDB connected successfully.");
});
db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
// 登录路由
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // 查找用户
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send("无效的用户名");
  }

  // 校验密码
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("无效的密码");
  }

  // 创建并返回 JWT Token
  const token = jwt.sign({ _id: user._id }, "yourSecretKey");
  //使用res.header()设置响应头然后返回token
  res.header("auth-token", token).send(token);
});
// 注册路由
app.post("/api/register", async (req, res) => {
  //检查用户名是否已经存在
  let user = await User.findOne({ username: req.body.username });
  //如果存在，返回400错误
  if (user) return res.status(400).send("用户名已经存在.");
  //将用户信息保存到数据库
  user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  //对密码进行加密
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});
// 设置服务器监听端口
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
