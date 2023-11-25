import './HeaderPoke.css'

const HeaderPoke = () => {
    return (
        <header className='header-container'>
            <img className='header__img-pokedex' src="./pokedex.png" alt="pokedex" />
            <img className="header__img-ball" src="./Poke_Ball.png" alt="poke_ball" />
            <p className="header__up" ></p>
            <p className="header__down" ></p>
        </header>
    )
}

export default HeaderPoke