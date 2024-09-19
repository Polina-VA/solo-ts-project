const errorRouter = require('express').Router();

errorRouter.get('/', (req, res) => {
  res.status(404).json(404);
});

module.exports = errorRouter;