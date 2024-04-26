import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import Boton from "../componentes/Boton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrimeraVez from "../componentes/PrimeraVez";
import GestorAtajos from "../componentes/GestorAtajos";
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';

function AddCategoriaGastos(){
    const language = useSelector(state => state.language.language);
    
    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const [categoriasLS, setCategoriasLS] = useState([]);
    function obtenerCategoriasLS(){
        const categoriasLSprov = localStorage.getItem('categoriasGastos');
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
        console.log("Categorias: ", categorias)
        if(categorias == null || categorias == undefined || categorias.length == 0){
            categorias = [nuevaCategoria];
        }else{
            categorias.push(nuevaCategoria);
        }
        categorias = JSON.stringify(categorias);
        localStorage.setItem('categoriasGastos', categorias)
        toast.success('¡La categoría fue añadida con éxito!');
        setNuevaCategoria('');
        obtenerCategoriasLS();
    }

    useEffect(() => {
        obtenerCategoriasLS();
    }, [])

    useEffect(() => {
        console.log("Categorias LS:", categoriasLS)
    }, [categoriasLS])
    return (
        <div className="addCategoriaGastos">
            <Navbar enlaceHeader={"/ExpenseTracker/"}/>
            <PrimeraVez/>
            <GestorAtajos/>
            <ToastContainer position="bottom-left" />
            <form className="formulario" action="">
                <h1>{translations[language].addCategoriaGastosH1}</h1>
                <p>{translations[language].addCategoriaGastosP1}</p> 
                <input className="input" type="text" name="" id="" placeholder={translations[language].addCategoriaGastosPlaceholder} value={nuevaCategoria} onChange={guardarCategoriaIngresos}/>
                <Boton contenido={translations[language].añadirBtn} clase="Btn BtnBlue" onClick={guardarCategoriaLS}/>
            </form>

            <div className="formulario">
                <h2>{translations[language].addCategoriaGastosH2}</h2>
                <ul>
                    {categoriasLS.map((categoria, index) => (
                        <li key={index}>{categoria}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AddCategoriaGastos;