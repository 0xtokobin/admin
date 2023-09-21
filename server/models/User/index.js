const bcrypt = require("bcryptjs");
// 定义用户模型
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 如果用户密码发生变化，就对密码进行加密
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//导出用户模型
module.exports = mongoose.model("User", userSchema);
