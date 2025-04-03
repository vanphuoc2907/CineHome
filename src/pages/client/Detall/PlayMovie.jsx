import React, { useContext, useEffect, useState } from 'react';
import { ContextEpisodes } from '../../../context/EpisodeProvider';
import { useParams } from 'react-router-dom';
import { filterById, getObjectById } from '../../../utils/FunctionContants';
import { Button } from '@mui/material';
import { ContextMovies } from '../../../context/MovieProvider';
import SlideMovie from '../Slidedshow/SlideMovie';
import { ContextCategories } from '../../../context/CategoryProvider';
function PlayMovie(props) {
    const { id } = useParams();
    const episodes = useContext(ContextEpisodes);
    const movies = useContext(ContextMovies);
    const [listEpisode, setListEpisode] = useState([]);
    const [playMovie, setPlayMovie] = useState({});

    useEffect(() => {
        const list = filterById(episodes, id, "idMovie");
        setListEpisode(list);
        setPlayMovie(list[0]);
    }, [episodes, id]);

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
                    src={playMovie?.episodeURL}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>

                <div className='flex gap-3 mt-5'>
                    {
                        listEpisode.map(e => (
                            <Button onClick={() => setPlayMovie(e)} variant="contained" color={playMovie.episodesNumber == e.episodesNumber ? "error" : "primary"}>{e.episodesNumber}</Button>
                        ))
                    }
                </div>
            </div>
            <SlideMovie title={"Phim lien quan"} data={movieByActorOrCharacter()} />
        </div>
    );
}

export default PlayMovie;