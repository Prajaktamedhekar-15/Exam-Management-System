const regmodel = require("../models/regmodel");

const conn=require("../config/db");
//==================student registration internal============
exports.getExamSchedules = () => {
  return new Promise((resolve, reject) => {
    const q = `SELECT schid, cname, exname, date, starttime, endtime 
               FROM schedule 
               JOIN course USING(cid) 
               JOIN exam ON schedule.ex_id = exam.ex_id`;
    conn.query(q, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};


exports.saveStudent = (data) => {
  const { sname, semail, spassword, scontact, schid } = data;
  return new Promise((resolve, reject) => {
    const q = `INSERT INTO student (sname, semail, spassword, scontact, schid) VALUES (?, ?, ?, ?, ?)`;
    conn.query(q, [sname, semail, spassword, scontact, schid], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};



