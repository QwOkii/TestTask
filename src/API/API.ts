
import axios from 'axios'

type DataGetAll={
    conversion_rates:{
        [key:string]:number
    }
    
}
type Convert ={
    conversion_rate:number
}

const api = axios.create({
    baseURL:`https://v6.exchangerate-api.com/v6/37cdce734372c8d3660a3615`,
    headers:{

    }
})

export class Fetch {
    async getAll(currency:string){
        const response = await api.get<DataGetAll>(`/latest/${currency}`)
        return response.data.conversion_rates
    }
    async Convert (payload:{to:string,from:string}){
        const {from,to} =payload
        const response = await api.get<Convert>(`/pair/${from}/${to}`).then(data =>data.data)
        return response.conversion_rate
    }
}