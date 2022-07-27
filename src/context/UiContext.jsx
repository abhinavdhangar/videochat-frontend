import React,{useState,useEffect,createContext ,useRef} from 'react'
import Cookies from 'js-cookie'
import Peer from 'simple-peer'
import { io } from 'socket.io-client'
export const UiContext = createContext()
const socket = io.connect('https://videochatappart2.herokuapp.com')

const UiContextProvider = (props) => {
    const [show_popup, setshow_popup] = useState(false)
    const [khud_name, setkhud_name] = useState("")
    const [stream, setStream] = useState()
    const myVideo = useRef()
   

 useEffect(()=>{
   navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
			setStream(stream)
			console.log('phel i baar')
			console.log(stream)
				myVideo.current.srcObject = stream
		})

 },[])

 const handleClickDisplay =()=>{
	navigator.mediaDevices.getDisplayMedia({ video: true, audio: false }).then((stream) => {
		setStream(stream)
		console.log(stream)
			myVideo.current.srcObject = stream
	})
}

const [play, setplay] = useState(false)
const [ me, setMe ] = useState("")
// const [ stream, setStream ] = useState()
const [ receivingCall, setReceivingCall ] = useState(false)
const [ caller, setCaller ] = useState("")
const [ callerSignal, setCallerSignal ] = useState()
const [ callAccepted, setCallAccepted ] = useState(false)
const [ idToCall, setIdToCall ] = useState("")
const [ callEnded, setCallEnded] = useState(false)
const [ name, setName ] = useState("")
const [hasDismissed,setHasDismissed] = useState(false)
const userVideo = useRef()
const connectionRef= useRef()
 const [count, setcount] = useState(0)
 const [all_users, setall_users] = useState([])
const [sender_name, setsender_name] = useState('')
const aud = useRef()
useEffect(()=>{
   if(Cookies.get("name")){
 setName(Cookies.get("name"))
}

},[])
useEffect(()=>{
navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
 setStream(stream)
 console.log(stream)
   myVideo.current.srcObject = stream
})

},[count])


useEffect(() => {


 

 
socket.on("me", (id) => {
   setMe(id)
   socket.emit("addUser",{id,name:Cookies.get("name")})
 })

 socket.on("getUsers",data=>{
   let dup = data
   // dup = dup.filter(user=>user.id===!me)
   setall_users(dup)
   console.log('this is their data',data)
 })

 socket.on("callUser", (data) => {
   setReceivingCall(true)
   setCaller(data.from)
   setName(data.name)
   setsender_name(data.name)
   console.log('chalna chahiye gaana')
   
   aud.current.play()
   setCallerSignal(data.signal)
 })
}, [])

const callUser = (id) => {
 const peer = new Peer({
   initiator: true,
   trickle: false,
   stream: stream
 })
 peer.on("signal", (data) => {
   socket.emit("callUser", {
     userToCall: id,
     signalData: data,
     from: me,
     name: name
   })
 })
 peer.on("stream", (stream) => {
   
     userVideo.current.srcObject = stream
   
 })
 socket.on("callAccepted", (signal) => {
   // ringtone.pause()
   // setringtone("")
   setCallAccepted(true)
   peer.signal(signal)
 })

 connectionRef.current = peer
}

useEffect(()=>{
  socket.on("dismiss",id=>{
setHasDismissed(true)
    console.log('look likes he hates you !!!')
  })
  
},[socket])

const answerCall =() =>  {
 aud.current.pause()
 setCallAccepted(true)
 const peer = new Peer({
   initiator: false,
   trickle: false,
   stream: stream
 })
 peer.on("signal", (data) => {
   socket.emit("answerCall", { signal: data, to: caller })
 })
 peer.on("stream", (stream) => {
   userVideo.current.srcObject = stream
 })

 peer.signal(callerSignal)
 connectionRef.current = peer
}

const leaveCall = () => {
 setCallEnded(true)

 connectionRef.current.destroy()
window.location.reload()
}
const handleDismiss = (id)=>{
// setCallEnded(true)
socket.emit("dismiss",id)
console.log("this is sensudal", id)
// console.log('look likes he wanted to dismiss your call ')
window.location.reload()

}
  return (
    <UiContext.Provider value={{idToCall,
      caller,
    setIdToCall,
    handleDismiss,
    socket,
    all_users,
    setall_users,
    me,receivingCall,
    setcount,count,
    sender_name,
    handleClickDisplay,
    userVideo,handleDismiss,
    answerCall,
    leaveCall,callUser,
    callAccepted,receivingCall,
    callEnded,aud,count,
    setshow_popup,
    setkhud_name,
    khud_name,
    hasDismissed,
    show_popup,myVideo,stream,setStream}}>
        {props.children}
    </UiContext.Provider>
  )
}

export default UiContextProvider