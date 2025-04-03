import React, { useContext } from 'react';
import SlideHome from '../Slidedshow/SlideHome';
import { ContextPlans } from '../../../context/PlanProvider';
import { ContextMovies } from '../../../context/MovieProvider';
import { getMovieRent } from '../../../utils/FunctionContants';
import SlideMovie from '../Slidedshow/SlideMovie';

function MovieRent(props) {
    const plans = useContext(ContextPlans);
    const movies = useContext(ContextMovies);
    return (
        <div>
            <SlideHome data={getMovieRent(movies,plans,4).slice(0,10)}/>
            <SlideMovie data={getMovieRent(movies,plans,4)} title={"Luật Chơi Giới Tài Phiệt"}/>
            <SlideMovie data={getMovieRent(movies,plans,4)} title={"Phim Moi"}/>
        </div>
    );
}

export default MovieRent;