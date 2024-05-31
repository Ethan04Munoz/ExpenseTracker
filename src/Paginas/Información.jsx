import React from "react";
import Navbar from "../componentes/Navbar";
import PrimeraVez from "../componentes/PrimeraVez";
import GestorAtajos from "../componentes/GestorAtajos";

function Informacion() {
    return (
        <div className="informacionPage">
            <Navbar enlaceHeader={"/"} />
            <PrimeraVez />
            <GestorAtajos />
            <div className="contenerBotonesMainPage">
                <h1>Información sobre esta aplicación</h1>
                <h2>Almacenamiento de datos</h2>
                <p>
                    Todos los datos que ingreses en esta aplicación, como tus gastos, ingresos y demás información financiera, se almacenan de forma local en tu navegador web utilizando la tecnología <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">LocalStorage</a>. Esta tecnología permite guardar datos en el propio navegador del usuario, por lo que tus datos no se envían a ningún servidor externo ni se comparten con terceros.
                </p>
                <p>
                    Es importante tener en cuenta que si borras la caché y las cookies de tu navegador, todos los datos almacenados en LocalStorage se perderán, ya que son específicos de cada dispositivo y navegador.
                </p>
                <h2>Confiabilidad y uso recomendado</h2>
                <p>
                    Esta aplicación es una demostración o prototipo y no está diseñada para su uso en entornos de producción o con fines críticos. Se recomienda utilizarla únicamente como herramienta de aprendizaje o para fines de prueba, y no confiar en ella para el manejo de información financiera real o sensible.
                </p>
                <p>
                    Debido a las limitaciones de la tecnología LocalStorage, esta aplicación no ofrece medidas de seguridad adicionales, como cifrado de datos o copias de respaldo, por lo que no se garantiza la integridad o la privacidad de la información almacenada.
                </p>
            </div>
        </div>
    )
}

export default Informacion;