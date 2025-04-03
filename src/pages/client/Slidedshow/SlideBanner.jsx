import React, { useContext, useState } from "react";
import { IconButton ,Button } from "@mui/material";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import "./SlideBanner.css"
import { getMovieRent } from "../../../utils/FunctionContants";
import { ContextMovies } from "../../../context/MovieProvider";
import { ContextPlans } from "../../../context/PlanProvider";
const SlideBanner = () => {
    const plans = useContext(ContextPlans);
    const movies = useContext(ContextMovies);
 
    const handleNext = () => {
        let items = document.querySelectorAll('.slide-banner .item')
        document.querySelector('.slide').appendChild(items[0])
    };

    const handlePrev = () => {
        let items = document.querySelectorAll('.slide-banner .item')
        document.querySelector('.slide').prepend(items[items.length - 1])
    };

    return (
        <div className="slide-banner">
            <div className="container">
                <div className="slide">
                    {getMovieRent(movies,plans,4).map((item, index) => (
                        <div
                            key={index}
                            className="item animate__animated animate__backInDown"
                            style={{
                                backgroundImage: `url(${item.imgUrl})`,
                            }}
                        >
                            <div className="content">
                                <div className="name">{item.name}</div>
                                <div className="des">{item.des}</div>
                                <Button variant="contained">See More</Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="changeButton">
                    <Button variant="contained" className="prev " onClick={handlePrev}>
                        <MdArrowBack />
                    </Button>

                    <Button variant="contained" className="next" sx={{marginLeft:"10px"}} onClick={handleNext}>
                        <MdArrowForward />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SlideBanner;