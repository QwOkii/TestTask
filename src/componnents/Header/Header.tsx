import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import { GetRatestoUAH } from '../../app/Rates'

export const Header = () => {
  const resultsToUAH = useSelector((u:RootState) =>u.Rates.resultsToUAH)
  const items =Object.entries(resultsToUAH).map(currency =>{return{value:currency[0],label:currency[1]}})
  const elementRef = React.useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch()
  React.useEffect(()=>{
    dispatch(GetRatestoUAH('UAH'))
  },[])

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (elementRef.current){
        elementRef.current.scrollLeft += 5;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className='flex items-center justify-center flex-row bg-gradient-to-r from-green-300 to-blue-500 h-16 w-screen'>
      <div
        ref={elementRef}
        className='flex flex-row text-center w-screen h-10 overflow-x-scroll whitespace-nowrap'
      >
        {items.map((value, index) => (
          <div key={index} className='text-white font-momo w-20 h-10'>
            <div className='flex flex-row'>
              {value.label}:<div className='mx-2'>{value.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
