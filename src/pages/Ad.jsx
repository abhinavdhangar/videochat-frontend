// import Button from "@material-ui/core/Button"
// import IconButton from "@material-ui/core/IconButton"
// import TextField from "@material-ui/core/TextField"
// import AssignmentIcon from "@material-ui/icons/Assignment"
// import PhoneIcon from "@material-ui/icons/Phone"
import React, { useEffect, useRef, useState,useContext } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import ingtone from '../ringtone.mp3'
// import "./App.css"

import Cookies from 'js-cookie'
import Popup from "./Popup"
// import ringto from '../'
import { UiContext } from "../context/UiContext"
// import ringtone from '../ringtone.mp3'
// const ringtone = new Audio("https://nf1f8200-a.akamaihd.net/downloads/ringtones/files/mp3/lily-lily-amit-bhadana-download-mp3-50462.mp3")
// let your_name = prompt("what is your name ? ")
let ing = "../ringtone.mp3"
const socket = io.connect('https://videochatappart2.herokuapp.com')
// const socket = io.connect('http://localhost:8081')
function Ad() {
	const aud = useRef()
   const [play, setplay] = useState(false)
	const {setkhud_name,khud_name,show_popup,setshow_popup} = useContext(UiContext)
	const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()
    const [count, setcount] = useState(0)
    const [all_users, setall_users] = useState([])
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
	

		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
			
			console.log(stream)
				myVideo.current.srcObject = stream
		})


		
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
			console.log('chalna chahiye gaana')
			// ringtone.play()
			// setringtone(ing)
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
	}

	return (
		<div>
			<audio ref={aud} >
				<source  src={ingtone} />
			</audio>
			{Cookies.get("name")?(		<div>
			<h1 style={{ textAlign: "center"}}>Zoomish</h1>
					<button onClick={()=>setcount(()=>count+1)}> Refresh</button>
		<div className="container">
			<div className="video-container flex flex-col md:flex-row items-center gap-4 m-4">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
				{/* <input
					className="border-2 border-black"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ marginBottom: "20px" }}
				/>
				<CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
					<button >
						Copy ID
					</button>
				</CopyToClipboard>
	
				<input
				className="border-2 border-black"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/> */}
				 <div className="call-button">
					{callAccepted && !callEnded ? (
						<button className="border-2 border-black"  onClick={leaveCall}>
							End Call
						</button>
					) : ('')}
			
				</div> 
			</div>
			<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<button className="border-2 border-black" onClick={answerCall}>
							Answer
						</button>
					</div>
				) : null}
			</div>
		</div>
		{/* <h2>{me}  id</h2> */}
		</div>):(<Popup show={true}/>)}
	<h1>{all_users.length}  users live...</h1>
		<div>{
  all_users.map(single=>(
	  <div>
		  
   {
	   single.id==me?(     <span className="text-slate-500"><span className="mr-4">{single.name}  </span>      8==={'>'} You</span>):(     <button onClick={()=>{
			callUser(single.id)}}>{single.name}</button>)
   }
	  </div>
  ))

}</div>
		</div>
	)
	}

export default Ad