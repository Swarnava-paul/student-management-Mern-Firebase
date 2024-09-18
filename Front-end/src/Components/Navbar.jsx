import {Flex,Text
} from '@chakra-ui/react'
import { ComponentContext } from '../main'
import React from 'react'
import { useRef } from 'react'
const Navbar = () => {
  const {dispatch , Name} = React.useContext(ComponentContext);
  const actions = ['Dashboard','Lisences','Manage Students','Attendance']

  return (
   <Flex h='16vh' bg='black'
   justify='center' align='center' p={5}>
    <Flex w='50%' color='white' className='view-options' fontSize={14} justifyContent='space-between'>
      {actions.map((i,index)=>(
        <TextComponent key={index}
         typeName={i} 
        dispatch={dispatch}
        name={Name}/>
      ))}
    </Flex>
   </Flex>
  )
}


const TextComponent = ({typeName,dispatch,name}) => {
 return (
  <Text onClick={()=>{
   dispatch({type:typeName});
  }} color={name == typeName ? 'orange' : 'white'} 
  borderBottom={name == typeName ? '2px solid orange' : null}>{typeName}</Text>
 )
}

export default Navbar
