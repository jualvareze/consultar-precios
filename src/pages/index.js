import { useState, useEffect } from 'react';
import { fetchAutos, fetchFiltrarAutos } from '../utils/fetching';

export default function Home() {
  const [autos, setAutos] = useState([]);
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [todosLosAutos, setTodosLosAutos] = useState([]);
  const [promedioPrecio,setPromedioPrecio] = useState([])

  useEffect(() => {
    async function loadAutos() {
      const data = await fetchAutos();
      console.log(data)
      setTodosLosAutos(data);
      setAutos(data); // Inicialmente, también mostramos todos los autos
    }
    loadAutos();
  }, []);

  useEffect(() => {
    handleFilter(); // Ejecuta el filtro cada vez que cambian las dependencias
  }, [marca, modelo, ano]);

  const handleFilter = () => {
    let autosFiltrados = todosLosAutos;

    if (marca) {
      autosFiltrados = autosFiltrados.filter(auto => auto.brand.toLowerCase().includes(marca.toLowerCase()));
    }
    if (modelo) {
      autosFiltrados = autosFiltrados.filter(auto => auto.model.toLowerCase().includes(modelo.toLowerCase()));
    }
    if (ano) {
      autosFiltrados = autosFiltrados.filter(auto => auto.year.toLowerCase().includes(ano));
    }

    setAutos(autosFiltrados);
    calcularPromedioPrecio(autosFiltrados)
  };


  const calcularPromedioPrecio = (autos) => {
    if (autos.length === 0) {
      setPromedioPrecio(0); // O maneja el caso de un array vacío como desees
      return;
    }
    let suma = 0;
    autos.forEach(element => {
      let price = deletepoints(element.price)
      let precio = price;
      if (!isNaN(precio)) {
        suma += precio;
      }
    });
    let promedio = suma / autos.length;
    setPromedioPrecio(parseInt(promedio));
  };


  const deletepoints = (cadena) => {
    // Eliminar todos los puntos de la cadena
    let cadenaSinPuntos = cadena.replace(/\./g, '');
  
    // Convertir la cadena sin puntos a un número
    let numero = parseInt(cadenaSinPuntos);
  
    return numero;
  };
  
  const handleMarcaChange = (e) => {
    setMarca(e.target.value);
    handleFilter(); // Ejecuta el filtro cada vez que cambia la marca
  };

  const handleModeloChange = (e) => {
    setModelo(e.target.value);
    handleFilter(); // Ejecuta el filtro cada vez que cambia el modelo
  };

  const handleAnoChange = (e) => {
    setAno(e.target.value);
    handleFilter(); // Ejecuta el filtro cada vez que cambia el año
  };

  return (
    <div>
      <h1>Autos</h1>
      <div>
        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={handleMarcaChange}
        />
        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={handleModeloChange}
        />
        <input
          type="text"
          placeholder="Año"
          value={ano}
          onChange={handleAnoChange}
        />
      </div>
      <ul>
        <h2>Precio promedio: {Intl.NumberFormat('es-CL').format(promedioPrecio)}</h2>
        {autos.map((auto) => (
          <li key={Math.random()}>
            {auto.brand} - {auto.model} - {auto.year} - {auto.price}
          </li>
        ))}
      </ul>
    </div>
  );
}