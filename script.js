const searchform=document.querySelector('form')
const moviecontainer=document.querySelector('.movie-container')
const inputBox=document.querySelector(".inputBox")




// function to fetch api 
// bcoz there can be delay use async
const getMovieInfo = async (movie)=>{
try
{
    const myapiKey="3ade1d26";
    const url=`https://www.omdbapi.com/?apikey=${myapiKey}&t=${movie}`;

    // now convert raw to json file

    const response = await fetch(url);
    if(!response.ok)
    {
        throw new Error("Unable To fetch Data");
        
    }
    const data= await response.json();
    //console.log(data);
    showMoviedata(data);
}
catch{
    showmesssage(`<h2>NO Movie Found!!!</h2>`);
}
}

// now the data to be shown
const showMoviedata= (data)=> {
    moviecontainer.innerHTML="";
    moviecontainer.classList.remove(`noBackground`);
    // use destruct to add elem
    const { Title , imdbRating, Genre,Released,Runtime,Actors,Plot,Poster }=data;

    // now create card elements
    const movieElement= document.createElement('div');
    // to style element
    movieElement.classList.add('movie-info');
    movieElement.innerHTML=`<h2>${Title}</h2>
                            <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;
   
   // for paragraph
    const movieGerneElement= document.createElement('div');
   
   
    movieGerneElement.classList.add('movie-gerne');
                                

     Genre.split(",").forEach(element => {
        const p=document.createElement('p');
        p.innerHTML=element;
        movieGerneElement.appendChild(p);
     });


     movieElement.appendChild(movieGerneElement);

     movieElement.innerHTML+=`<p><strong>Released Date: </strong>${Released}</p>
                            <p><strong>Duration:</strong>${Runtime}</p>
                            <p><strong>Cast: </strong>${Actors}</p>
                            <p><strong>Plot: </strong>${Plot}</p>
                            
     `;
        // TO CREATE POSTER 
        const moviePoster= document.createElement('div');
        moviePoster.classList.add('movie-poster');
        moviePoster.innerHTML=`<img src=${Poster}"/> `
     moviecontainer.appendChild(moviePoster);
     moviecontainer.appendChild(movieElement);
    }

 const showmesssage=(message)=>{
    moviecontainer.innerHTML=` <h2> ${message} </h2>`
    moviecontainer.classList.add('noBackground');
}

const handleform=(e)=>{
    e.preventDefault();
    const moviename= inputBox.value.trim();
     if(moviename !== '')
     {  showmesssage("Fetching Movie Info...")
        getMovieInfo(moviename);
     }
     else
     showmesssage(`<h2>ENTER THE MOVIE NAME</h2>`);
 
}

// add event listerner to serach form
searchform.addEventListener('submit',handleform);

