import { React, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Table, Button, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell, tableCellClasses, TablePagination, IconButton, Tooltip, Avatar } from '@mui/material';
import { ContextFeatures } from "../../../../context/FeatureProvider";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ModalDelete from '../../../../components/admin/ModalDelete';
import { deleteDocument } from '../../../../services/firebaseService';
import { useNotification } from "../../../../context/NotificationProvider";
import { ContextMovies } from '../../../../context/MovieProvider';
import { getObjectById, truncate } from '../../../../utils/FunctionContants';
import { ContextPlans } from '../../../../context/PlanProvider';
import { BiSolidCategory } from "react-icons/bi";
import { ContextCategories } from '../../../../context/CategoryProvider';
import { FaUsers } from "react-icons/fa6";
import { ContextActors } from '../../../../context/ActorProvider';
import { ContextCharacters } from '../../../../context/CharacterProvider';
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TableMovie({ setMovie, movie, handleEdit, search, setPage, page }) {

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const showNotification = useNotification();
    const movies = useContext(ContextMovies);
    const plans = useContext(ContextPlans);
    const categories = useContext(ContextCategories);
    const actors = useContext(ContextActors);
    const characters = useContext(ContextCharacters);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const onConfirm = async () => {
        await deleteDocument("Movies", movie.id);
        showNotification("Movies deleted successfully!", "error");
        setOpen(false);
    };

    const handleDeleted = (item) => {
        setOpen(true);
        setMovie(item);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const dataFilter = (movies || []).filter(e =>
        (e.name || '').toLowerCase().includes((search || '').toLowerCase())
    );

    const displayedData = dataFilter.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    return (

        <>
            <div className='p-5'></div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="center">Img</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Duration</StyledTableCell>
                            <StyledTableCell align="center">Discription</StyledTableCell>
                            <StyledTableCell align="center">PlanId</StyledTableCell>
                            <StyledTableCell align="center">Categories</StyledTableCell>
                            <StyledTableCell align="center">Entity</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedData.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {page * rowsPerPage + index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img className="w-20 h-10 object-cover" src={row.imgUrl} alt="" />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.duration}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {truncate(row.description)}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {getObjectById(row.planID, plans)?.title}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Tooltip
                                        title={row.listCate
                                            .map((element) => getObjectById(element, categories)?.name)
                                            .filter(Boolean) // To avoid null/undefined if not found
                                            .join(", ")
                                        }
                                    >
                                        <IconButton>
                                            <BiSolidCategory />
                                        </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Tooltip
                                        title={
                                            <>
                                                <div className="flex gap-1">
                                                    {row.listActor
                                                        .map((element) =>
                                                            <Avatar alt="Travis Howard" src={getObjectById(element, actors)?.imgUrl} />
                                                        )}
                                                </div>
                                                <div className="flex gap-1">
                                                    {row.listCharacter
                                                        .map((element) =>
                                                            <Avatar alt="Travis Howard" src={getObjectById(element, characters)?.imgUrl} />
                                                        )}
                                                </div>
                                            </>
                                        }
                                    >
                                        <IconButton>
                                            <FaUsers />
                                        </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button onClick={() => handleEdit(row)} variant="contained"><FaEdit /></Button>
                                    <Button onClick={() => handleDeleted(row)} sx={{ marginLeft: "10px" }} variant="contained" color="error"><RiDeleteBin5Fill /></Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={dataFilter.length} // dùng dataFilter để đếm chính xác
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

export default TableMovie;