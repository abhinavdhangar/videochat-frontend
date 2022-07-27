import React, { useContext } from 'react'
import { UiContext } from '../context/UiContext'
import suzume from '../suzume.mp4'
const Taig = () => {
    const { myVideo, callAccepted, callEnded, stream,userVideo } = useContext(UiContext)

  return (
    <div class=" relative flex items-center justify-center w-[99vw] h-screen">
  <div class="absolute w-[90%] h-[505px] md:w-[80%] lg:w-[70%] bg-slate-300">
    {callAccepted&& !callEnded ?<video  ref={userVideo}  controls playsInline 
    class="w-full h-full object-cover " autoPlay></video>:<div  
    class="w-full h-full object-cover flex items-center justify-center text-xl" > Add User To Video Chat...</div>}
  </div>
  <div class="absolute w-24 h-32 bg-pink-400 bottom-24 left-10 md:left-[6.5rem] lg:left-[12.5rem] xl:left:[5.5rem]">
   {stream &&  <video playsInline  muted  ref={myVideo} autoPlay 
    class="w-full h-full object-cover" ></video>}
  </div>
</div>
  )
}

export default Taig