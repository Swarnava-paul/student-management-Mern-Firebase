import { useState } from 'react'
import './App.css'
import {Home,Navbar,FilterSection} from './Components/Component.Exports'
import { createContext } from 'react'

export const studentDataContext = createContext()

function App() {

const DataProvider = ({children}) => {

  const [studentData,setStudentData] = useState([]);

  return (
    <studentDataContext.Provider value={{studentData,setStudentData}}>
     {children}
    </studentDataContext.Provider>
  )
}

  return (
    <>
    
    <Navbar/>
    <DataProvider>
    <FilterSection/>
    <Home/>
   </DataProvider>
    </>
  )
}

export default App
