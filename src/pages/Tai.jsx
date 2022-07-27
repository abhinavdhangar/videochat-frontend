import React, { useContext } from 'react'
import { UiContext } from '../context/UiContext'
const Tai = () => {
    const { myVideo, callAccepted, callEnded, stream,userVideo } = useContext(UiContext)

  return (
    <div class=" relative flex items-center justify-center w-screen h-screen">
  <div class="absolute w-[90%] h-[555px] md:w-[80%] lg:w-[70%] ">
  {stream&&   <video ref={myVideo} playsInline autoplay muted  
    class="w-full h-full object-cover " ></video>}
  </div>
  <div class="absolute w-24 h-32  bottom-24 left-10 md:left-[6.5rem] lg:left-[12.5rem] xl:left:[5.5rem]">
   {callAccepted && !callEnded ? <video controls ref={userVideo} autoPlay playsInline  
    class="w-full h-full object-cover" ></video>:null}
  </div>
</div>
  )
}

export default Tai

