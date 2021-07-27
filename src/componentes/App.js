import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen'
import Resultado from './Resultado'
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';

class App extends Component {

  state ={
    resultado:'',
    datos:{}
  }

  cotizarSeguro = (datos) =>{
    const {marca, plan, year}= datos;
    //Base estandar 
    let resultado = 2000;
    //Obtener la diferencia de años y aumentar el 0.15% por año
    const diferencia = obtenerDiferenciaAnio(year);
    resultado += ((diferencia *0.15)* resultado)/100;

    //Americano 15%, Asiatico 5%, Europeo 30%  de incremento al valor actual
    resultado = calcularMarca(marca) * resultado;

    // plan basico incrementa el valor 20%  y el completo 50%
    let planIncrement =  obtenerPlan(plan);
    resultado = parseFloat(planIncrement * resultado).toFixed(2);

    
    const datosAuto={
      marca: marca,
      plan: plan,
      year: year
    }

    this.setState({
      resultado: resultado,
      datos: datosAuto
    })

  }
  render() {
    return (
      <div className="contenedor" >
        <Header
          titulo = "Cotizador de Seguro Vehicular" />
          
        <div className="contenedor-formulario">
              <Formulario 
                cotizarSeguro ={this.cotizarSeguro}
              />
              <Resumen
                datos = {this.state.datos}
              />
              <Resultado
                resultado = {this.state.resultado}
              />
        </div>

      </div>
      
    );
  }
}

export default App;
