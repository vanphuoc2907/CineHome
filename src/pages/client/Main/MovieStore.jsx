import React, { useContext } from 'react';
import SlideStore from '../Slidedshow/SlideStore';
import SlideMovie from '../Slidedshow/SlideMovie';
import { ContextMovies } from "../../../context/MovieProvider"
import SlideVip from '../Slidedshow/SlideVip';
import { ContextPlans } from '../../../context/PlanProvider';
import { getMovieRent } from '../../../utils/FunctionContants';
import SlideAdvertisement from '../Slidedshow/SlideAdvertisement';
function MovieStore(props) {
    const data = useContext(ContextMovies);
    const plans = useContext(ContextPlans);
    return (
        <div>
            <SlideStore data={getMovieRent(data,plans,2)}/>
            <SlideMovie data={data} title={"Phim Mới"}/>
            <SlideMovie data={data} title={"Phim Ngay"}/>
            <SlideVip data={getMovieRent(data,plans,3)} title={"Phim Thinh Hành"}/>
            <SlideMovie data={data} title={"Luật Chơi Giới Tài Phiệt"}/>
             <SlideAdvertisement />
            <SlideVip data={getMovieRent(data,plans,4)} title={"Phim Siêu vip"}/>
        </div>
    );
}

export default MovieStore;