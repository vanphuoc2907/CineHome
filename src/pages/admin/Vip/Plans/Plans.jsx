import React, { useState }  from 'react';
import HeaderMain from '../../../../components/admin/HeaderMain';
import ModalPlan from './ModalPlan';
import TablePlan from "./TablePlan";
const inner = { level:"", title:"", pricePerMonth:""};
function Plans(props) {
    const [page, setPage] = useState(0);
    const [plan,setPlan] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const [ search, setSearch] = useState("");
    const handleOpen = () => {
        setOpen(true);
        setPlan(inner);
        setError(inner);
    }
    const handleClose = () => setOpen(false);

    const validation = () => {
        const newError = {};
        newError.level = plan.level ? "" : "please enter level" ;
        newError.title = plan.title  ? "" : "please enter title " ;
        newError.pricePerMonth = plan.pricePerMonth  ? "" : "please enter pricePerMonth " ;
        setError(newError);
       return Object.values(newError).every(e => e == "");
    }
    const handleEdit = (item) => {
        setOpen(true);
        setPlan(item);
    }
    const handleSearch = (item) => {
        setSearch(item);
        setPage(0);
    }
    return (
        <div>
            <HeaderMain handleSearch={handleSearch} title={"List plans"} name={"Add Plan"} handleOpen={handleOpen}/>
            <TablePlan page={page} setPage={setPage} search={search} plan={plan} setPlan={setPlan} handleEdit={handleEdit} />
            <ModalPlan error={error} validation={validation} open={open} handleClose={handleClose} plan={plan} setPlan={setPlan}/> 
        </div>
    );
}

export default Plans;