const models = require("../db/db");
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const $sql = require("../db/sqlMap");

const conn = mysql.createConnection(models.mysql);
conn.connect();

// 登录接口
router.post("/login", (req, res) => {
  const user = req.body;
  const sel_email = $sql.user.select + " where email = '" + user.email + "'";
  console.log(sel_email);
  conn.query(sel_email, user.email, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
    if (results[0] === undefined) {
      res.send("-1"); // -1 表示查询不到，用户不存在，即邮箱填写错误
    } else {
      if (
        results[0].email == user.email &&
        results[0].password == user.password
      ) {
        res.send("0"); // 0 表示用户存在并且邮箱密码正确
      } else {
        res.send("1"); // 1 表示用户存在，但密码不正确
      }
    }
  });
});

// 注册接口
router.post("/add", (req, res) => {
  const params = req.body;
  const sel_sql =
    $sql.user.select + " where username = '" + params.username + "'";
  const add_sql = $sql.user.add;
  console.log(sel_sql);

  conn.query(sel_sql, params.username, (error, results) => {
    if (error) {
      console.log(error);
      // can send error to frontend
      // or send 500 status code
    }
    if (results.length != 0 && params.username == results[0].username) {
      res.send("-1"); // -1 表示用户名已经存在
    } else {
      conn.query(
        add_sql,
        [params.username, params.email, params.password],
        (err, rst) => {
          if (err) {
            console.log(err);
          } else {
            console.log(rst);
            res.send("0"); // 0 表示用户创建成功
          }
        },
      );
    }
  });
});

// 获取菜品列表接口
router.get("/getFoods", (req, res) => {
  const sql = $sql.food.list;
  conn.query(sql, (error, results) => {
    if (error) {
      console.error("查询失败:", error);
      res.status(500).json({ error: "数据库查询失败" });
    } else {
      res.json(results);
    }
  });
});

router.post("/likeFood", (req, res) => {
  const { id } = req.body;
  const userEmail = req.body.email; // 从请求中获取用户邮箱

  // 首先检查用户是否已经喜欢过这个菜品
  conn.query($sql.user_likes.checkLike, [userEmail, id], (err, results) => {
    if (err) {
      console.error("检查点赞状态失败", err);
      return res.status(500).json({ error: '数据库错误' });
    }

    if (results.length > 0) {
      // 如果已经喜欢过，返回错误信息
      return res.status(400).json({ error: '您已经喜欢过这道菜了' });
    } else {
      // 如果没有喜欢过，则添加喜欢
      conn.query($sql.user_likes.add, [userEmail, id], (err) => {
        if (err) {
          console.error("添加点赞失败", err);
          return res.status(500).json({ error: '数据库错误' });
        }
        // 更新菜品点赞数
        conn.query('UPDATE foods SET likes = likes + 1 WHERE id = ?', [id], (err) => {
          if (err) {
            console.error("更新点赞数失败", err);
            return res.status(500).json({ error: '数据库错误' });
          }
          res.json({ success: true });
        });
      });
    }
  });
});

// 获取用户喜欢的菜品
router.get("/getLikedFoods", (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: '缺少用户邮箱参数' });
  }

  conn.query($sql.user_likes.getByUser, [email], (error, results) => {
    if (error) {
      console.error("获取喜欢的菜品失败:", error);
      res.status(500).json({ error: "数据库查询失败" });
    } else {
      res.json(results);
    }
  });
});

router.get("/getFoodDetail", (req, res) => {
  const id = req.query.id;
  const sql = $sql.food_detail.getById;
  conn.query(sql, [id], (error, results) => {
    if (error) {
      console.error("查询详情失败:", error);
      res.status(500).json({ error: "数据库查询失败" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "未找到该菜品详情" });
    } else {
      res.json({ detail: results[0].detail });
    }
  });
});
module.exports = router;
