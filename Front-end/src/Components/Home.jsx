import React from 'react'
import { useState,useEffect } from 'react';
// context
import { ComponentContext } from '../main';
import { studentDataContext } from '../App';
const Home = () => {

  const {Component} = React.useContext(ComponentContext);
  const {studentData,setStudentData} = React.useContext(studentDataContext);
  

  const [isLoading,setIsloading] = useState(false);
  const [message,setMessage] = useState()
  
  useEffect(()=>{
  fetchStudentData()
  },[])

  async function fetchStudentData() {
   setIsloading(true);
   try {
    const data = await fetch('http://localhost:4000/api/students');
    const {message,students} = await data.json();
    if(students) {
      setStudentData(students);
      setMessage(message);
    } else if(students == undefined) {
      setMessage('Failed To fetch Students')
    }
    setIsloading(false);
   }catch(error) {
    setIsloading(false)
    setMessage('Failed To fetch Students Data')
   }
  }

  return (
    <Component students={studentData} isLoading={isLoading} message={message}/>
  )
}

export default Home
