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


exports.saveCourse = (cname) => {
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO course (cname) VALUES (?)", [cname], (err, result) => {
      if (err) {
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





exports.viewCourseData = () => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM course", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
exports.deleteCourse = async (id) => {
  try {
    const [result] = await conn.promise().query("DELETE FROM course WHERE cid = ?", [id]);
    if (result.affectedRows === 0) {
      throw new Error("No course found with the given ID.");
    }
    return result;
  } catch (err) {
    throw err;
  }
};


//============================================================================================================================

// exports.saveExamdata = (...e_data) => 
//   {
//   return new Promise((resolve, reject) =>
//      {
//     const sql = "INSERT INTO exam VALUES ('0', ?, ?, ?)";
//     conn.query(sql, [...e_data], (err, result) => 
//       {
//       if (err) 
//         {
//         return reject(err);  // Return the error to the caller
//       }
//       resolve(result);  // Return the result to the caller
//     });
//   });
// };

// //=========
// exports.viewExamData = () => {
//   return new Promise((resolve, reject) => {
//     conn.query("SELECT * FROM exam", (err, result) => {
//       if (err) reject(err);
//       else resolve(result);
//     });
//   });
// };


exports.saveExamdata = (name, total, passing) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO exam (exname, totalmark, passingmark) VALUES (?, ?, ?)";
    conn.query(sql, [name, total, passing], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.viewExamData = () => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM exam", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};


exports.UpdatedExamData = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM exam WHERE ex_id = ?", [id], (err, result) => {
      if (err) {
        console.error("DB fetch error:", err);
        return reject("Error fetching exam data");
      }
      resolve(result); // array of results
    });
  });
};

exports.UpdatedExamdata = (Ex_id, examName, totalMarks, passingMarks) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "UPDATE exam SET exname = ?, totalmark = ?, passingmark = ? WHERE ex_id = ?",
      [examName, totalMarks, passingMarks, Ex_id],
      (err, result) => {
        if (err) {
          console.error("DB update error:", err);
          return reject("Error updating exam data");
        }
        resolve(result); // returns result object with affectedRows, etc.
      }
    );
  });
};