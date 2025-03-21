import React, { useContext, useState } from 'react';
import HeaderMain from '../../../../components/admin/HeaderMain';
import ModalMovie from './ModalMovie';
import { ContextCategories } from "../../../../context/CategoryProvider";
import { ContextCharacters } from "../../../../context/CharacterProvider";
import { ContextActors } from "../../../../context/ActorProvider";
import logo from "../../../../assets/images/logo.png";
import { addDocument, updateDocument } from '../../../../services/firebaseService';
import { useNotification } from "../../../../context/NotificationProvider";
import ModalChoose from './ModalChoose';
import TableMovie from './TableMovie';

const inner = {
    name: "",
    description: "",
    duration: "",
    authorID: "",
    planID: "",
    listCate: [],
    listActor: [],
    listCharacter: [],
    rentalPrice: 0,
    likesCount: 0,
    viewsCount: 0,
    date: new Date(),
    imgUrl: logo
};
const innerError = {
    name: "",
    description: "",
    duration: "",
    authorID: "",
    planID: "",
    listCate: [],
}
function Movies(props) {
     const [page, setPage] = useState(0);
    const [movie, setMovie] = useState(inner);
    const [errors, setErrors] = useState(innerError);
    const categories = useContext(ContextCategories);
    const [search,setSearch] = useState("");
    const characters = useContext(ContextCharacters);
    const actors = useContext(ContextActors);
    const [open, setOpen] = useState(false);
    const [openChoose, setOpenChoose] = useState(false);
    const [dataChoose, setDataChoose] = useState([]);
    const [chooseType, setChooseType] = useState("");
    const showNotification = useNotification();
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
        setMovie(inner);
        setErrors(innerError);
    }
    const handleChoose = (type) => {
        setChooseType(type);
        switch (type) {
            case "categories":
                setDataChoose(categories);
                break;
            case "actors":
                setDataChoose(actors);
                break;
            case "characters":
                setDataChoose(characters);
                break;
            default:
                setDataChoose([]);
        }
        setOpenChoose(true);
    };

    const toggleSelection = (list, item) => {
        return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    };

    const getSelectedItems = () => {
        switch (chooseType) {
            case "categories":
                return movie.listCate;
            case "actors":
                return movie.listActor;
            case "characters":
                return movie.listCharacter;
            default:
                return [];
        }
    };

    const handleSelect = (item) => {
        setMovie(prevData => {
            let updatedList;
            switch (chooseType) {
                case "categories":
                    updatedList = toggleSelection(prevData.listCate, item);
                    return { ...prevData, listCate: updatedList };
                case "actors":
                    updatedList = toggleSelection(prevData.listActor, item);
                    return { ...prevData, listActor: updatedList };
                case "characters":
                    updatedList = toggleSelection(prevData.listCharacter, item);
                    return { ...prevData, listCharacter: updatedList };
                default:
                    return prevData;
            }
        });
    };
    const validation = () => {
        const newError = {
            ...innerError, // Khởi tạo trạng thái lỗi dựa trên cấu trúc mẫu
        };

        // Kiểm tra từng trường với điều kiện cụ thể
        newError.name = movie.name?.trim()
            ? ""
            : "Vui lòng nhập tên phim (name).";

        newError.description = movie.description?.trim()
            ? ""
            : "Vui lòng nhập mô tả (description).";

        newError.duration = movie.duration?.trim() && !isNaN(movie.duration)
            ? ""
            : "Vui lòng nhập thời lượng hợp lệ (duration).";

        newError.authorID = movie.authorID
            ? ""
            : "Vui lòng chọn Author (authorID).";

        newError.planID = movie.planID
            ? ""
            : "Vui lòng chọn Plan (planID).";

        newError.listCate = Array.isArray(movie.listCate) && movie.listCate.length > 0
            ? ""
            : "Vui lòng thêm ít nhất một Category (listCate).";

        // Cập nhật trạng thái lỗi
        setErrors(newError);

        // Debug lỗi (nếu cần)
        console.log("Validation Errors:", newError);

        // Trả về `true` nếu tất cả trường đều hợp lệ
        return Object.values(newError).every((error) => error === "");
    };

    const handleSubmit = async () => {
        if (!validation()) return;
        if (movie.id) {
            await updateDocument('Movies', movie);
            showNotification('Movie updated successfully!', "info");
        } else {

            console.log("BFDBDF");
            await addDocument("Movies", movie);
            showNotification('Movie add successfully!', "success");

        };
        handleClose();
    }

    const handleEdit = (item) => {
        setOpen(true);
        setMovie(item);
    }
    const handleSearch = (item) => {
           setSearch(item);
           setPage(0);
    }
    return (
        <div>
            <HeaderMain handleSearch={handleSearch} title={"List Movies"} name={"Add Movie"} handleOpen={handleOpen} open={open} />
            <TableMovie setMovie={setMovie} movie={movie} handleEdit={handleEdit} search={search} setPage={setPage} page={page} />
            <ModalMovie handleSubmit={handleSubmit} handleChoose={handleChoose} errors={errors} open={open} handleSelect={handleSelect} handleClose={handleClose} movie={movie} setMovie={setMovie} />
            <ModalChoose handleSelect={handleSelect} openChoose={openChoose} dataChoose={dataChoose} setOpenChoose={setOpenChoose} chooseType={chooseType} selectedItems={getSelectedItems()} />
        </div>
    );
}

export default Movies;