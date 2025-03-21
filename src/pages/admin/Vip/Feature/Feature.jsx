import React, { useState }  from 'react';
import HeaderMain from '../../../../components/admin/HeaderMain';
import ModalFeature from './ModalFeature';
import TableFeature from "./TableFeature";
const inner = { planId:"", text:"", available:"yes"};
function Features(props) {
    const [page, setPage] = useState(0);
    const [Feature,setFeature] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const [ search, setSearch] = useState("");
    const handleOpen = () => {
        setOpen(true);
        setFeature(inner);
        setError(inner);
    }
    const handleClose = () => setOpen(false);

    const validation = () => {
        const newError = {};
        newError.planId = Feature.planId ? "" : "please enter planId" ;
        newError.text =  Feature.text ? "" : "please enter text " ;
        newError.available =  Feature.available  ? "" : "please enter available " ;
        setError(newError);
       return Object.values(newError).every(e => e == "");
    }
    const handleEdit = (item) => {
        setOpen(true);
        setFeature(item);
    }
    const handleSearch = (item) => {
        setSearch(item);
        setPage(0);
    }
    return (
        <div>
            <HeaderMain handleSearch={handleSearch} title={"List features"} name={"Add Feature"} handleOpen={handleOpen}/>
            <TableFeature page={page} setPage={setPage} search={search} Feature={Feature} setFeature={setFeature} handleEdit={handleEdit} />
            <ModalFeature error={error} validation={validation} open={open} handleClose={handleClose} Feature={Feature} setFeature={setFeature} /> 
        </div>
    );
}

export default Features;