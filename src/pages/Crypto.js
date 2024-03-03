import React from 'react'
import TableComponent from '../components/TableComponent'
import Filters from '../components/Filters'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { CryptoContext } from '../context/CryptoContext'


const Crypto = () => {

  const { CryptoData, currencyUnit } = useContext(CryptoContext);

  return (


    <section 
    className=" w-[80%] h-full flex flex-col relative mb-24 mt-16 ">

      <Filters/>
      <TableComponent CryptoData={CryptoData} currencyUnit={currencyUnit} />
      <Outlet />
      

    </section>
  )
}

export default Crypto
