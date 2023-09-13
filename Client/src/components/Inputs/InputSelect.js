import React from 'react'

const InputSelect = ({value,handleChangeValue,options}) => {
  return (
    <>
      <select className="p-4 border outline-none" name="" id="" onChange={(e)=>handleChangeValue(e.target.value)}>
        <option value="">Choose</option>
        {options?.map(el=>(
          <option className='p-4' value={el.value}>{el.text}</option>
        ))}
      </select>
    </>
  )
}

export default InputSelect