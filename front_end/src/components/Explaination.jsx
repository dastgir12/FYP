import React from 'react'

const Explaination = ({marginTop , marginLeft}) => {
  return (
      <div className={`relative w-[236px] h-[140px] flex flex-col justify-between mt-${marginTop} ml-${marginLeft}`}>
        <div className="text-center w-[218px] h-[110px]">
          Efficient lead capturing mechanism
        </div>
        <div className="text-center font-sans font-bold">Capture</div>
      </div>
  )
}

export default Explaination
