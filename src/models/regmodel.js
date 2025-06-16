let conn= require("../config/db.js");


exports.ValidateAdmin=(...regData)=>{
    let promise=new Promise((resolve,reject)=>{

    conn.query("select *from admin where aname=? and apassword=?",[...regData],(err,result)=>{
        if(err)
        {
            reject(err);
        }
        else{
            console.log(result);
            resolve(result);
        }
    });
});

    return promise;
}

exports.saveCourse = (...courseData) => {
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO course (cname) VALUES (?)", [...courseData], (err, result) => {
      if (err) {
        console.error("Error inserting course:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/*=====================student reg================*/
exports.saveStud = ({ sname, semail, spassword, scontact }) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO student (sname, semail, spassword, scontact) VALUES (?, ?, ?, ?)";
    conn.query(query, [sname, semail, spassword, scontact], (err, result) => {
      if (err) {
        console.error("Error inserting student:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

//========================display admin data=================

exports.getAdminById = (aid, callback) => {
  const sql = "SELECT * FROM admin WHERE adm_id = ?";
  conn.query(sql, [aid], (err, result) => {
    if (err) return callback(err, null);
    if (result.length > 0) {
      return callback(null, result[0]); 
    } else {
      return callback(null, null);
    }
  });
};

//===============================================validate student======================


exports.ValidateStud = (sname, spassword) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM student WHERE sname = ? AND spassword = ?";
    conn.query(sql, [sname, spassword], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};



