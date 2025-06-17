let express=require("express");

let router=express.Router();

let regCtrl=require("../controller/regctr.js");

let conn = require("../config/db.js");


router.get("/",regCtrl.homepage);

router.get("/adminlogin",regCtrl.adminlogin);

router.get("/dashBoard", regCtrl.dashBoardPage); 

router.post("/validateAdminData",regCtrl.validateAd);

router.get("/course",regCtrl.CourseReg);
router.post("/addCourse",regCtrl.saveC);

/*=============student reg==============*/
router.get("/sreg",regCtrl.AddStud);

router.post("/registerstudent",regCtrl.saveS);

/*=============stud login================*/
router.get("/slogin",regCtrl.StudLogin);

router.post("/validateStudData", regCtrl.validateStud);

//router.get("/ValidateStudData",regCtrl.validateStud);

//==============Display Admin Data===============

router.get("/adinfo",regCtrl.admininfo);

//==============student dashboard===================
router.get("/studDash",regCtrl.StudDash);

//=====================student details===============
router.get("/studentDetails", regCtrl.StudentDetails);

//=====================student register ineternal====================
router.get("/register",regCtrl.loadRegisterForm);

router.post("/register",regCtrl.saveStudent);

// Show only the form HTML (partial) dynamically
router.get("/registerForm", (req, res) => {
    conn.query("SELECT * FROM schedule s JOIN course c ON s.cid = c.cid JOIN exam e ON s.ex_id = e.ex_id", (err, rows) => {
        if (err) return res.status(500).send("DB Error");
        res.render("StudentRegister", { schedules: rows });
    });
});





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


