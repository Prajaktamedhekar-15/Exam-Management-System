let regmodel=require("../models/regmodel.js");


exports.dashBoardPage = (req, res) => {
  res.render("Admin_Dashboard.ejs");
};

exports.homepage=(req,res)=>{
    res.render("homepage.ejs");
}

exports.adminlogin=(req,res)=>{
    res.render("Admin_login.ejs");
}

exports.validateAd=(req,res)=>{
  let {username,password}=req.body;

  let result=regmodel.ValidateAdmin(username,password);

  result.then((r)=>{
    if(r.length>0)
    {
      req.session.UserId=r[0].id;
        //console.log("login id : "+req.session.UserId);
       res.render("Admin_Dashboard.ejs",{msg:"successfully login"});
       
    }
    else{
       res.render("Admin_login.ejs",{msg:"Invalid username and password"})
   
    }
      });
     result.catch((err)=>{
        res.render("error.ejs");
  });
}

exports.CourseReg = (req, res) => {
  regmodel.viewCourseData()
    .then((result) => {
      res.render("course.ejs", { data: result, MSG: "" });
    })
    .catch((err) => {
      res.render("course.ejs", { data: [], MSG: "Error loading data: " + err.message });
    });
};
exports.saveC = (req, res) => {
  const { cname } = req.body;

  regmodel.saveCourse(cname)
    .then(() => {
      return regmodel.viewCourseData();
    })
    .then((result) => {
      res.render("course.ejs", { data: result, MSG: "Data added successfully" });
    })
    .catch((err) => {
      res.render("course.ejs", { data: [], MSG: "Problem in data adding: " + err.message });
    });
};

exports.showCourse = (req, res) => {
  regmodel.viewCourseData()
    .then((result) => {
      res.render("course.ejs", { data: result, MSG: "" });
    })
    .catch((err) => {
      res.render("course.ejs", { data: [], MSG: "Error loading data: " + err.message });
    });
};

exports.deleteCourseById = (req, res) => {
  const id = req.query.c_id;

  regmodel.deleteCourse(id)
    .then(() => regmodel.viewCourseData())
    .then((result) => {
      res.render("course.ejs", {
        data: result,
        MSG: "Course deleted successfully"
      });
    })
    .catch((err) => {
      console.error("Error deleting course:", err.message);
      res.render("course.ejs", {
        data: [],
        MSG: "Error deleting course: " + err.message
      });
    });
};
exports.Stu_Exam = async (req, res) => {
  try {
    const result = await regmodel.viewExamData();
    res.render("exam.ejs", { data: result, MSG: "" });
  } catch (err) {
    console.error("Error fetching exams:", err);
    res.render("exam.ejs", { data: [], MSG: "Error loading exams." });
  }
};
exports.save_Exam = async (req, res) => {
  try {
    let { examName, totalMarks, passingMarks } = req.body;

    await regmodel.saveExamdata(examName, totalMarks, passingMarks);

    const result = await regmodel.viewExamData(); // fetch updated data

    res.render("exam.ejs", { data: result, MSG: "✅ Exam saved successfully!" });
  } catch (err) {
    console.error("Error saving exam:", err);
    res.render("exam.ejs", { data: [], MSG: "❌ Error saving exam: " + err.message });
  }
};

exports.update_Exam = async (req, res) => {
  const c_id = req.query.Exam_id;

  try {
    const result = await regmodel.UpdatedExamData(c_id);
    res.render("Updated_Exam.ejs", { ExamData: result[0] }); // Make sure to pass result[0]
  } catch (err) {
    console.error("Error fetching exam:", err);
    res.render("exam.ejs", { MSG: "Error loading exam", data: [] });
  }
};

exports.up_exam = async (req, res) => {
  const { Ex_id, examName, totalMarks, passingMarks } = req.body;

  try {
    await regmodel.UpdatedExamdata(Ex_id, examName, totalMarks, passingMarks);
    res.redirect("/exam");
  } catch (err) {
    console.error("Error in updating:", err);
    res.send("Error in updating");
  }
};






