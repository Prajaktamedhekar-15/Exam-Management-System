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
