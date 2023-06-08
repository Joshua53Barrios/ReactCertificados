import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apex.oracle.com/pls/apex/jy_apex/ApexCertificates/Dominios');
        setData(response.data.items);
        console.log(response.data.items)
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>API de Oracle APEX</h1>
      <ul>
        {data.map(item => (
          
          <li key={item.id}>{item.type_description}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;