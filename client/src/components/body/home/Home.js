import React from 'react'
import './home.css'

function Home() {
    return (
        <div className="home_page">
            <h1>Bienvenido a su plataforma catastral</h1>
            <br></br>
            <img className= "home_img" src="../../leticia.jpg"></img>
            
            <h2>¿ Qué es ?</h2>
            <br></br>

            <p>
                Es el impuesto que recae sobre la propiedad inmueble y se genera 
                por la existencia del predio. Su base gravable depende del avalúo 
                catastral. Es una renta endógena, de propiedad de los municipios y 
                distritos, quienes tienen a su cargo su administración, recaudo y 
                control. Esto permite la concesión de exenciones tributarias, y la 
                adopción de tarifas preferenciales con fines extrafiscales propios 
                de los impuestos.
            </p>
            
            <br></br>
            <br></br>
            <h2>¿Para qué es?</h2>
            <br></br>
            
            <ul>
                <li type="disc">
                    Puede ser un poderoso mecanismo de distribución de la riqueza, a 
                    partir del cobro progresivo sobre una base gravable y tarifas 
                    actualizadas.
                </li>
                <br></br>
                <li >
                    Constituye una de las principales rentas de los municipios y distritos, 
                    y una parte significativa de sus ingresos corrientes propios.

                </li>
                <br></br>
                <li >
                    Permite usos extrafiscales, como los disuasorios y de incentivos, para 
                    el ordenamiento territorial: por ejemplo, a partir de exenciones y 
                    tarifas preferenciales, los municipios y distritos pueden impulsar o 
                    estimular determinadas actividades que resulten meritorias o necesarias.

                </li>
                <br></br>
                <li >
                    Puede ser un poderoso mecanismo de distribución de la riqueza, a 
                    partir del cobro progresivo sobre una base gravable y tarifas 
                    actualizadas.

                </li>
                <br></br>
                <li >
                    Mediante la adopción de tarifas más altas se puede desincentivar 
                    las actividades de determinados predios con externalidades 
                    negativas, como en el caso de los predios urbanizados sin edificar, 
                    urbanizables no urbanizados, o actividades de fuerte impacto para el 
                    municipio o distrito.

                </li>
            
            
            </ul>
          
            <a href="https://www.youtube.com/watch?v=dkNfNR1WYMY" target="_blank" 
            rel="noopener noreferrer">Más información</a>

            
            
            <a href="https://www.youtube.com/watch?v=8SbUC-UaAxE" target="_blank" 
            rel="noopener noreferrer">Enlaces de interés</a>
        </div>
    )
}

export default Home
