import React from 'react'
import { CurrencyRate } from './componnents/CurrencyRate/CurrencyRate';
import { Header } from './componnents/Header/Header';

function App() {
  return (
    <div className='flex flex-col items-center '>
      <Header/>
      <CurrencyRate/>
    </div>
  );
}

export default App;
