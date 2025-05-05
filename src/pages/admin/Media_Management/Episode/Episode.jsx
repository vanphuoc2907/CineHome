import React, { useState }  from 'react';
import HeaderMain from '../../../../components/admin/HeaderMain';
import ModalEpisode from './ModalEpisode';
import TableEpisode from "./TableEpisode";
const inner = {episodesNumber :"", episodeURL :"", idMovie :"" };
function Episodes(props) {
    const [page, setPage] = useState(0);
    const [episode,setEpisode] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const [ search, setSearch] = useState("");
    const handleOpen = () => {
        setOpen(true);
        setEpisode(inner);
        setError(inner);
    }
    const handleClose = () => setOpen(false);
    const validation = () => {
        const newError = {};
        newError.episodesNumber = episode.episodesNumber ? "" : "please enter episodesNumber" ;
        newError.episodeURL = episode.episodeURL ? "" : "please enter episodeURL" ;
        newError.idMovie = episode.idMovie ? "" : "please enter idMovie" ;
        setError(newError);
       return Object.values(newError).every(e => e === "");
    }
    const handleEdit = (item) => {
        setOpen(true);
        setEpisode(item);
    }
    const handleSearch = (item) => {
        setSearch(item);
        setPage(0);
    }
    return (
        <div>
            <HeaderMain handleSearch={handleSearch} title={"List Episodes"} name={"Add Episode"} handleOpen={handleOpen}/>
            <TableEpisode page={page} setPage={setPage} search={search} episode={episode} setEpisode={setEpisode} handleEdit={handleEdit} />
            <ModalEpisode error={error} validation={validation} open={open} handleClose={handleClose} episode={episode} setEpisode={setEpisode}/> 
        </div>
    );
}

export default Episodes;
