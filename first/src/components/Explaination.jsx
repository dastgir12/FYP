import React from 'react'

const Explaination = ({ marginTop, marginLeft,text1,text2 }) => {
  return (
    <div className="w-full h-auto">
    <div className={`relative w-[236px] h-[140px] flex flex-col justify-between`} style={{ marginTop: `${marginTop}`, marginLeft: `${marginLeft}` }}>
      <div className="text-center w-[218px] h-[110px]">
        {text1}
      </div>
      <div className="text-center font-sans font-bold">{text2}</div>
    </div>
    </div>
  )
}

export default Explaination
