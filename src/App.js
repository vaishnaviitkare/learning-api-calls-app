import React, { useState } from 'react';
import './App.css';
import MoviesList from './Components/MoviesList';
function App() {
  const[movies,setMovies]=useState([]);
  //use of async await because of then blocks
   const fetchMoviesHandler=async()=>{
    //here i use ghibli api
    const response=await fetch("https://ghibliapi.vercel.app/films")
    const data=await response.json();//converted json text to js
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
