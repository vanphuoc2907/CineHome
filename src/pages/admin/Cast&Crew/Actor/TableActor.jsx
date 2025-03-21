import {React , useContext, useState }  from 'react';
import { styled } from '@mui/material/styles';
import {Table, Button, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell, tableCellClasses, TablePagination   }from '@mui/material';
import  { ContextActors} from "../../../../context/ActorProvider";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ModalDelete from '../../../../components/admin/ModalDelete';
import { deleteDocument } from '../../../../services/firebaseService';
import { useNotification } from "../../../../context/NotificationProvider";
import {truncate } from "../../../../utils/FunctionContants";
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
  
  function TableActor({setActor ,actor, handleEdit, search, setPage, page }) {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const showNotification = useNotification();
    const actors = useContext(ContextActors);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }
    const onConfirm = async () => {
        await deleteDocument("Actors", actor.id);
        showNotification("actors deleted successfully!", "error");
        setOpen(false);

    };

    const handleDeleted = (item) => {
        setOpen(true);
        setActor(item);
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };
    const dataFilter = actors.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase())
    )
      const displayedData = dataFilter.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    return (
        <div className='p-5'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="center">Img</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Description</StyledTableCell>
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
                                   <img src={row.imgUrl} alt="" className="w-10 h-10 rounded-full m-auto" />
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.name}</StyledTableCell>
                                <StyledTableCell align="center">{truncate(row.description)}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button onClick={() => handleEdit(row)} variant="contained"><FaEdit /></Button>
                                    <Button onClick={() =>handleDeleted(row)} sx={{marginLeft : "10px"}} variant="contained" color="error"><RiDeleteBin5Fill /></Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
             component="div"
             count={actors.length}
             page={page}
             onPageChange={handleChangePage}
             rowsPerPage={rowsPerPage}
             onRowsPerPageChange={handleChangeRowsPerPage}
           />

            <ModalDelete open={open} handleClose={handleClose} onConfirm={onConfirm} />
        </div>
    );
}

export default TableActor;