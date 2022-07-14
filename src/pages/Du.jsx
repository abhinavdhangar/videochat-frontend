import React,{useState, useRef, useEffect } from 'react'

const Du = () => {
    const [stream, setStream] = useState();
    const myVideo = useRef();
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio:false,video:{
          facingMode:'user'
        }})
          .then((currentStream) => {
            setStream(currentStream);
    if(myVideo.current){
    
      myVideo.current.srcObject = currentStream;
    }
          });}
,[])    
  return (
    <div>
        <h1>video js</h1>
     <video ref={myVideo} playsInline  autoPlay ></video>
    </div>
  )
}

export default Du