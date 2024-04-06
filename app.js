// non-reusable code specific for 
// our project :
// *****************************

 createAutoComplete({
    root : document.querySelector('.autocomplete'),
    renderOption(movie){
        const imgSrc =  movie.Poster === 'N/A' ? '' : movie.Poster; 
        return `
        <img  src = "${imgSrc}"/>
        <span>${movie.Title} (${movie.Year})</span>

        `;  
    }, 
    onOptionSelect : async (movie, func) =>{
        const movieAllData = await func(movie.imdbID);
        MovieArticle.innerHTML = movieTemplate(movieAllData);     

    },
    inputValue(movie){
        return movie.Title;
    },

    async fetchData(searchTerm) {
        const response = await axios.get('http://www.omdbapi.com/',{
            params: { 
                apikey: '4f6552da',
                s: searchTerm.trim()            
            }
        });
        if(response.data.Error) {
            return []; 
        }
        return response.data.Search;  
                                    
    }, 
     fetchDetailData : async (ID) => {
        const response = await axios.get('http://www.omdbapi.com/',{
            params: {
                apikey: '4f6552da', 
                i:ID
            
            }
        });
        return response.data;
    }
    

}); 



const MovieArticle = document.querySelector('#summary');



// 

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


// ***********************
// const fetchDataIndexResult = async (searchTerm) => {
//     const response = await axios.get('http://www.omdbapi.com/',{
//         params: {// the params should be in the right 
//                  // order 
//             apikey: '4f6552da',
//             s: searchTerm.trim()
           
//         }
//     });
//     if(response.data.Error) {
//       // if(resultsWrapper) resultsWrapper.classList.add('zeroPadding');
//         return []; 
//     }
//     //console.log(response.data); 
//     //resultsWrapper.classList.remove('zeroPadding');
//     return response.data.Search; // return just the data 
//                                 // that I need
// }
// *******************************
// const onMovieSelect = async movie => {
    //    // console.log(movie); 
    //     const movieAllData = await fetchDataShowResult(movie.imdbID);
    //     //console.log(movieAllData);
    //     MovieArticle.innerHTML = movieTemplate(movieAllData);
    
    // }
// **************************************