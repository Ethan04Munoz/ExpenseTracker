import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import Boton from "../componentes/Boton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrimeraVez from "../componentes/PrimeraVez";
import GestorAtajos from "../componentes/GestorAtajos";
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';

function AddCategoriaIngresos(){
    const language = useSelector(state => state.language.language);
    
    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const [categoriasLS, setCategoriasLS] = useState([]);
    function obtenerCategoriasLS(){
        const categoriasLSprov = localStorage.getItem('categoriasIngresos');
        // Asegurándonos de que categoriasLS siempre sea un array.
        const categorias = categoriasLSprov ? JSON.parse(categoriasLSprov) : [];
        setCategoriasLS(categorias);
        return categorias;
    }
        
    function guardarCategoriaIngresos(e){
        setNuevaCategoria(e.target.value);
    }

    function guardarCategoriaLS(){
        let categorias = obtenerCategoriasLS();
        if(categorias == null || categorias == undefined){
            categorias = [nuevaCategoria];
        } else{
            categorias.push(nuevaCategoria);
        }
        categorias = JSON.stringify(categorias);
        localStorage.setItem('categoriasIngresos', categorias)
        toast.success('¡La categoría fue añadida con éxito!');
        setNuevaCategoria('');
        obtenerCategoriasLS();
    }

    useEffect(() => {
        obtenerCategoriasLS();
    }, [])

    useEffect(() => {
        console.log("Categorias LS:", categoriasLS)
    }, [categoriasLS]);

    return (
        <div className="addCategoriaIngresos">
            <Navbar enlaceHeader={"/ExpenseTracker/"}/>
            <PrimeraVez/>
            <GestorAtajos/>
            <ToastContainer position="bottom-left" />
            <form className="formulario" action="">
                <h1>{translations[language].addCategoriaIngresosH1}</h1>
                <p>{translations[language].addCategoriaIngresosP1}</p> 
                <input className="input" type="text" name="" id="" placeholder={translations[language].addCategoriaIngresosPlaceholder} value={nuevaCategoria} onChange={guardarCategoriaIngresos}/>
                <Boton contenido={translations[language].añadirBtn} clase="Btn BtnBlue" onClick={guardarCategoriaLS}/>
            </form>

            <div className="formulario">
                <h2>{translations[language].addCategoriaIngresosH2}</h2>
                <ul>
                    {categoriasLS.map((categoria, index) => (
                        <li key={index}>{categoria}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AddCategoriaIngresos;