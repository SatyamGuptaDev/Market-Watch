import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav 
    className='w-[40%] mt-16 flex justify-around align-middle border border-cyan rounded-lg'>

        <NavLink to='/' 
        end 
        className={({isActive})=> {
            return ` ${isActive ? 'text-gray-200 bg-cyan ' : 'text-gray-100 bg-gray-200 hover:text-cyan  active:bg-cyan active:text-gray-200'}
             w-full text-base text-center font-nunito m-2.5 font-semibold border-0 cursor-pointer  capitalize rounded-md`
         }  } > Crypto</NavLink>
        
        
        <NavLink to='/trending'
         className={({isActive})=> {
            return ` ${isActive ? 'text-gray-200 bg-cyan ' : 'text-gray-100 bg-gray-200 hover:text-cyan  active:bg-cyan active:text-gray-200'}
             w-full text-base text-center font-nunito m-2.5 font-semibold border-0 cursor-pointer  capitalize rounded-md`
         }  } >
         Trending</NavLink>
        
        
        <NavLink to='/saved' 
        className={({isActive})=> {
            return ` ${isActive ? 'text-gray-200 bg-cyan ' : 'text-gray-100 bg-gray-200 hover:text-cyan  active:bg-cyan active:text-gray-200'}
             w-full text-base text-center font-nunito m-2.5 font-semibold border-0 cursor-pointer  capitalize rounded-md`
         }  } >
         Saved</NavLink>

    
    </nav>
  )
}

export default Navigation
