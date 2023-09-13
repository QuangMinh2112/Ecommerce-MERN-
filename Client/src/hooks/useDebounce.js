import { useEffect, useState } from 'react'

const useDebounce = (value,ms) => {
    const [debounceValue,setDebounceValue] = useState('')
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setDebounceValue(value)
        },ms)
        return ()=>{
            timeout && clearTimeout(timeout)
        }
    },[value,ms])
    
    return debounceValue
}

export default useDebounce