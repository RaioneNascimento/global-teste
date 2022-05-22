import React from 'react';
import { executaRequisicao } from '../services/api';

const Dashboard = async () => {

  const resultado = await executaRequisicao('users', 'GET');
  console.log(resultado);

  return (
    <div className='home'>
      <h1>Overview</h1>
    </div>
  )
}

export default Dashboard;
