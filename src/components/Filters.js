import React from 'react'
import Search from './Search'
import Currency from './Currency'
import Sorting from './Sorting'
import Reset from './Reset'

const Filters = () => {
  return (
    <div className=' w-full min-h-12 border-2 border-gray-100 rounded-lg  flex items-center justify-between relative p-2 pr-8 pl-8 flex-wrap'>

      <Search />

      <Currency/>
      
      <Sorting  />

      <Reset  />


      
    </div>
  )
}

export default Filters
