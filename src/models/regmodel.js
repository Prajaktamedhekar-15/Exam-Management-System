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