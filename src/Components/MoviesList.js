import React from "react";
import Movie from "./Movie";
import classes from "./MoviesList.module.css";
const MoviesList=React.memo((props)=>{
    return(
        <ul className={classes['movies-list']}>
            {props.movies.map((movie)=>(
               <Movie
               key={movie.id}
               id={movie.id}
               title={movie.title}
               releaseDate={movie.releaseDate}
               openingText={movie.openingText}
               onDelete={props.onRemove}
               /> 
            )
            )}
        </ul>
    )
})
export default MoviesList;