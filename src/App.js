import React, { useState } from 'react';
import './App.css';
import MoviesList from './Components/MoviesList';
function App() {
  const[movies,setMovies]=useState([]);
   const fetchMoviesHandler=()=>{
    //here i use ghibli api
    fetch("https://ghibliapi.vercel.app/films")
         .then((response)=>{
           return response.json();//converted json text to js
         })
         .then((data)=>{
          //here the data we get has different key name so we store this as per our name//
          const transformedmovies=data.map((movieData)=>{
            return{
              id:movieData.id,
              title:movieData.title,
              openingText:movieData.description,
              releaseDate:movieData.release_date
            
            }
            
          })
           setMovies(transformedmovies);
         })
        
        }
  return (
 <React.Fragment>
  <div className={"movies-body"}>
  <section className={"fetchmovies"}>
    <button onClick={fetchMoviesHandler}>Fetch Movies</button>
  </section>
  <section className={"display-movies"}>
    <MoviesList movies={movies}/>
  </section>
  </div>
 </React.Fragment>
  );
}

export default App;
