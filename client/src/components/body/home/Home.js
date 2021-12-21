import React from "react";
import "./home.css";
import Slider from "../../slider/Slider";

function Home() {
  return (
    <div>
      <div className="contenedor">
        <figure>
          <img
            src="https://conociendocolombia.com/wp-content/uploads/2020/03/Tour_aldea_zacambu_y_tres_fronteras_basico_amazonas-600x400.jpg"
            alt=""
          />
          <div className="capa">
            <h3><strong>¿Qué es?</strong></h3>
            <p>
              Es el impuesto que recae sobre la propiedad inmueble y se genera
              por la existencia del predio.
            </p>
          </div>
        </figure>

        <figure>
          <img
            src="https://i.ytimg.com/vi/s5y8v9JiFAI/maxresdefault.jpg"
            alt=""
          />
          <div className="capa">
            <h3><strong>¿Para qué es?</strong></h3>
            <p>
              Permite usos extrafiscales, como los disuasorios y de incentivos,
              para el ordenamiento territorial: por ejemplo, a partir de
              exenciones y tarifas preferenciales, los municipios y distritos
              pueden impulsar o estimular determinadas actividades que resulten
              meritorias o necesarias.
            </p>
          </div>
        </figure>
        <figure>
          <img
            src="https://www.semana.com/resizer/opQ8jucYyXL-vcdqKFcpSTUrhBk=/1200x646/filters:format(jpg):quality(50)/cloudfront-us-east-1.images.arcpublishing.com/semana/KQJ6ERQAOJFY5BPUYNT4OELGRQ.jpg"
            alt=""
          />
          <div className="capa">
            <h3><strong>¿Que efectos tiene?</strong></h3>
            <p>Puede ser un poderoso mecanismo de distribución de la riqueza, a partir del cobro progresivo sobre una base gravable y tarifas actualizadas.</p>
          </div>
        </figure>
      </div>
    </div>
  );
}

export default Home;
