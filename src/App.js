import React, { useRef, useState } from 'react';
import './App.css';
import MoviesList from './Components/MoviesList';
function App() {
  const[movies,setMovies]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[error,setError]=useState(null);
 const retryRef=useRef(true);
  //use of async await because of then blocks
   //helper function for delay
  const delay=(ms)=>new Promise((resolve)=>setTimeout(resolve,ms));
  const fetchMoviesHandler=async()=>{
    setIsLoading(true);
    //here we set error null because when we click on button if any error left it become null
    setError(null);
    let success=false;
    retryRef.current=true
    while(!success && retryRef){
    try{
    //here i use ghibli api
    const response=await fetch("https://ghibliapi.vercel.app/films")
    if(!response.ok){
      throw new Error('Something went wrong ....Retrying');
    }
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
           success=true;
        }
        catch(error){
         setError(error.message);
         if(retryRef){
         await delay(5000);
         }
      }
    }
       setIsLoading(false);
    }
    const cancelRetryHandler=()=>{
       retryRef.current=false;
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
