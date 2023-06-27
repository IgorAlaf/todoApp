import React, { FC } from 'react'

interface IProps {
  capacity: number
}

const HeaderTodo: FC<IProps> = ({ capacity }) => {
  return (
    <div
      className='bg-gray-200 py-2 px-4 font-semibold text-lg'
      style={{ width: '100%' }}
    >
      <h2>Todos({capacity})</h2>
    </div>
  )
}

export default HeaderTodo
