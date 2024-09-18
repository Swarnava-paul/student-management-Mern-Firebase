import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { createContext , useReducer , useState} from 'react'

// components
import StudentList from './Components/StudentList.jsx'
import Dashboard from './Components/Dashboard.jsx'
import Attendence from './Components/Attendence.jsx'
import Lisences from './Components/Lisences.jsx'
export const ComponentContext = createContext() ;

function reducerFn (state,action){

 switch(action.type) {
  case 'Dashboard' : {
    return {component : Dashboard , name : 'Dashboard'};
  }
  case 'Attendance' : {
    return {component : Attendence , name : 'Attendance'}
  }
  case 'Manage Students' :{
    return {component :StudentList , name : 'Manage Students' }
  }
  case 'Lisences' : {
    return {component : Lisences , name : 'Lisences'}
  }
 }
} // return component as bases on request

const Provider = ({children}) => {

  const [state,dispatch] = useReducer(reducerFn,{component : StudentList , name : 'Manage Students'}) // initial student list
  const [count,setC] = useState(0)
  return (
    <ComponentContext.Provider value={{Component : state.component, dispatch , Name : state.name}}>
     {children}
    </ComponentContext.Provider>
  )
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
    <Provider>
    <App />
    </Provider>
    </ChakraProvider>
  </StrictMode>,
)
