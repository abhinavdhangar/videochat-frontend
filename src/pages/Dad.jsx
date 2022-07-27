import React, { useEffect, useRef, useState,useContext } from "react"
import ingtone from '../nigga.mp3'
// import "./App.css"

import Cookies from 'js-cookie'
import Popup from "./Popup"

import { UiContext } from "../context/UiContext"
// import UserVideo from "./UserVideo"
import Tai from "./Tai"
import Taig from "./Taig"
// let ing = "../ringtone.mp3"
function Ad() {
const {aud,callAccepted,caller,handleDismiss,callEnded,idToCall,hasDismissed,setIdToCall,callUser,userVideo,receivingCall,count,setcount,sender_name,leaveCall,answerCall,me,all_users,handleClickDisplay,} = useContext(UiContext)
	return (
		<div>
			<audio ref={aud} >
				<source  src={ingtone} />
			</audio>
			{Cookies.get("name")?(		<div>
			<h1 style={{ textAlign: "center"}}>Zoomish</h1>
					<button onClick={()=>setcount(()=>count+1)}> Refresh</button>
					<Taig/>
					<div className="myId">
			
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
						<h1 >{sender_name} is calling...</h1>
						<button className="border-2 border-black" onClick={answerCall}>
							Answer
						</button>
						<button className="border-2 border-black" onClick={()=>handleDismiss(caller)}>
							dismiss
						</button>
					</div>
				) : null}
			</div>
		
		</div>):(<Popup show={true}/>)}
	<h1>{all_users.length}  users live...</h1>
		<div>{
  all_users.map(single=>(
	  <div>
		  
   {
	   single.id==me?(     <span className="text-slate-500"><span className="mr-4">{single.name}  </span>      8==={'>'} You</span>):(   <div>  <button onClick={()=>{
			callUser(single.id)
			setIdToCall(single.id)
		}}>{single.name}    </button>  <span>{hasDismissed?('   has cut your connection'):null}</span></div>)
   }
	  </div>
  ))

}</div>
<button onClick={handleClickDisplay}>get display</button>
		</div>
	)
	}

export default Ad