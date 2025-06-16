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