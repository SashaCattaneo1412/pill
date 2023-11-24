import React, { useState, useRef } from 'react';
import CenteredContainer from '../components/CenteredContainer';
import style from '../styles/compartimiento1.module.css';
import Image from 'next/image'
import Link from 'next/link';
import Dropdown from '../components/dropdown';

import Header from '../components/Header.jsx';

const Compartimiento1 = () => {

  const form = useRef();
  const [nombre, setNombre] = useState("");
  const [horario, setHorario] = useState("");
  const [dia, setDias] = useState("");
  const [todoslosdias, setTodosLosDias] = useState("");
  const [fechainicio, setFechaInicio] = useState("");


  const Hardware = async (e) => {
    try {
      const response = await fetch('http://localhost:5000/on1', {
        
      });

      if (response.ok) {
        console.log('SE ABRE');
        router.push('/compartimento');

      } else {
        console.error('Error al guardar pastilla');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };


  const Guardar = async (e) => {
    try {
      const response = await fetch('http://localhost:5000/compartimento1informacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, horario, dia, todoslosdias, fechainicio }),
      });

      if (response.ok) {
        console.log('Pastilla guardada');
        router.push('/compartimento');

        const responseCalendar = await fetch('http://localhost:5000/crearEventoEnCalendario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, horario, dia, todoslosias, fechainicio }),
        });

        if (responseCalendar.ok) {
          console.log('Evento creado en Google Calendar');
        } else {
          console.error('Error al crear evento en Google Calendar');
        }
      } else {
        console.error('Error al guardar pastilla');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <Header></Header> <br />
      <div className={style.img}>
        <Image width={350} height={650} src="/Image/compartimiento1.png" alt="Imagen comp1" />
      </div>
      <CenteredContainer>
        <form className="form-container">
          <div className={style.label}>
            <div className={style.contenedorflotante}>
              <label htmlFor="name">Nombre de la pastilla: </label>
              <input type="text" id="NOMBRE" name="name" onChange={(event) => setNombre(event.target.value)} />
            </div> <br />
            <div className="form-group">
              <div className={style.contenedorflotante}>
                <label htmlFor="cuanto"> Por cuantos dias se toma? </label>
                <input type="text" id="dias" name="dias" onChange={(event) => setDias(event.target.value)} />
                <label htmlFor="dias"> Todos los dias? </label>
                <input className={style.checkbox} type="checkbox" value="yes" onChange={(event) => setTodosLosDias(event.target.value)} />
                
              </div>
            </div><br />
            <div className={style.contenedorflotante}>
            <label htmlFor="dias"> Horario en el que se lo debe tomar </label>
            <input type="text" id="hoarario1" name="hora" placeholder="00:00" onChange={(event) => setHorario(event.target.value)} />
                </div>
                <br/>
            <div className={style.contenedorflotante}>
              <label htmlFor="fecha">Fecha de Incio </label>
              <input type="date" id="FECHA" name="fecha" onChange={(event) => setFechaInicio(event.target.value)} />
            </div> <br />
          </div>

          <button className={style.BTN} onClick={(e) => Guardar(e)}>
            <div className={style.contenidoEncima}>Guardar</div>
          </button>

         

        </form>
      </CenteredContainer>

    </div>
  )
}


export default Compartimiento1
