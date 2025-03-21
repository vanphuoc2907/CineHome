import React, { useState }  from 'react';
import HeaderMain from '../../../../components/admin/HeaderMain';
import ModalActor from './ModalActor';
import TableActor from "./TableActor";

const inner = {name : "", description: ""};
function Actors(props) {
    const [page, setPage] = useState(0);
    const [actor,setActor] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const [ search, setSearch] = useState("");
    const handleOpen = () => {
        setOpen(true);
        setActor(inner);
        setError(inner);
    }
    const handleClose = () => setOpen(false);
    const validation = () => {
        const newError = {};
        newError.name = actor.name ? "" : "please enter name" ;
        newError.description = actor.description ? "" : "please enter description" ;
        setError(newError);
       return Object.values(newError).every(e => e === "");
    }
    const handleEdit = (item) => {
        setOpen(true);
        setActor(item);
    }
    const handleSearch = (item) => {
        setSearch(item);
        setPage(0);
    }
    return (
        <div>
            <HeaderMain handleSearch={handleSearch} title={"List Actors"} name={"Add Actor"} handleOpen={handleOpen}/>
            <TableActor page={page} setPage={setPage} search={search} actor={actor} setActor={setActor} handleEdit={handleEdit} />
            <ModalActor error={error} validation={validation} open={open} handleClose={handleClose} actor={actor} setActor={setActor}/> 
        </div>
    );
}

export default Actors;