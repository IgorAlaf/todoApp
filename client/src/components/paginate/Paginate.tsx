import React, { FC } from 'react'

interface IProps {
  tasksInPage: number
  tasksLength: number
  paginate: Function
}

const Paginate: FC<IProps> = ({ tasksInPage, tasksLength, paginate }) => {
  const pageNumbers = []
  //   console.log(tasksLength)
  for (let i = 1; i <= Math.ceil(tasksLength / tasksInPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <div
      className='bg-white px-3 py-2 border border-solid '
      style={{ width: '100%' }}
    >
      <ul className='flex gap-2'>
        {pageNumbers.map(number => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className='cursor-pointer border border-solid px-3 py-1 bg-[#007BFF]  text-white text-sm'
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Paginate
