import { PayloadAction } from '@reduxjs/toolkit';
import {createReducer,createAction,createAsyncThunk} from '@reduxjs/toolkit'
import { Fetch } from '../API/API'

export interface InitialStateType{
    amount:number,
    result:number,
    from:string,
    to:string,
    results:results
    resultsToUAH:results
}


interface StateForOnChange{
    amount:number,
    result:number,
    from:string,
    to:string,
}
interface ForConvert{
    from:string,
    to:string,
}

interface results{
    [key:string]:number
}

const InitialState:InitialStateType ={
    amount:1,
    result:1,
    from:'USD',
    to:'UAH',
    results:{

    },
    resultsToUAH:{
        
    }
}

export const GetRates = createAsyncThunk<results,string>(
    'GET-RATES',
    async ( currency , { dispatch }) => {
      const res = await new Fetch().getAll(currency);
      dispatch(SetRates(res))
      return res;
    }
)

export const GetRatestoUAH = createAsyncThunk<results,string>(
    'GET-RATES',
    async ( currency , { dispatch }) => {
      const res = await new Fetch().getAll(currency);
      dispatch(SetRatestoUAH(res))
      return res;
    }
)

export const Convert = createAsyncThunk<number,ForConvert>(
    'CONVERT',
    async (payload,{dispatch})=>{
        const res = await new Fetch().Convert(payload)
        dispatch(SetConvert(res))
        return res
    }
)
export const SetConvert = createAction<number>('SET-CONVERT')
export const SetRates = createAction<results>('SET-RATES')
export const SetRatestoUAH = createAction<results>('SET-RATES-TO-UAH')
export const Replace = createAction<{from:string,to:string}>('RESET')
export const ChangeData = createAction<StateForOnChange>('CHANGE-DATA')

export const Rates = createReducer<InitialStateType>(InitialState,{
    [SetRates.type]:(state,action:PayloadAction<results>)=>{
        console.log(action.payload,'payload');
        return{
            ...state,
            results:action.payload
        }
    },
    [SetRatestoUAH.type]:(state,action:PayloadAction<results>)=>{
        const resultsToUAH = Object.entries({"uad":0.1}).map(([name,u]) =>{return{value:1/u,name:name}}).reduce((u,{name,value})=>({...u,[name]:value}),{})
        return{
            ...state,
            resultsToUAH
            
        }
    },
    [SetConvert.type]:(state,action:PayloadAction<number>)=>{
        return{
            ...state,
            result: action.payload *state.amount,
            amount: state.result / action.payload
        }
    },
    [Replace.type]:(state,action:PayloadAction<{from:string,to:string}>)=>{
        console.log(action.payload);
        return{
            ...state,
            from:action.payload.to,
            to:action.payload.from
        }
    },
    [ChangeData.type]:(state,action:PayloadAction<StateForOnChange>)=>{
        return{
            ...state,
            ...action.payload
        }
    }

})
