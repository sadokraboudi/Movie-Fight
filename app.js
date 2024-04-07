// non-reusable code specific for 
// our project :
// *****************************

const autocompleteConfig = {
    renderOption(movie){
        const imgSrc =  movie.Poster === 'N/A' ? '' : movie.Poster; 
        return `
        <img  src = "${imgSrc}"/>
        <span>${movie.Title} (${movie.Year})</span>

        `;  
    }, 
    onOptionSelect : async (movie, func,movieArticle,side,comparisonObj) =>{
        document.querySelector('.tutorial').classList.add('is-hidden');
        const movieAllData = await func(movie.imdbID);
        movieArticle.innerHTML = movieTemplate(movieAllData); 
        if(!side)
            return ; 
        console.log(movieAllData);

        side === 'left' ? ComparisonObj.leftMovie = movieAllData:
        ComparisonObj.rightMovie= movieAllData;
        console.log(movieAllData);
        if (ComparisonObj.leftMovie && ComparisonObj.rightMovie)
             runComparison();   

        
       

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
    

}; 

const ComparisonObj = {};

 createAutoComplete({
    ...autocompleteConfig, 
    root : document.querySelector('#left-autocomplete'),
    movieArticle : document.querySelector('.left-summary'),
    side:'left',
    ComparisonObj,
       
}); 

createAutoComplete({
    ...autocompleteConfig, 
    root: document.querySelector('#right-autocomplete'),
    movieArticle : document.querySelector('.right-summary'),
    side:'right', 
    ComparisonObj, 

       
}); 

const runComparison = () => {
    const leftSideStats =  document.querySelectorAll('.left-summary .notification');
    const rightSideStats =  document.querySelectorAll('.right-summary .notification');
    leftSideStats.forEach((leftStat , index) =>{
        rightStat = rightSideStats[index]; 
        const leftSideValue = parseFloat(leftStat.dataset.value); 
        const rightSideValue = parseFloat(rightStat.dataset.value); 
        resetClasses(rightStat , leftStat);
        if (rightSideValue > leftSideValue) {
            leftStat.classList.remove('is-primary'); 
            leftStat.classList.add('is-danger'); 
        } else if(rightSideValue < leftSideValue){
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-danger');
        } else {
            rightStat.classList.remove('is-primary');
            leftStat.classList.remove('is-primary'); 
            rightStat.classList.add('is-warning');
            leftStat.classList.add('is-warning');
        }
    });

    }

const resetClasses = (right , left)=> {
    left.classList.remove('is-danger', 'is-warning');
    right.classList.remove('is-danger', 'is-warning');
    left.classList.add("is-primary"); 
    right.classList.add('is-primary');
}

    








// 

const movieTemplate = (movieDetail) =>{
    const { dollars,
            metaScore,
            imdbRating,
            imdbVotes,
            awards} = parsedData(movieDetail); 
    return `
    <article class="media">
        <figure class="media-left">
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
    <article data-value="${awards}" class="notification is-primary">
        <p class="title award">${movieDetail.Awards}</p>
        <p lcass="subtitle">Awards</p>
    </article>
    
    <article data-value ="${dollars}"class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p lcass="subtitle">Box Office</p>
    </article>
    
    <article data-value ="${metaScore}"class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p lcass="subtitle">Metascore</p>
    </article>
    
    <article data-value ="${imdbRating}" class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p lcass="subtitle">IMDB Rating</p>
    </article>
    
    <article data-value="${imdbVotes}" class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p lcass="subtitle">IMDB Votes</p>
    </article>
    `;
}

const parsedData = (movieDetail) =>{
     const BoxOfficeValue = movieDetail.BoxOffice ? 
                            movieDetail.BoxOffice : 
                            'N/A';
    // movieDetail.boxOffice can return undefined cuz 
    // could be the boxOffice propertie does not exist
    // in movieDetail
    const dollars = parseInt(
        BoxOfficeValue
        .replace(/\$/g,'')
        .replace(/,/g,'')
        .replace(/(N\/A)/g,'0')); 
        

    const metaScore = parseInt(
          movieDetail
          .Metascore
          .replace(/(N\/A)/g,'0'));

    const imdbRating =  parseFloat(
            movieDetail
            .imdbRating
            .replace(/(N\/A)/g,'0'));

    const imdbVotes = parseInt(
          movieDetail.
          imdbVotes.
          replace(/,/g,'')
          .replace(/(N\/A)/g,'0'));
        // ************************************
        // let count; 
        // const awards = movieDetail.Awards.split(' ').forEach(word => {
        //     const value = parseInt(word);
        //     if(isNaN(value))  return; // isNaN return true or false
        //     count += value; 
        // });
        // ******************************** refactoring with reduce : 

    const awards = movieDetail.Awards.split(' ').reduce((prev , word) => {
        const value = parseInt(word);
        return isNaN(value) ? prev  : prev + value;

    },0);

return {dollars,
        metaScore,
        imdbRating,
        imdbVotes,
        awards}; 
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


// NB : 
// In JavaScript, any comparison involving NaN 
// (Not-a-Number) will result in false, regardless of
//  the value it's compared to. Therefore, NaN is not 
//  greater than, less than, or equal to any other value,
//   including 0.

