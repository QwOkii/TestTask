import { Select,Space,Input } from 'antd'
import React from 'react'

interface Props{
  results:{ 
    [key:string]:number
  },
  count:number,
  currency:string |any,
  names:string[],
  onChange:(name:string,value:any)=>void,
  handleChange:any,
  handleSubmit:()=>void
}

export const InputRate:React.FC<Props> = ({results,count,currency,onChange,names,handleChange,handleSubmit}) => {
  const handleChanges =React.useCallback((name:string,value:number | string)=>{
    handleChange(value)
    onChange(name,value)  
  },[count])

  const handleChangesSelect =React.useCallback((name:string,value: string)=>{
    handleChange(value)
    onChange(name,value)
    handleSubmit()
  },[])

  return (
    <Space.Compact direction='horizontal'>
        <Select onSelect={(e)=> handleChangesSelect(names[1],e[0])} value={currency} className='w-32' options={Object.keys(results).map(currency=>{return {value:[currency],label:[currency]}})} >
        
        </Select>
        <Input  className='' name={names[0]} onChange={(e)=> handleChanges(names[0],e.target.value)} value={count}/>

    </Space.Compact>
  )
}
