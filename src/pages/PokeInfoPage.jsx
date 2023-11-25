import { useNavigate, useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import HeaderPoke from "../components/shared/HeaderPoke"
import './styles/PokeInfoPage.css'

const PokeInfoPage = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const [pokemon, getPokemon] = useFetch(url)

  useEffect(() => {
    getPokemon()
  }, [])

  const handleNavigate = () =>{
    navigate(`/pokedex`)
}
  
  return (
    <>
      <HeaderPoke />
      <article className="pokeInfo-container">
      <span className="pokeInfo__return"> <i onClick={handleNavigate} className='bx bx-arrow-back pokeInfo__return pokeInfo__return__icon'></i> </span>
        <header className="pokeInfo__header" style={{background: `linear-gradient(var(--color-${pokemon?.types[0].type.name}),white)`}}>
          <img className="pokeInfo__img" src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </header>
        <section className="pokeInfo__card">
          <h3 className="pokeInfo__card__id" >#{pokemon?.id}</h3>
          <section className="pokeInfo__card__name">
            <hr />
            <h2 className="pokeInfo__card__name-name">{pokemon?.name}</h2>
            <hr />
          </section>
          <section className="pokeInfo__card__data">
            <p className="pokeInfo__card__data__p">Weight<span>{pokemon?.weight}</span></p>
            <p className="pokeInfo__card__data__p">height<span>{pokemon?.height}</span></p>
          </section>
          <section className="pokeInfo__card__ts-as">
            <p className="pokeInfo__card__ts-as-p">type</p>
            <p className="pokeInfo__card__ts-as-p">Abilities</p>
            <ul className="pokeInfo__card__t-a">
              {
                pokemon?.types.map(infoType => (
                  <li key={infoType.type.url} style={{background: `var(--color-${infoType.type.name})`}}>{infoType.type.name}</li>
                ))
              }
            </ul>
            <ul className="pokeInfo__card__t-a">
              {
                pokemon?.abilities.map(infoType => (
                  <li key={infoType.ability.url}>{infoType.ability.name}</li>
                ))
              }
            </ul>
          </section>
          <ul className="pokeInfo__card__stats">
            <h2 className="pokeInfo__card__stats__title">Stats</h2>
            {
              pokemon?.stats.map(infoStat => (
                <>
                  <li className="pokeInfo__card__stat" key={infoStat.stat.url}>
                    <span key={infoStat.stat.name}>{infoStat.stat.name}:</span>
                    <span key={`${infoStat.stat.name}2`} >{infoStat.base_stat}/150</span>
                  </li>
                  <section key={`${infoStat.stat.name}-sec`} className="pokeInfo__card__graf">
                    <p key={`${infoStat.stat.name}-sec1`} style={{width: `${infoStat.base_stat}%`}} className="pokeInfo__card__graf-1"></p>
                    <p key={`${infoStat.stat.name}-sec2`} style={{width: `${150-infoStat.base_stat}%`}} className="pokeInfo__card__graf-2"></p>
                  </section>
                </>
              ))
            }
          </ul>
        </section>
      </article>
      <article className="pokeInfo__moves-container">
        <h2>Movements</h2>
        <ul className="pokeInfo__moves">
          {
            pokemon?.moves.map(infoMove => (
              <li className="pokeInfo__move" key={infoMove.move.url}>
                {infoMove.move.name}
              </li>
            ))
          }
        </ul>
      </article>
    </>
  )
}

export default PokeInfoPage