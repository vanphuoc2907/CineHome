import React, { useState }  from 'react';
import HeaderMain from '../../../../components/admin/HeaderMain';
import ModalAuthor from './ModalAuthor';
import TableAuthor from "./TableAuthor";


const inner = {name : "", description: ""};
function Authors(props) {
    const [page, setPage] = useState(0);
    const [author,setAuthor] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error,setError] = useState(inner);
    const [search,setSearch] = useState("");
    const handleOpen = () => {
        setOpen(true);
        setAuthor(inner);
        setError(inner);
    }
    const handleClose = () => setOpen(false);
    const validation = () => {
        const newError = {} ;
        newError.name = author.name ? "" : "Vui lòng nhập name" ;
        newError.description = author.description ? "" : "Vui lòng nhập mô tả" ;
        setError(newError);
       return Object.values(newError).every(e => e === "") ;
    }
    const handleEdit = (item) => {
        setOpen(true);
        setAuthor(item);
    }
    const handleSearch = (item) => {
        setSearch(item);
        setPage(0);
    }
    return (
        <div>
            <HeaderMain handleSearch={handleSearch} title={"List Authors"} name={"Add Author"} handleOpen={handleOpen}/>
            <TableAuthor page={page} setPage={setPage} search={search} author={author} setAuthor={setAuthor} handleEdit={handleEdit}/>
            <ModalAuthor error={error} validation={validation}  open={open} handleClose={handleClose} author={author} setAuthor={setAuthor}/> 
        </div>
    );
}

export default Authors;
