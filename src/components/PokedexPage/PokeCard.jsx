import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import './styles/PokeCard.css'

const PokeCard = ({url}) => {

    const [infoPoke, getInfoPoke]= useFetch(url)

    useEffect(()=>{
        getInfoPoke()
    },[])

    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate(`/pokedex/${infoPoke.id}`)
    }

    return (
        <article className={`pokeCard-container ${infoPoke?.types[0].type.name}-gradient`} onClick={handleNavigate}>
            <header className="pokeCard__header">
                <img className="pokeCard__header-img" src={infoPoke?.sprites.other["official-artwork"].front_default} alt="" />
            </header>
            <section className="pokeCard__info">
                <h3 className="pokeCard__info__title">{infoPoke?.name}</h3>
                <ul className="pokeCard__info__type">
                    {
                        infoPoke?.types.map( infoType =>(
                            <li className="pokeCard__info__type-li" key={infoType.type.url}>{infoType.type.name}</li>
                        )) 
                    }
                </ul>
                <p className="pokeCard__info__p">Type</p>
                <hr className="pokeCard__info__hr"/>
                <ul className="pokeCard__info__stats">
                    {
                        infoPoke?.stats.map( infoStat =>(
                            <li className="pokeCard__info__stats-li" key={infoStat.stat.url}>
                                <span className="pokeCard__info__stats__name" >{infoStat.stat.name}</span>
                                <span className="pokeCard__info__stats__stat">{infoStat.base_stat}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </article>
    )
}

export default PokeCard