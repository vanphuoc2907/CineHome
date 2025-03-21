import React, { useState }  from 'react';
import HeaderMain from '../../../../components/admin/HeaderMain';
import ModalPackage from './ModalPackage';
import TablePackage from "./TablePackage";
const inner = { discount:"", planId:"", time:""};
function Packages(props) {
    const [page, setPage] = useState(0);
    const [Package,setPackage] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const [ search, setSearch] = useState("");
    const handleOpen = () => {
        setOpen(true);
        setPackage(inner);
        setError(inner);
    }
    const handleClose = () => setOpen(false);

    const validation = () => {
        const newError = {};
        newError.discount = Package.discount ? "" : "please enter discount" ;
        newError.planId =  Package.planId  ? "" : "please enter planId " ;
        newError.time =  Package.time  ? "" : "please enter time " ;
        setError(newError);
       return Object.values(newError).every(e => e == "");
    }
    const handleEdit = (item) => {
        setOpen(true);
        setPackage(item);
    }
    const handleSearch = (item) => {
        setSearch(item);
        setPage(0);
    }
    return (
        <div>
            <HeaderMain handleSearch={handleSearch} title={"List packages"} name={"Add Package"} handleOpen={handleOpen}/>
            <TablePackage page={page} setPage={setPage} search={search} Package={Package} setPackage={setPackage} handleEdit={handleEdit} />
            <ModalPackage error={error} validation={validation} open={open} handleClose={handleClose} Package={Package} setPackage={setPackage} /> 
        </div>
    );
}

export default Packages;