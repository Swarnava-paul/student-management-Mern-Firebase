import { Box , Text , Button , Grid , Flex} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useState } from "react";
import QRCode from 'react-qr-code'


const StudentList = ({students,isLoading,message}) => {


  return (
    <>
    <Box minHeight='25vh' mt={10}>
      <Text textAlign='center' fontFamily='sans-serif' fontSize={14}>{message}</Text>
      {
        (isLoading == true ? (<Text textAlign='center'>Loading...</Text>) : (
            <TableContainer w='90%' margin='auto'>
            <Table variant='striped' colorScheme='orange' mt={4}>
              <TableCaption>Student Lists</TableCaption>
              <Thead>
                <Tr>
                  <Th>AdmissionNumber</Th>
                  <Th>Name</Th>
                  <Th>Class</Th>
                  <Th>Section</Th>
                  <Th>Age</Th>
                  <Th>View Qr Code</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  students.map((i,index)=>(
                    <EachStudent key={index} props={i} index={index}/>
                  ))
                }
              </Tbody>
            </Table>
          </TableContainer>
        ))
      }
    </Box>
    </>
  )
}


const EachStudent = ({props,index}) => {
  
const {section ,  admissionNumber , age , name , class:classNumber , rollNumber} = props;
const stringQrValue = `StudentName : ${name} \n age : ${age} , class : ${classNumber} \n
StudentRollNumber : ${rollNumber} , Section : ${section} \n AdmissionNumber : ${admissionNumber}`

const [display,setDisplay] = useState('display')

  return (
    (display === 'display' ?(
      <Tr>
      <Td>{admissionNumber}</Td>
      <Td>{name}</Td>
      <Td>{classNumber}</Td>
      <Td>{section}</Td>
      <Td>{age}</Td>
      <Td>
      <QRCode value={stringQrValue} size={50} style={{width:"60%"}}/>
      </Td>
      <Td>
        <Button w='100%' fontSize={14} pos='static'
         bg={index % 2 == 0 ? 'white' : 'RGB(254, 235, 200)'} onClick={()=>setDisplay('hide')}>View</Button>
      </Td>
     </Tr>
    ) :(
      <Grid position='absolute' w='100%' pos='fixed'
       h='100vh' bg='rgba(0, 0, 0, 0.5)' top='0%' left='0%'
       display='flex' justifyContent='center' alignItems='center'>
        <Grid w='40%' h='auto' bg='white' p={2} display='grid'>
        <Text cursor='pointer' onClick={()=>setDisplay('display')}>Close</Text>
        <Grid w='100%' placeItems='center' rowGap={3}>
        <QRCode value={stringQrValue} size={100} style={{width:"60%"}}/>
        <Text mt={3}>Student Name : {name}</Text>
        <Text>Admission Number : {admissionNumber}</Text>
        <Text>Roll Number : {rollNumber}</Text>
        <Text>Class : {classNumber}</Text>
        <Text>Section : {section}</Text>
        </Grid>
        </Grid>
      </Grid>
    ))
  )
}


export default StudentList
