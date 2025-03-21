import React, { useState }  from 'react';
import HeaderMain from '../../../../components/admin/HeaderMain';
import TableTrailer from './TableTrailer';
import ModalTrailer from './ModalTrailer';

const inner = {movieId :"", trailerURL :"", };
function Trailers(props) {
    const [page, setPage] = useState(0);
    const [trailer,setTrailer] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const [ search, setSearch] = useState("");
    const handleOpen = () => {
        setOpen(true);
        setTrailer(inner);
        setError(inner);
    }
    const handleClose = () => setOpen(false);
    const validation = () => {
        const newError = {};
        newError.movieId = trailer.movieId ? "" : "please enter movieId" ;
        newError.trailerURL = trailer.trailerURL ? "" : "please enter trailerURL" ;
        setError(newError);
       return Object.values(newError).every(e => e === "");
    }
    const handleEdit = (item) => {
        setOpen(true);
        setTrailer(item);
    }
    const handleSearch = (item) => {
        setSearch(item);
        setPage(0);
    }
    return (
        <div>
            <HeaderMain handleSearch={handleSearch} title={"List Trailers"} name={"Add Trailer"} handleOpen={handleOpen}/>
            <TableTrailer page={page} setPage={setPage} search={search} trailer={trailer} setTrailer={setTrailer} handleEdit={handleEdit} />
            <ModalTrailer error={error} validation={validation} open={open} handleClose={handleClose} trailer={trailer} setTrailer={setTrailer}/> 
        </div>
    );
}

export default Trailers;