import React,{useState,useEffect,useContext} from 'react'
import { UiContext } from '../context/UiContext'
import Cookies from 'js-cookie'
const Popup = (props) => {
    const {setkhud_name,khud_name,show_popup,setshow_popup} = useContext(UiContext)
    useEffect(()=>{
  setshow_popup(props.show)
    },[])
    
  return (
    <div className={` ${show_popup?'':'hidden'}  h-screen w-screen flex items-center justify-center`}>
     <div className='w-[200px] h-[200px] border-2 border-black bg-slate-100 flex items-center'>
         <input type="text" placeholder='your name ...' className='border-2 w-[90%] border-black' onChange={(e)=>setkhud_name(e.target.value)} />
            <button onClick={()=>{
                setshow_popup(false)
                Cookies.set("name",khud_name)
                window.location.reload()
            }}>ok</button>
     </div>
    </div>
  )
}

export default Popup