const fetchDataIndexResult = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {// the params should be in the right 
                 // order 
            apikey: '4f6552da',
            s: searchTerm.trim()
           
        }
    });
    if(response.data.Error) {
      // if(resultsWrapper) resultsWrapper.classList.add('zeroPadding');
        return []; 
    }
    //console.log(response.data); 
    //resultsWrapper.classList.remove('zeroPadding');
    return response.data.Search; // return just the data 
                                // that I need
}
const fetchDataShowResult = async (ID) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '4f6552da', 
            i:ID
        
        }
    });
    return response.data;
}


const onInput =  debouce(async event => {
   const movies= await  fetchDataIndexResult(event.target.value); 
   if(!movies.length) {
        dropdown.classList.remove('is-active');
        return ;
    }
   resultsWrapper.innerHTML='';
   dropdown.classList.add('is-active'); 
   for(let movie of movies){
    const anchor = document.createElement('a'); 
  //  const divider = document.createElement('hr'); 
  //  divider.classList.add('dropdown-divider'); 
    anchor.classList.add('dropdown-item'); 
    const imgSrc =  movie.Poster === 'N/A' ? '' : movie.Poster; 
    anchor.innerHTML = `
    <img  src = "${imgSrc}"/>
    <span>${movie.Title}</span>
    `; 

    anchor.addEventListener('click',() =>{
        dropdown.classList.remove('is-active');
        input.value = movie.Title; 
        onMovieSelect(movie);
    });
    resultsWrapper.appendChild(anchor); 
   // resultsWrapper.appendChild(divider); 
   }
   
    }, 500); 



const root = document.querySelector('.autocomplete'); 


root.innerHTML =`
<label><b>Search For a Movie<b>
    <input class="input" id="search_bar" autocomplete="off"/>
</label>
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
</div>
`; 
const MovieArticle = document.querySelector('#summary');
const dropdown = document.querySelector('.dropdown'); 
const resultsWrapper = document.querySelector('.results'); 
const input = document.querySelector('#search_bar'); 


input.addEventListener('input',onInput); 

document.addEventListener('click', event =>{
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');

    }
}); 

const onMovieSelect = async movie => {
   // console.log(movie); 
    const movieAllData = await fetchDataShowResult(movie.imdbID);
    //console.log(movieAllData);
    MovieArticle.innerHTML = movieTemplate(movieAllData);

}

const movieTemplate = (movieDetail) =>{
    return `
    <article class="media">
        <figure class="media_left">
            <p class="image">
                <img src="${movieDetail.Poster}"/>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article class="notification is primary">
        <p class="title">${movieDetail.Awards}</p>
        <p lcass="subtitle">Awards</p>
    </article>
    
    <article class="notification is primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p lcass="subtitle">Box Office</p>
    </article>
    
    <article class="notification is primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p lcass="subtitle">Metascore</p>
    </article>
    
    <article class="notification is primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p lcass="subtitle">IMDB Rating</p>
    </article>
    
    <article class="notification is primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p lcass="subtitle">IMDB Votes</p>
    </article>
    `;
}