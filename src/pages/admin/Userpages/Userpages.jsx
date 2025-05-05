import React, { useState } from "react";
import HeaderMain from '../../../components/admin/HeaderMain';
import ModalUserpage from './ModalUserpage';
import TableUserpage from "./TableUserpage";

const inner = {email: "", password: "", role: "", username: "" };
function Userpages(props) {
    const [page, setPage] = useState(0);
    const [userpage,setUserpage] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error,setError] = useState(inner);
    const [search,setSearch] = useState("");
    const handleOpen = () => {
        setOpen(true);
        setUserpage(inner);
        setError(inner);
    }
    const handleClose = () => setOpen(false);

    const validation = () => {
        const newError = {} ;
        newError.email = userpage.emali ? "" : "Please enter email" ;
        newError.password = userpage.password ? "" : "Please enter password" ;
        newError.role = userpage.role ? "" : "Please enter role" ;
        newError.username = userpage.username ? "" : "Please enter username" ;
        setError(newError);
       return Object.values(newError).every(e => e === "") ;
    }
   const handleEdit = (item) => {
       setOpen(true);
       setUserpage(item);
   }
   const handleSearch = (item) => {
          setSearch(item);
          setPage(0);
   }
    return (
        <div>
           <HeaderMain handleSearch={handleSearch}  title={"List Userpages"} name={"Add Userpage"} handleOpen={handleOpen}/>
           <TableUserpage page={page} setPage={setPage} search={search} userpage={userpage} setUserpage={setUserpage} handleEdit={handleEdit} />
           <ModalUserpage error={error} validation={validation}  open={open} handleClose={handleClose} userpage={userpage} setUserpage={setUserpage} />
        </div>
    );
}

export default Userpages;