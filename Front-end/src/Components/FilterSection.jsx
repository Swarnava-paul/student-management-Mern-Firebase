import React, { useState } from 'react'
import {Flex} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { useEffect } from 'react'

const FilterSection = () => {


  const [studentData,setStudentData] = useState([])
  const [isLoading,setIsloading] = useState(false)
  useEffect(()=>{
  fetchStudentData()
  },[])

  async function fetchStudentData() {
   setIsloading(true);
   try {
    const data = await fetch('http://localhost:4000/api/students');
    const finalData = await data.json();
    //console.log(finalData)
   }catch(error) {
    console.log(error)
   }
  }

  return (
    <Flex h='20vh' bg='whitesmoke'>
     
    </Flex>
  )
}

export default FilterSection;
