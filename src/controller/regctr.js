let regmodel=require("../models/regmodel.js");
//const regService=require("../services/regService.js");
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

exports.CourseReg=(req,res)=>{
  res.render("course.ejs");

}

exports.saveC = (req, res) => {
  const { cname } = req.body;

  regmodel.saveCourse(cname)
    .then(() => {
      res.render("course", { MSG: "Data added successfully" });
    })
    .catch((err) => {
      res.render("course", { MSG: "Problem in data adding: " + err.message });
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

//======================Student Login==========================




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

