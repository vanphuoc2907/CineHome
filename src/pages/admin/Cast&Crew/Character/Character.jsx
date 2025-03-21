import React, { useState }  from 'react';
import HeaderMain from '../../../../components/admin/HeaderMain';
import ModalCharacter from './ModalCharacter';
import TableCharacter from "./TableCharacter";
import { logo } from '../../../../utils/Constants';
const inner = {name : "", description: "", imgUrl : logo };
function Characters(props) {
    const [page, setPage] = useState(0);
    const [character,setCharacter] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const [ search, setSearch] = useState("");
    const handleOpen = () => {
        setOpen(true);
        setCharacter(inner);
        setError(inner);
    }
    const handleClose = () => setOpen(false);
    const validation = () => {
        const newError = {};
        newError.name = character.name ? "" : "please enter name" ;
        newError.description = character.description ? "" : "please enter description" ;
        setError(newError);
       return Object.values(newError).every(e => e === "");
    }
    const handleEdit = (item) => {
        setOpen(true);
        setCharacter(item);
    }
    const handleSearch = (item) => {
        setSearch(item);
        setPage(0);
    }
    return (
        <div>
            <HeaderMain handleSearch={handleSearch} title={"List Characters"} name={"Add Character"} handleOpen={handleOpen}/>
            <TableCharacter page={page} setPage={setPage} search={search} character={character} setCharacter={setCharacter} handleEdit={handleEdit} />
            <ModalCharacter error={error} validation={validation} open={open} handleClose={handleClose} character={character} setCharacter={setCharacter}/> 
        </div>
    );
}

export default Characters;