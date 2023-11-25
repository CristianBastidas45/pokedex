import axios from "axios"
import { useState } from "react"

const useFetch = (url) => {

    const [infoApi, setInfoApi] = useState()

    const getApi = () =>{
        axios.get(url)
        .then(res => setInfoApi(res.data))
        .catch(err => console.log(err))
    }

    const getfilterApi = (urlType) =>{
        axios.get(urlType)
        .then(res => {
            const obj = {
                results:  res.data.pokemon.map(e => e.pokemon)
            }
            setInfoApi(obj)
        })
        .catch(err => console.log(err))
    }

    return [infoApi, getApi, getfilterApi]
}

export default useFetch