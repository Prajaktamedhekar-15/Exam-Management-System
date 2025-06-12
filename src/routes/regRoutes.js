let express=require("express");

let router=express.Router();

let regCtrl=require("../controller/regctr.js");


router.get("/",regCtrl.homepage);

router.get("/adminlogin",regCtrl.adminlogin);

router.get("/dashBoard", regCtrl.dashBoardPage); 

router.post("/validateAdminData",regCtrl.validateAd);

router.get("/course",regCtrl.CourseReg);
router.post("/addCourse",regCtrl.saveC);

module.exports=router;
