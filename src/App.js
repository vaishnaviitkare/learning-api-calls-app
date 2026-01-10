import React, { useState } from 'react';
import './App.css';
import MoviesList from './Components/MoviesList';
function App() {
  const[movies,setMovies]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  //use of async await because of then blocks
   const fetchMoviesHandler=async()=>{
    setIsLoading(true);
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
            setIsLoading(false);
        }
  return (
 <React.Fragment>
  <div className={"movies-body"}>
  <section className={"fetchmovies"}>
    <button onClick={fetchMoviesHandler}>Fetch Movies</button>
  </section>
  <section className={"display-movies"}>
   {!isLoading && movies.length>0 && <MoviesList movies={movies}/>}
   {!isLoading && movies.length==0 && <p>Found no movies</p>}
   {isLoading && <p>Loading...</p>}
  </section>
  </div>
 </React.Fragment>
  );
}

export default App;
