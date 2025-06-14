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


exports.Stu_Exam=(req,res)=>{
  res.render("exam.ejs");
  
}

exports.save_Exam = async (req, res) => {
  try {
    let { examName, totalMarks, passingMarks } = req.body;

    // Await the promise
    await regmodel.saveExamdata(examName, totalMarks, passingMarks);

    // If successful
    res.render("exam.ejs", { MSG: "Exam saved successfully!" });
  } catch (err) {
    // If error occurs
    console.error("Error saving exam:", err);
    res.render("exam.ejs", { MSG: "Error saving exam: " + err.message });
  }
};

// exports.Stu_Exam = (req, res) => {
//   regmodel.getAllExamData()
//     .then((examData) => {
//       res.render("exam", { data: examData, MSG: "" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.render("exam", { data: [], MSG: "Error loading exam data" });
//     });
// };
