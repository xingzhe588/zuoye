const router = require('express').Router();
const listRouter = require('./list');
const imageRouter = require('./image');
// const keycloak = require('./keycloak');

module.exports = router;

const delay =
  (ms = 1000) =>
  (req, res, next) => {
    setTimeout(next, ms);
  };

// router.use(keycloak.middleware());
router.use(delay());
router.use('/list', listRouter);
router.use('/image', imageRouter);
