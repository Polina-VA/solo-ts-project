const authRouter = require("./auth.routes");
const errorRouter = require("./error.routes");
const tokensRouter = require("./tokens.routes");


const apiRouter = require("express").Router();


apiRouter.use('/auth', authRouter)
apiRouter.use('/tokens', tokensRouter)


apiRouter.use('*', errorRouter)

module.exports = apiRouter;