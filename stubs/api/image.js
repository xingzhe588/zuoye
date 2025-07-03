const router = require('express').Router();
const path = require('path');

// GET /image/prompt?prompt=xxx
router.get('/prompt', (req, res) => {
  // 假设你有一张本地图片放在 stubs/static/fake-image.jpg
  const fakeImagePath = path.resolve(__dirname, '../static/fake-image.jpg');
  res.set('Content-Type', 'image/jpeg'); // 关键：设置响应类型为图片
  res.sendFile(fakeImagePath, err => {
    if (err) {
      res.status(500).send('Mock image not found');
    }
  });
});

module.exports = router;
