import React, { useState } from "react";
import HeaderMain from '../../../components/admin/HeaderMain';
import ModalCategory from './ModalCategory';
import TableCategory from "./TableCategory";

const inner = {name : "", description: ""};
function Categories(props) {
    const [page, setPage] = useState(0);
    const [category,setCategory] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error,setError] = useState(inner);
    const [search,setSearch] = useState("");
    const handleOpen = () => {
        setOpen(true);
        setCategory(inner);
        setError(inner);
    }
    const handleClose = () => setOpen(false);

    const validation = () => {
        const newError = {} ;
        newError.name = category.name ? "" : "Please enter name" ;
        newError.description = category.description ? "" : "Please enter description" ;
        setError(newError);
       return Object.values(newError).every(e => e === "") ;
    }
   const handleEdit = (item) => {
       setOpen(true);
       setCategory(item);
   }
   const handleSearch = (item) => {
          setSearch(item);
          setPage(0);
   }
    return (
        <div>
           <HeaderMain handleSearch={handleSearch}  title={"List Categories"} name={"Add Category"} handleOpen={handleOpen}/>
           <TableCategory page={page} setPage={setPage} search={search} category={category} setCategory={setCategory} handleEdit={handleEdit} />
           <ModalCategory error={error} validation={validation}  open={open} handleClose={handleClose} category={category} setCategory={setCategory} />
        </div>
    );
}

export default Categories;