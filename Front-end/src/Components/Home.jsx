import React from 'react'
import { useState,useEffect } from 'react';
// context
import { ComponentContext } from '../main';
const Home = () => {

  const {Component} = React.useContext(ComponentContext);
  
  const [studentData,setStudentData] = useState([]);
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
    setStudentData(students);
    setMessage(message);
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
