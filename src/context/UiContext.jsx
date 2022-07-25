import React,{useState,useEffect,createContext} from 'react'
export const UiContext = createContext()
const UiContextProvider = (props) => {
    const [show_popup, setshow_popup] = useState(false)
    const [khud_name, setkhud_name] = useState("")


  return (
    <UiContext.Provider value={{setshow_popup,setkhud_name,khud_name,show_popup}}>
        {props.children}
    </UiContext.Provider>
  )
}

export default UiContextProvider