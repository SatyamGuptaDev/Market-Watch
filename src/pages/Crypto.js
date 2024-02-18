import React from 'react'
import TableComponent from '../components/TableComponent'
import Filters from '../components/Filters'


const Crypto = () => {
  return (


    <section 
    className=" w-[80%] h-full flex flex-col relative mb-24 mt-16 ">

      <Filters/>
      <TableComponent />
      

    </section>
  )
}

export default Crypto
