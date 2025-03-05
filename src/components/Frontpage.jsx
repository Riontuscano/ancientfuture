import React from 'react'
import GuruHolder from './GurusHolder'
import YogaSocialPost from './Yoga';
import SolarLoader from './SolarLoader';
import AugmentedHolder from './AugmentedHolder';


const Frontpage = ({mode}) => {
  return (
    <>
  
        <YogaSocialPost mode={mode}/>
        <GuruHolder mode={mode}/> 
        {/* <SolarLoader mode={mode}/> */}
        <AugmentedHolder mode={mode}/>

 
    </>
  )
}

export default Frontpage