import { Button, Form, Space } from 'antd'
import { useFormik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { ChangeData, Convert, GetRates, Replace } from '../../app/Rates'
import { RootState, useAppDispatch } from '../../app/store'
import { InputRate } from './InputRate'

export const CurrencyRate:React.FC<{}> = () => {
  const data = useSelector((u:RootState) =>u.Rates)

   const {results,from,to,} = data

  const dispatch = useAppDispatch()

  React.useEffect(()=>{
     dispatch(GetRates(from))
  },[])

  const formik = useFormik({
    initialValues:{amount:1,from:'USD',to:'UAH',result:36},
    onSubmit:(u)=>{
      dispatch(Convert({from:u.from,to:u.to}))
      dispatch(ChangeData(u))
      formik.values = data
    }
  })

  return (
    <Form onChange={formik.handleSubmit}  layout='horizontal' onFinish={formik.handleSubmit}>
        <Space className='my-40' align='center' size='middle'  direction='vertical' >
          <InputRate
          handleChange={formik.handleChange}
          onChange={formik.setFieldValue}
          names={['amount', 'from']}
          results={results}
          count={formik.values.amount}
          currency={formik.values.from}
          handleSubmit={formik.handleSubmit}
        />
        <Button type='primary' className=' bg-blue-500' onClick={()=>dispatch(Replace({from,to}))}>Replace</Button>
        <InputRate
          handleChange={formik.handleChange}
          onChange={formik.setFieldValue}
          names={['result', 'to']}
          results={results}
          count={formik.values.result}
          currency={formik.values.to}
          handleSubmit={formik.handleSubmit}
        />
      </Space>
    </Form>
  )
}
