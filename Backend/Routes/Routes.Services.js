const express = require('express');
const ServiceRouter = express.Router();
const db = require('../Config/Connection.db');


ServiceRouter.get('/students', async (req, res) => {
    try {
      const {rollNumber,classNumber,name} = req.query;
      const roll = parseInt(rollNumber,10);
      const classNum = parseInt(classNumber,10);
      const studentRef = db.collection('students');

      let snapShot;

      if(rollNumber) {
       snapShot = await studentRef.where('rollNumber' , '==' , roll).get();
      } else if (classNumber) {
       snapShot = await studentRef.where('class' , '==' , classNum).get();
      } else if (name) {
       snapShot = await studentRef.where('name' , '==' , `${name}`).get();
      } else {
       snapShot = await studentRef.get();
      }

      if(snapShot.empty) {
        return res.status(404).json({message:"No Students Found"});
      }
       
      let students = snapShot.docs.map((stu)=>stu.data());

      return res.status(200).json({response : true , students});


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch students' });
    }
}); // get all students with pagination




ServiceRouter.get('/add',async(req,res)=>{
 /*students.map(async(stu)=>{
    await db.collection('students').doc(stu.admissionNumber).set(stu);
 })*/
 res.end('success')
}) // i used to add initial mock student data for development perpose

// 1. this above endpoint should be able to send data pagination
// 2. should be accept filters in query string

module.exports = ServiceRouter;