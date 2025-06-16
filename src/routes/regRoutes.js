let express=require("express");

let router=express.Router();

let regCtrl=require("../controller/regctr.js");


router.get("/",regCtrl.homepage);

router.get("/adminlogin",regCtrl.adminlogin);

router.get("/dashBoard", regCtrl.dashBoardPage); 

router.post("/validateAdminData",regCtrl.validateAd);


router.get("/course", regCtrl.showCourse);
router.post("/addCourse", regCtrl.saveC);
router.get("/deleteById", regCtrl.deleteCourseById);

router.get("/exam",regCtrl.Stu_Exam);


// router.post("/SaveExamData",regCtrl.save_Exam);

// router.get("/exam", regCtrl.Stu_Exam);


router.get("/exam", regCtrl.Stu_Exam);       
router.post("/SaveExamData", regCtrl.save_Exam); 

router.get("/UpdatedById", regCtrl.update_Exam);

router.post("/updatedUserExam", regCtrl.up_exam);
module.exports=router;
