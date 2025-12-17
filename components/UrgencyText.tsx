// *********************
// IN DEVELOPMENT
// *********************

import React from 'react'

const UrgencyText = ({stock} : { stock: number }) => {
  return (
    <p className='text-success text-xl max-[500px]:text-lg'>Corra! apenas <span className='badge badge-success text-white text-xl max-[500px]:text-lg'>{stock}</span> produtos restantes em estoque!</p>
  )
}

export default UrgencyText
