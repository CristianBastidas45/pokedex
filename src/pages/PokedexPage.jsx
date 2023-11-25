import { useSelector } from 'react-redux'
import useFetch from '../hooks/useFetch'
import { useEffect, useRef, useState } from 'react'
import PokeCard from '../components/PokedexPage/PokeCard'
import SelectType from '../components/PokedexPage/SelectType'
import Pagination from '../components/PokedexPage/Pagination'
import './styles/PokedexPage.css'
import HeaderPoke from '../components/shared/HeaderPoke'

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('allPokemons')
  const [currentPage, setCurrentPage] = useState(1)
  const [pokePerPage, setPokePerPage] = useState(9)
  const [rangPage, setRangPage] = useState(0)

  const trainerName = useSelector(store => store.trainerName)

  const url2 = 'https://pokeapi.co/api/v2/pokemon'
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=13000&offset=0'
  const [pokemons, getPokemons, getByTypePokemons] = useFetch(url)

  useEffect(() => {
    if (selectValue === 'allPokemons') {
      getPokemons()
    } else {
      getByTypePokemons(selectValue)
    }
  }, [selectValue, inputValue])

  const inputSearch = useRef()

  const inputPokePerPage = useRef()

  const handleSearch = e => {
    e.preventDefault()
    setInputValue(inputSearch.current.value.toLowerCase().trim())
    setRangPage(0)
    setCurrentPage(1)
    inputSearch.current.value = ''
  }
  const handlePokePerPage = e => {
    e.preventDefault()
    setPokePerPage(+inputPokePerPage.current.value)
  }

  const cbfilter = (poke) => {
    //filtro por nombre en el input
    const nameFiltered = poke.name.includes(inputValue)
    return nameFiltered
  }
  const indexOfLastPoke = currentPage * pokePerPage
  const indexOfFisrtPoke = indexOfLastPoke - pokePerPage

  return (
    <div className='pokedexPage-container'>
      <HeaderPoke />
      <main className='main-container'>
        <p className='main__p'><span className='main__name' >Welcome {trainerName},</span> here you can find your favorite pokemon, let's go!</p>
        <section className='main__filter'>
          <form className='main__filter__form' onSubmit={handleSearch}>
            <input className='main__filter__input' type="text" ref={inputSearch} />
            <button className='main__filter__btn' >search</button>
          </form>
          <select className='main__filter__ppp' ref={inputPokePerPage} onChange={handlePokePerPage} defaultValue="9">
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
          </select>
          <SelectType
            setSelectValue={setSelectValue}
            setInputValue={setInputValue}
            setCurrentPage={setCurrentPage}
            setRangPage={setRangPage}
          />
        </section>
        <div className='main__PokeCards'>
          {
            pokemons?.results.filter(cbfilter).length !== 0 ? (

              pokemons?.results.filter(cbfilter).slice(indexOfFisrtPoke, indexOfLastPoke).map(poke => (
                <PokeCard
                  key={poke.url}
                  url={poke.url}
                />
              ))) : (
              <p className='main__p'>Does not exist, <span className='main__name'>{inputValue}</span></p>
            )
          }
        </div>
      </main>
      <footer>
        <Pagination
          pokePerPage={pokePerPage}
          totalPoke={pokemons?.results.filter(cbfilter).length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rangPage={rangPage}
          setRangPage={setRangPage}
        />
      </footer>
    </div>
  )
}

export default PokedexPage