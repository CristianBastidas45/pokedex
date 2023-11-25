import { useRef } from "react"
import { setTrainerName } from "../store/slices/trainerName.slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import './styles/HomePage.css'

const HomePage = () => {

  const inputName = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerName(inputName.current.value.trim()));
    navigate('/pokedex')
  }

  return (
    <>
      <div className="pokedex-container">
        <img className="pokedex__img" src="./pokedex.png" alt="pokedex" />
        <h1 className="pokedex__title">Hi Trainer!</h1>
        <p className="pokedex__p">To start, please give me you trainer name</p>
        <form onSubmit={handleSubmit}>
          <input className="pokedex__input" ref={inputName} type="text" placeholder="Tu nombre..." />
          <button className="pokedex__btn"> Catch them all!</button>
        </form>
      </div>
      <footer className="footer-container">
        <img className="footer__img" src="./Poke_Ball.png" alt="poke_ball" />
        <p className="footer__up" ></p>
        <p className="footer__down" ></p>
      </footer>
    </>
  )
}

export default HomePage