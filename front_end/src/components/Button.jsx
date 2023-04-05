import React from 'react'

const Button = ({text}) => {
  return (
    <div className=" text-white bg-yellow-600 rounded-full w-[150px] h-[45px] p-4 flex justify-center items-center cursor-pointer hover:bg-yellow-700">
    <p>{text}</p>
  </div>
  )
}

export default Button
