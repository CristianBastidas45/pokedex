import { useState } from 'react'
import './styles/Pagination.css'

const Pagination = ({pokePerPage, totalPoke,currentPage ,setCurrentPage,rangPage,setRangPage}) => {
  
  
  const pageNumbers = []

  for( let i=1;i<= Math.ceil(totalPoke/pokePerPage);i++){
    pageNumbers.push(i)
  }

  const numberPagination = 5;

  const handlePage =  e => {
    setCurrentPage(e.target.id)
  }
  const rangPageMinus = () => {
    setRangPage(rangPage-numberPagination)
  }
  const rangPagePlus = () => {
    setRangPage(rangPage+numberPagination)
  }

  return (
    <nav className='pagination-container'>
      <ul className='pagination__list'>
        {
          rangPage>0?(<li onClick={rangPageMinus} className='pagination__list__li'><button className="pagination__list__btn" > ⫷ </button> </li>):''
        }
        {
          pageNumbers.filter(number=> rangPage<number && number<=(rangPage+numberPagination)).map(number=>(
            <li className='pagination__list__li' key={number}>
              <button className={`pagination__list__btn ${(number==currentPage) &&'selected'}`}  onClick={handlePage} id={number}>{number}</button>
            </li>
          ))
        }
        {
          (rangPage+8)<pageNumbers.length?(<li onClick={rangPagePlus} className='pagination__list__li'><button className="pagination__list__btn" > ⫸ </button> </li>):''
        }
      </ul>
    </nav>
  )
}

export default Pagination