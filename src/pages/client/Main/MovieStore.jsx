import React, { useContext } from 'react';
import SlideStore from '../Slidedshow/SlideStore';
import SlideMovie from '../Slidedshow/SlideMovie';
import { ContextMovies } from "../../../context/MovieProvider"
function MovieStore(props) {
    const data = useContext(ContextMovies);
    return (
        <div>
            <SlideStore/>
            <SlideMovie data={data} title={"Phim Moi"}/>
            <SlideMovie data={data} title={"Phim Ngay"}/>
            <SlideMovie data={data} title={"Phim Thinh hanh"}/>
            <SlideMovie data={data} title={"Luật Chơi Giới Tài Phiệt"}/>
            <SlideMovie data={data} title={"Phim Moi"}/>
        </div>
    );
}

export default MovieStore;