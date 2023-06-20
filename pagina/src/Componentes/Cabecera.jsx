import { useState } from 'react';
import  './Cabecera.css';

const Cabecera = () => {
    const [menu, setMenu] = useState(false)
    const toggleMenu = () =>{
        setMenu(!menu)
    }
    return(
        <header className="Cabecera"> {/*header.Cabecera*/}
            <h1 className="Cabecera-h1"> {/*h1.Cabecera-h1*/}
                <a href="" className="Cabera-a">Certificados</a> {/*a.Cabecera-a*/}
            </h1>
            <button  onClick={toggleMenu} className="Cabecera-button"> {/*button.Cabecera-button*/}
                <svg className='Cabecera-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </button>
            <nav className= {`Cabecera-nav ${ menu ? 'isActive' : ''}`}> {/*nav.Cabecera-nav*/}
                <ul className="Cabecera-ul">
                   <li className="Cabecera-li"><a href="" className="Cabecera-a">Item 1</a></li> {/*li.Cabecera-li*5>a.Cabecera-a{Item $}*/}
                   <li className="Cabecera-li"><a href="" className="Cabecera-a">Item 2</a></li>
                </ul>
            </nav>
        </header>
    )

}

export default Cabecera