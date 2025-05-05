import React, { useContext, useEffect, useState } from 'react';
import { ContextEpisodes } from '../../../context/EpisodeProvider';
import { useParams } from 'react-router-dom';
import { filterById, getObjectById } from '../../../utils/FunctionContants';
import { Button } from '@mui/material';
import { ContextMovies } from '../../../context/MovieProvider';
import SlideMovie from '../Slidedshow/SlideMovie';
import { ContextTrailers } from '../../../context/TrailerProvider';
function PlayTrailer(props) {
    const { id } = useParams();
    const trailers = useContext(ContextTrailers);
    const movies = useContext(ContextMovies);
    const [playTrailer, setPlayTrailer] = useState({});

    useEffect(() => {
        const listTrailer = filterById(trailers,id,"idMovie");
        setPlayTrailer(listTrailer[0]);
    }, [trailers, id]);

    const movieByActorOrCharacter = () => {
        // Lấy bộ phim dựa vào ID
        const selectedMovie = getObjectById(id, movies);
        if (!selectedMovie) return [];
      
        return movies.filter((movie) =>
          movie.id !== selectedMovie.id &&
          (
            // Kiểm tra nếu có diễn viên trùng nhau
            movie.listActor.some((actor) => selectedMovie.listActor.includes(actor)) ||
            
            // Kiểm tra nếu có thể loại trùng nhau
            movie.listCate.some((cate) => selectedMovie.listCate.includes(cate))
          )
        );
      };

    return (
        <div className='p-16'>
            <div className='w-[80vw] m-auto'>
                <iframe
                    className='h-[80vh] m-auto w-full'
                    src={playTrailer?.trailerURL}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <SlideMovie title={"Phim liên quan"} data={movieByActorOrCharacter()} />
        </div>
    );
}

export default PlayTrailer;