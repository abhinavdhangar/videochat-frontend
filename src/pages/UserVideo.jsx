import React, { useContext } from 'react'
import { UiContext } from '../context/UiContext'
import suzume from '../suzume.mp4'

const UserVideo = () => {


    const { myVideo, callAccepted, callEnded, stream,userVideo } = useContext(UiContext)

    return (


        <div className="video-container  relative  w-screen h-screen flex items-center justify-center m-4">

            <div className='absolute bottom-[3rem] md:bottom-[5rem] md:left-[5.5rem] lg:bottom-[6rem] left-3 z-[15]'>

             {stream && <video playsInline  muted  ref={myVideo} autoPlay className='w-24 h-32 object-cover'  />}
           
           </div>


            {stream &&
                <section class="showcase relative  md:w-[70vw] w-[90vw] h-[527px]  md:h-[480px] lg:h-[505px]
 p-20 flex justify-between items-center z-[10]
 transition ease-in-out duration-1000
 ">

                    <video controls ref={userVideo}  playsInline autoPlay className="absolute top-0 left-0 w-[90vw] h-full object-cover "></video>
                    {/* <div class="overlay absolute top-0 left-0 w-full h-full bg-overlay blend-screen"></div> */}

                </section> }

        </div>

    )
}

export default UserVideo