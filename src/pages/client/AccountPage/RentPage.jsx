import { Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ContextRentMovies } from '../../../context/RentMovieProvider';
import { ContextMovies } from '../../../context/MovieProvider';
import { getObjectById } from '../../../utils/FunctionContants';
import { ContextAuth } from '../../../context/AuthProvider';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
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
function RentPage(props) {
    const rentMovies = useContext(ContextRentMovies);
    const { accountLogin } = useContext(ContextAuth);
    const [rentByUser,setRentByUser] = useState([]);
    
    useEffect(() => {
      const loc = rentMovies.filter(a => a.accountId == accountLogin.id);
      setRentByUser(loc);
    },[rentMovies]);

    const movies = useContext(ContextMovies);
     const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
      const displayedData = rentByUser.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
      };
    
    return (
        <div className='p-5'>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell align="center">Movie</StyledTableCell>
                        <StyledTableCell align="center">Price</StyledTableCell>
                        <StyledTableCell align="center">StartDate</StyledTableCell>
                        <StyledTableCell align="center">ExpiryDate</StyledTableCell>
                        <StyledTableCell align="center">TransactionId</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayedData.map((row,index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                            {page*5 + index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                               <img src={getObjectById(row.movieId,movies)?.imgUrl} alt="" className="w-20 h-10 object-cover rounded-lg m-auto" />
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.price}</StyledTableCell>
                            <StyledTableCell align="center">{row.startDate?.toDate().toLocaleDateString('vi-VN')}</StyledTableCell>
                            <StyledTableCell align="center">{row.expiryDate?.toDate().toLocaleDateString('vi-VN')}</StyledTableCell>
                            <StyledTableCell align="center">{row.transactionId}</StyledTableCell>
                            <StyledTableCell align="center">
                            <Button variant="contained">Status</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
         component="div"
         count={rentMovies.length}
         page={page}
         onPageChange={handleChangePage}
         rowsPerPage={rowsPerPage}
         onRowsPerPageChange={handleChangeRowsPerPage}
       />
    </div>
    );
}

export default RentPage;