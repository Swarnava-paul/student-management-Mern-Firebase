const express = require('express');
const ServiceRouter = express.Router();
const db = require('../Config/Connection.db');

ServiceRouter.use(express.json());

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

ServiceRouter.get('/students/add/form',async(req,res)=>{
  try{
   const {age,classNumber,section,name} = req.body; // student info

   const data = await db.collection('students').get(); // get students
   const students = data.docs.map((stu)=>stu.data()); // store in array
   const {admissionNumber, rollNumber} = students[students.length-1]; // admission number of last enrolled student

   const generateAdmissionNumber = `ADM${parseInt([...admissionNumber]
    .map(Number).filter((i)=>i.toString() != 'NaN')
    .join(""),10) +1 }` // add 1 to last regestration number form a new registration number and follow the order
   
    const generateRollNumber = rollNumber+1
    
    const info = {
      name,
      age,
      class : classNumber,
      section,
      rollNumber : generateRollNumber,
      admissionNumber : generateAdmissionNumber,
    } // info object

    const addStudent = await db.collection('students').doc(generateAdmissionNumber).set(info)

    if(!addStudent) {
      return res.status(500).json({message:"Student Not Added"})
    }

    return res.status(200).json({Response : true , message:"Student Added"})

  }catch(error) {
    console.log(error)
    res.status(500).json({message:"Internal Server Error"})
  }
}) // handles the logic of add student using form


module.exports = ServiceRouter;