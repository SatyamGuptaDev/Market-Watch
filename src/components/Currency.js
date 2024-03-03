import React, { useContext } from 'react'
import { CryptoContext } from '../context/CryptoContext'
import submitIcon from '../assets/submit-icon.svg'

const Currency = () => {

    const { setCurrency } = useContext(CryptoContext);

    const handleCurrency = (e) => {
        e.preventDefault();
        const currency = e.target.currency.value;
        setCurrency(currency);
        e.target.reset();
        console.log(currency);
    }
  return (

    <form className='w-25 h-full relative font-nunito flex items-center' onSubmit={ handleCurrency } >
        <label htmlFor='currency' className='text-white font-nunito font-bold mr-2' >Currency: </label>
        <input type='text' id='currency' name='currency' className='w-14 rounded bg-gray-200 placeholder-text-gray-100 pl-2 pr-2 required outline-none border border-transparent focus:border-cyan' placeholder='inr' />
        <button type='submit' className='mr-1'>
            <img src={submitIcon} alt='search' className='' />
        </button>
    </form>
  )
}

export default Currency
