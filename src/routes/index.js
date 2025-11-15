const express= require("express")
const app = express();
const router = express.Router();
const v1Router=require("./V1")

router.use("/v1",v1Router);

module.exports=router;