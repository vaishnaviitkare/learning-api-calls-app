import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import MoviesList from './Components/MoviesList';
import axios from 'axios';
function App() {
  const[movies,setMovies]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[error,setError]=useState(null);
 const retryRef=useRef(true);
  //use of async await because of then blocks
   //helper function for delay
  const delay=(ms)=>new Promise((resolve)=>setTimeout(resolve,ms));
  const fetchMoviesHandler=useCallback(async()=>{
    setIsLoading(true);
    //here we set error null because when we click on button if any error left it become null
    setError(null);
    let success=false;
    retryRef.current=true
    while(!success && retryRef.current){
    try{
    //here i use ghibli api
    const response=await fetch("https://ghibliapi.vercel.app/films")
    if(!response.ok){
      throw new Error('Something went wrong ....Retrying');
    }
    const data=await response.json();//converted json text to js
          //here the data we get has different key name so we store this as per our name//
          const transformedmovies=data
          .slice(0, 5) // 👈 take only first 5 movies
          .map((movieData)=>{
            return{
              id:movieData.id,
              title:movieData.title,
              openingText:movieData.description,
              releaseDate:movieData.release_date
            
            }
            
          })
          for (const movie of transformedmovies) {
             if(!retryRef.current) return;//stop if cancelled
            await axios.post(`https://crudcrud.com/api/2b0dadb0fa224ace91c8d9d44bf093bf/movies`,movie);
            }
           setMovies(transformedmovies);
           success = true;
        }
        catch(error){
         setError(error.message);
         if(retryRef.current){
         await delay(5000);
         }
      }
    }
       setIsLoading(false);
    },[])

    useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

    const cancelRetryHandler=useCallback(()=>{
       retryRef.current=false;
       setIsLoading(false);
    },[])

  return (
 <React.Fragment>
  <div className={"movies-body"}>
  <section className={"fetchmovies"}>
    <button onClick={fetchMoviesHandler}>Fetch Movies</button>
  </section>
  <section className={"display-movies"}>
   {!isLoading && movies.length>0 && <MoviesList movies={movies}/>}
   {!isLoading && movies.length==0 && !error && <p className={"nofound"}>Found no movies</p>}
   {!isLoading && error && <p className={'error'}>{error}</p>}
   {isLoading && 
   (<div className={"loading-text"}>
    <p>Loading...</p>
    <button onClick={cancelRetryHandler}>Cancel retrying</button>
    </div>)}
  
    </section>
  </div>
 </React.Fragment>
  );
}

export default App;
