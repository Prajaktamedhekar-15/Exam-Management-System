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
    const query = "INSERT INTO studentlogin (sname, semail, spassword, scontact) VALUES (?, ?, ?, ?)";
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
    const sql = "SELECT * FROM studentlogin WHERE sname = ? AND spassword = ?";
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

exports.getAllQuestion = () => {
  const sql = `
    SELECT q.*, c.cname
    FROM question q
    JOIN coursequestionjoin cqj ON q.qid = cqj.qid
    JOIN course c ON cqj.cid = c.cid
  `;

  return new Promise((resolve, reject) => {
    conn.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


//================================================
// exports.getAllCourses = (callback) => {
//   const sql = "SELECT * FROM course";
//   conn.query(sql, callback);
// };

// exports.getAllExams = (callback) => {
//   const sql = "SELECT * FROM exam";
//   conn.query(sql, callback);
// };

// exports.saveSchedule = (sdate, starttime, endtime, cid, ex_id, callback) => {
//   const sql = `INSERT INTO schedule (date, starttime, endtime, cid, ex_id) VALUES (?, ?, ?, ?, ?)`;
//   conn.query(sql, [sdate, starttime, endtime, cid, ex_id], callback);
// };

// exports.getAllSchedules = (callback) => {
//   const sql = `
//     SELECT s.*, c.cname, e.exname 
//     FROM schedule s
//     JOIN course c ON s.cid = c.cid
//     JOIN exam e ON s.ex_id = e.ex_id
//   `;
//   conn.query(sql, callback);
// };



// exports.getUpdateScheduleForm = (req, res) => {
//   const { schid } = req.params;
//   const getSchedule = "SELECT * FROM schedule WHERE schid = ?";
//   const getCourses = "SELECT * FROM course";
//   const getExams = "SELECT * FROM exam";
//   db.query(getSchedule, [schid], (err, schedules) => {
//     if (err || schedules.length === 0) return res.status(500).send("Schedule not found");
//     db.query(getCourses, (err, subjects) => {
//       if (err) return res.status(500).send("Error loading courses");
//       db.query(getExams, (err, exams) => {
//         if (err) return res.status(500).send("Error loading exams");
//         res.render("updated_Schedule.ejs", {
//           schedule: schedules[0],
//           subjects:subjects,
//           exams:exams
//         });
//       });
//     });
//   });
// };

// exports.updateSchedule = (req, res) => {
//   const { schid } = req.params;
//   const { date, starttime, endtime, cid, ex_id } = req.body;
//   const sql = 'UPDATE schedule SET date=?, starttime=?, endtime=?, cid=?, ex_id=? WHERE schid=?';
//   db.query(sql, [date, starttime, endtime, cid, ex_id, schid], (err) => {
//     if (err) return res.status(500).send("Database error");
//     res.redirect("/schedule");
//   });
// };


// Get all courses
exports.getAllCourses = (callback) => {
  const sql = "SELECT * FROM course";
  conn.query(sql, callback);
};

// Get all exams
exports.getAllExams = (callback) => {
  const sql = "SELECT * FROM exam";
  conn.query(sql, callback);
};

// Save new schedule
exports.saveSchedule = (sdate, starttime, endtime, cid, ex_id, callback) => {
  const sql = `INSERT INTO schedule (date, starttime, endtime, cid, ex_id) VALUES (?, ?, ?, ?, ?)`;
  conn.query(sql, [sdate, starttime, endtime, cid, ex_id], callback);
};

// Get all schedule with course and exam names
exports.getAllSchedules = (callback) => {
  const sql = `
    SELECT s.*, c.cname, e.exname 
    FROM schedule s
    JOIN course c ON s.cid = c.cid
    JOIN exam e ON s.ex_id = e.ex_id
  `;
  conn.query(sql, callback);
};

// Delete a schedule
exports.deleteSchedule = (schid, callback) => {
  const sql = "DELETE FROM schedule WHERE schid = ?";
  conn.query(sql, [schid], callback);
};

// Get a schedule by ID
exports.getScheduleById = (schid, callback) => {
  const sql = "SELECT * FROM schedule WHERE schid = ?";
  conn.query(sql, [schid], callback);
};

// Update schedule
exports.updateSchedule = (date, starttime, endtime, cid, ex_id, schid, callback) => {
  const sql = 'UPDATE schedule SET date=?, starttime=?, endtime=?, cid=?, ex_id=? WHERE schid=?';
  conn.query(sql, [date, starttime, endtime, cid, ex_id, schid], callback);
};




//-----------------------------student exam details---------------------------------

// === Get exam schedule for a logged-in student by student ID ===
exports.getStudentExamDetails = (studentId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT s.sid, s.sname, c.cname, e.exname, sch.date, sch.starttime, sch.endtime, 
             e.totalmark, e.passingmark
      FROM student s
      JOIN schedule sch ON s.schid = sch.schid
      JOIN course c ON sch.cid = c.cid
      JOIN exam e ON sch.ex_id = e.ex_id
      WHERE s.sid = ?`;

    conn.query(sql, [studentId], (err, result) => {
      if (err) {
        console.error("Error fetching exam schedule:", err);
        reject("Error fetching exam schedule");
      } else {
        resolve(result);
      }
    });
  });
};

