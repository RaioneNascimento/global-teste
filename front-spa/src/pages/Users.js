import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { request } from '../services/api';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#15171c',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Users = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getUsers();
  }, [])

  async function getUsers() {
    try{
      const res = await request('users', 'GET');
      setUsers(res?.data)
    }catch(err){
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao carregar usuarios, tente novamente mais tarde!',
        icon: 'error'
      });
      history.push('/dashboard')
    }
  }

  console.log(users)

  return (
    <div style={{
      width: '100%',
      maxWidth: '1360px',

      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
      margin: '100px auto',
      padding: '0px 20px'

    }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="center">Permissão</StyledTableCell>
              <StyledTableCell align="center">Nome</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.uuid}>
                <StyledTableCell component="th" scope="row">{user.uuid}</StyledTableCell>
                <StyledTableCell align="center">{user.nivel_acesso}</StyledTableCell>
                <StyledTableCell align="center">{user.user_name}</StyledTableCell>
                <StyledTableCell align="center">{user.user_email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users;
