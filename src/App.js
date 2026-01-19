import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import MoviesList from './Components/MoviesList';
import axios from 'axios';
import AddMovie from './Components/AddMovie';
function App() {
  const[movies,setMovies]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[error,setError]=useState(null);
  //use of async await because of then blocks
  const fetchMoviesHandler=useCallback(async()=>{
    setIsLoading(true);
    //here we set error null because when we click on button if any error left it become null
    setError(null);
    let success=false;

    while(!success){
    try{
    //here i use firebase api
    const response=await fetch("https://react-http-5e057-default-rtdb.firebaseio.com/movies.json");
    if(!response.ok){
      throw new Error('Something went wrong ....Retrying');
    }
    const data=await response.json();//converted json text to js
            //data is object 
            const loadedMovies=[];
            for(const key in data){
              loadedMovies.push({
                id:key,
                title:data[key].title,
                openingText:data[key].openingText,
                releaseDate:data[key].releaseDate,
              })
            }
           setMovies(loadedMovies);
           success = true;
        }
        catch(error){
         setError(error.message);
      }
    }
       setIsLoading(false);
    },[])
/*
    useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
*/
const addMovieHandler=async (movie)=>{
  try{
  const response=await fetch("https://react-http-5e057-default-rtdb.firebaseio.com/movies.json",{
    method:'POST',
    body:JSON.stringify(movie),
    headers:{
      'Content-Type':'application/json'
    }
  })
  if(!response.ok){
    throw new Error("failed to add movie");
  }
}catch(error){
  setError(error.message);
}
}
const removeHandler=async(id)=>{
  try{
     const response=await fetch(`https://react-http-5e057-default-rtdb.firebaseio.com/movies/${id}.json`,{
      method:'DELETE'
     })
     if(!response.ok){
    throw new Error("failed to delete movie");
  }
  setMovies((prevMovie)=>
  prevMovie.filter((movie)=>movie.id!==id)
  )
  }catch(error){
   setError(error.message);
  }
}
let content = <p className="nofound">Found no movies</p>;

if (isLoading) {
  content = <p>Loading...</p>;
} else if (error) {
  content = <p className="error">{error}</p>;
} else if (movies.length > 0) {
  content = <MoviesList movies={movies} onRemove={removeHandler}/>;
}
  return (
 <React.Fragment>
  <div className={"movies-body"}>
  <section>
    <AddMovie onAddMovie={addMovieHandler}/>
  </section>
  <section className={"fetchmovies"}>
    <button onClick={fetchMoviesHandler}>Fetch Movies</button>
  </section>
  <section className={"display-movies"}>
  {content}
  </section>
  </div>
 </React.Fragment>
  );
}

export default App;
