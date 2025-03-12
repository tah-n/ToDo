import React, { useEffect } from 'react'
import ActionBar from './ActionBar';
import Tasks from './Tasks';
import gsap from 'gsap';

const Dashboard = () => {


  useEffect(() => {
    const tl = gsap.timeline();
    tl.to("#dashboard", {
      duration: 0.7,
      width: 1200,
      delay: 0.1,
    });


    return () => {
      tl.kill();
    }
  },[])
  

  return (
    <div id='dashboard' className='bg-ice/20 border m-auto border-teal/20 backdrop-blur-sm w-full sm:h-[650px] h-full md:w-[94vw] lg:w-[100px] sm:rounded-[2.3rem] overflow-hidden'>
      <ActionBar />
      <Tasks />
    </div>
  )
}

export default Dashboard;
