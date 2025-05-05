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
            <SlideMovie data={getMovieRent(movies,plans,4)} title={"Phim Hành ĐỘng"}/>
            <SlideMovie data={getMovieRent(movies,plans,4)} title={"Phim Mới"}/>
        </div>
    );
}

export default MovieRent;