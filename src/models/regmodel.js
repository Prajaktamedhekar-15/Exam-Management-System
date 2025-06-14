let conn=require("../config/db.js");


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

exports.saveExamdata = (...e_data) => 
  {
  return new Promise((resolve, reject) =>
     {
    const sql = "INSERT INTO exam VALUES ('0', ?, ?, ?)";
    conn.query(sql, [...e_data], (err, result) => 
      {
      if (err) 
        {
        return reject(err);  // Return the error to the caller
      }
      resolve(result);  // Return the result to the caller
    });
  });
};


//==

// exports.getAllExamData = () => {
//   return new Promise((resolve, reject) => {
//     conn.query("SELECT * FROM exam", (err, result) => {
//       if (err) reject(err);
//       else resolve(result);
//     });
//   });
// };

