import React, { useState } from 'react'
import {Flex} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

import { useEffect } from 'react'

import {StudentList} from './Component.Exports'
// context
import { studentDataContext } from '../App'

const FilterSection = () => {

  const {studentData} = React.useContext(studentDataContext);

  const usedStudentName = [];
  const usedStudentClass = [];
  const usedStudentSection = [];

  return (
    <Flex h='20vh' bg='whitesmoke' p={10} justify='space-evenly'>
     <Flex w='100%' gap={7}>
     <Select  placeholder='Search By Student Name'  border='2px solid orange'>
      {
        studentData.map(function(i,index){
          if(usedStudentName.includes(i.name) == false) {
            usedStudentName.push(i.name);
            return <option value={i.name} key={index}>{i.name}</option>
          }
        })
      }
    </Select>
    <Select  placeholder='Select Class' border='2px solid orange'>
      {
        studentData.map(function(i,index){
          if(usedStudentClass.includes(i.class) == false) {
            usedStudentClass.push(i.class)
            return <option value={i.class} key={index}>{i.class}</option>
          }
        })
      }
    </Select>
    <Select  placeholder='Select Section' border='2px solid orange'>
      {
        studentData.map(function(i,index){
          if(usedStudentSection.includes(i.section) == false) {
            usedStudentSection.push(i.section);
            return <option value={i.section} key={index}>{i.section}</option>
          }
        })
      }
    </Select>
     </Flex>
    </Flex>
  )
}

export default FilterSection;
