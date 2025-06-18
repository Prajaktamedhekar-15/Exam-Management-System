let regmodel=require("../models/regmodel.js");
const service=require("../services/regService.js");
const conn=require("../config/db.js");
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

//==================================exam ==========================

//===============display admin msg===============


exports.admininfo = (req, res) => {
  const aid = req.session.adminid; 

  regmodel.getAdminById(aid, (err, adminData) => {
    if (err) {
      console.error("DB error:", err);
      return res.send("Database error");
    }

    if (adminData) {  
      console.log("Admin Data from DB:", adminData);  
      res.render("ViewAdminData", { admin: adminData }); 
    } else {
      res.send("No admin found");
    }
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



exports.Questionform = (req, res) => {
  Promise.all([
    regmodel.getAllQuestion(),
    new Promise((resolve, reject) => {
      conn.query("SELECT * FROM course", (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    })
  ])
  .then(([questions, courses]) => {
    res.render("addQuestion", { questions, courses });
  })
  .catch((err) => {
    console.error("Error loading question form:", err);
    res.status(500).send("Internal Server Error");
  });
};

// Save New Question
exports.SaveQuestions = (req, res) => {
  const { question, option1, option2, option3, option4, correctAnswer, course_id } = req.body;

  const insertQ = `INSERT INTO question (qname, op1, op2, op3, op4, answer) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [question, option1, option2, option3, option4, correctAnswer];

  conn.query(insertQ, values, (err, result) => {
    if (err) return res.status(500).send("Error saving question");

    const qid = result.insertId;
    conn.query(`INSERT INTO coursequestionjoin (qid, cid) VALUES (?, ?)`, [qid, course_id], (err2) => {
      if (err2) return res.status(500).send("Error linking question to course");

      res.redirect('/question');
    });
  });
};

//=================================================================================
// exports.scheduleForm = (req, res) => {
//   regmodel.getAllCourses((err1, courses) => {
//     if (err1) return res.status(500).send("Error fetching courses");

//     regmodel.getAllExams((err2, exams) => {
//       if (err2) return res.status(500).send("Error fetching exams");

//       regmodel.getAllSchedules((err3, scheduleList) => {
//         if (err3) return res.status(500).send("Error fetching schedule list");

//         res.render("Schedule", { courses, exams, scheduleList });
//       });
//     });
//   });
// };

// exports.saveSchedule = (req, res) => {
//   const { sdate, starttime, endtime, course_id, exam_id } = req.body;
//   const cid = parseInt(course_id);
//   const ex_id = parseInt(exam_id);

//   regmodel.saveSchedule(sdate, starttime, endtime, cid, ex_id, (err) => {
//     if (err) return res.status(500).send("Failed to save schedule");
//     res.redirect("/schedule");
//   });
// };

// exports.deleteSchedule = (req, res) => {
//   const { schid } = req.params;
//   const sql = "DELETE FROM schedule WHERE schid = ?";
//   db.query(sql, [schid], (err) => {
//     if (err) return res.status(500).send("Error deleting schedule");
//     res.redirect("/schedule");
//   });
// };


// Show form and schedule list
exports.scheduleForm = (req, res) => {
  regmodel.getAllCourses((err1, courses) => {
    if (err1) return res.status(500).send("Error fetching courses");

    regmodel.getAllExams((err2, exams) => {
      if (err2) return res.status(500).send("Error fetching exams");

      regmodel.getAllSchedules((err3, scheduleList) => {
        if (err3) return res.status(500).send("Error fetching schedule list");

        res.render("Schedule", {
          courses,
          exams,
          scheduleList,
          query: req.query  // for optional messages
        });
      });
    });
  });
};

// Save new schedule
exports.saveSchedule = (req, res) => {
  const { sdate, starttime, endtime, course_id, exam_id } = req.body;
  const cid = parseInt(course_id);
  const ex_id = parseInt(exam_id);

  regmodel.saveSchedule(sdate, starttime, endtime, cid, ex_id, (err) => {
    if (err) return res.status(500).send("Failed to save schedule");
    res.redirect("/schedule?msg=added");
  });
};

// Delete schedule
exports.deleteSchedule = (req, res) => {
  const { schid } = req.params;
  regmodel.deleteSchedule(schid, (err) => {
    if (err) return res.status(500).send("Failed to delete schedule");
    res.redirect("/schedule?msg=deleted");
  });
};

// Show update form
exports.getUpdateScheduleForm = (req, res) => {
  const { schid } = req.params;

  regmodel.getScheduleById(schid, (err1, schedules) => {
    if (err1 || schedules.length === 0) return res.status(500).send("Schedule not found");

    regmodel.getAllCourses((err2, subjects) => {
      if (err2) return res.status(500).send("Error loading courses");

      regmodel.getAllExams((err3, exams) => {
        if (err3) return res.status(500).send("Error loading exams");

        res.render("updated_Schedule.ejs", {
          schedule: schedules[0],
          subjects,
          exams
        });
      });
    });
  });
};

// Update schedule
exports.updateSchedule = (req, res) => {
  const { schid } = req.params;
  const { date, starttime, endtime, cid, ex_id } = req.body;

  regmodel.updateSchedule(date, starttime, endtime, cid, ex_id, schid, (err) => {
    if (err) return res.status(500).send("Database error");
    res.redirect("/schedule?msg=updated");
  });
};




/*=========stud reg==================*/
exports.AddStud=(req,res)=>{
    res.render("Student_Registration.ejs");
};

exports.saveS = (req, res) => {
  const { sname, semail, spassword, scontact } = req.body;

  regmodel.saveStud({ sname, semail, spassword, scontact })
    .then(() => {
      res.render("Student_login");  
    })
    .catch((err) => {
      console.error("Error inserting student:", err);
      res.render("Student_login");  
    });
};

//===============student login==============

exports.StudLogin=(req,res)=>{
    res.render("Student_login.ejs");
};

//===============display admin msg===============


exports.admininfo = (req, res) => {
  const aid = req.session.adminid; 

  regmodel.getAdminById(aid, (err, adminData) => {
    if (err) {
      console.error("DB error:", err);
      return res.send("Database error");
    }

    if (adminData) {  
      console.log("Admin Data from DB:", adminData);  
      res.render("ViewAdminData", { admin: adminData }); 
    } else {
      res.send("No admin found");
    }
  });
};






//===============student dashboard================
exports.StudDash= (req,res)=>{
  res.render("Student_Dashboard.ejs");
}


exports.validateStud = (req, res) => {
  const { studentName, studentPassword } = req.body;

  regmodel.ValidateStud(studentName, studentPassword)
    .then((result) => {
      if (result.length > 0) {
        req.session.studentId = result[0].sid;
        req.session.studentData = result[0];  // Save for later fetch

        res.render("Student_Dashboard");  // Just show welcome message
      } else {
        res.render("Student_login", { msg: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.error("Student login error:", err);
      res.render("error.ejs");
    });
};




//=====================student details========================

exports.StudentDetails = (req, res) => {
  const student = req.session.studentData;

  if (!student) {
    return res.status(403).send("Unauthorized");
  }

  res.render("studentDetails", { student });
};
//==================student reg internal================

exports.loadRegisterForm = async (req, res) => {
  try {
    const schedules = await service.getExamSchedules();
    res.render('studentRegister', { schedules });
  } catch (err) {
    console.error("Error loading register form:", err);  // <-- this will show real error in console
    res.status(500).send("Error loading form");
  }
};


exports.saveStudent = async (req, res) => {
  const data = req.body;
  try {
    await service.saveStudent(data);
    res.send("Student Registered Successfully");
  } catch (err) {
    res.status(500).send("Error saving student");
  }
}







/*=========stud reg==================*/
exports.AddStud=(req,res)=>{
    res.render("Student_Registration.ejs");
};

exports.saveS = (req, res) => {
  const { sname, semail, spassword, scontact } = req.body;

  regmodel.saveStud({ sname, semail, spassword, scontact })
    .then(() => {
      res.render("Student_login");  
    })
    .catch((err) => {
      console.error("Error inserting student:", err);
      res.render("Student_login");  
    });
};

//===============student login==============

exports.StudLogin=(req,res)=>{
    res.render("Student_login.ejs");
};

//===============student dashboard================
exports.StudDash= (req,res)=>{
  res.render("Student_Dashboard.ejs");
}


exports.validateStud = (req, res) => {
  const { studentName, studentPassword } = req.body;

  regmodel.ValidateStud(studentName, studentPassword)
    .then((result) => {
      if (result.length > 0) {
        // ✅ Save logged-in student's ID in session
        req.session.studentId = result[0].sid;

        // ✅ Optional: store student full data for other use
        req.session.studentData = result[0]; 

        // ✅ Redirect or render dashboard
        res.render("Student_Dashboard");  // You can also use res.redirect("/student/dashboard") if needed
      } else {
        res.render("Student_login", { msg: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.error("Student login error:", err);
      res.render("error.ejs");
    });
};


//=====================student details========================

exports.StudentDetails = (req, res) => {
  const student = req.session.studentData;

  if (!student) {
    return res.status(403).send("Unauthorized");
  }

  res.render("studentDetails", { student });
};

//==================student reg internal================

exports.loadRegisterForm = async (req, res) => {
  try {
    const schedules = await service.getExamSchedules();
    res.render('studentRegister', { schedules });
  } catch (err) {
    console.error("Error loading register form:", err);  // <-- this will show real error in console
    res.status(500).send("Error loading form");
  }
};




exports.saveStudent = async (req, res) => {
  const data = req.body;
  try {
    await service.saveStudent(data);
    res.send("Student Registered Successfully");
  } catch (err) {
    res.status(500).send("Error saving student");
  }
}


//-----------------------------------------------student exam details---------------------------------
// === Controller to fetch and display exam details after login ===
exports.examDetailsPage = (req, res) => {
  const studentId = req.session.studentId;

  if (!studentId) {
    return res.redirect("/studentlogin");  // Not logged in
  }

  regmodel.getStudentExamDetails(studentId)
    .then((examData) => {
      res.render("ExamDetails", { examData });  // your EJS file
    })
    .catch((err) => {
      console.error("Exam data fetch error:", err);
      res.render("error.ejs", { msg: "Failed to fetch exam details" });
    });
};

