let express=require("express");

let router=express.Router();

let regCtrl=require("../controller/regctr.js");

let conn = require("../config/db.js");


router.get("/",regCtrl.homepage);

router.get("/adminlogin",regCtrl.adminlogin);

router.get("/dashBoard", regCtrl.dashBoardPage); 

router.post("/validateAdminData",regCtrl.validateAd);

// router.get("/course",regCtrl.CourseReg);
// router.post("/addCourse",regCtrl.saveC);


router.get("/course", regCtrl.showCourse);
router.post("/addCourse", regCtrl.saveC);
router.get("/deleteById", regCtrl.deleteCourseById);

//router.get("/exam",regCtrl.Stu_Exam);


router.get("/exam", regCtrl.Stu_Exam);       
router.post("/SaveExamData", regCtrl.save_Exam); 

router.get("/UpdatedById", regCtrl.update_Exam);
router.post("/updatedUserExam", regCtrl.up_exam);


router.get('/question', regCtrl.Questionform);
router.post('/saveQues', regCtrl.SaveQuestions);


router.get("/schedule", regCtrl.scheduleForm);
router.post("/saveSchedule", regCtrl.saveSchedule);
router.get("/schedule/delete/:schid", regCtrl.deleteSchedule);
router.get("/schedule/edit/:schid", regCtrl.getUpdateScheduleForm);
router.post("/schedule/update/:schid", regCtrl.updateSchedule);





//==============Display Admin Data===============

router.get("/adinfo",regCtrl.admininfo);



router.get("/course", regCtrl.showCourse);
router.post("/addCourse", regCtrl.saveC);
router.get("/deleteById", regCtrl.deleteCourseById);

router.get("/exam",regCtrl.Stu_Exam);




router.get("/exam", regCtrl.Stu_Exam);       
router.post("/SaveExamData", regCtrl.save_Exam); 

router.get("/UpdatedById", regCtrl.update_Exam);

router.post("/updatedUserExam", regCtrl.up_exam);


router.get('/question', regCtrl.Questionform);
router.post('/saveQues', regCtrl.SaveQuestions);




router.get('/schedule', regCtrl.scheduleForm);
router.post('/saveSchedule', regCtrl.saveSchedule);




/*=============stud login================*/
router.get("/slogin",regCtrl.StudLogin);

router.post("/validateStudData", regCtrl.validateStud);

//router.get("/ValidateStudData",regCtrl.validateStud);


/*=============student reg==============*/
router.get("/sreg",regCtrl.AddStud);

router.post("/registerstudent",regCtrl.saveS);

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

//--------------------------------student exam detils routes---------------------

router.get("/student/exam-details", regCtrl.examDetailsPage);





module.exports=router;


