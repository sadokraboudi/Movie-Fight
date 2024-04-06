const fetchDataIndexResult = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {// the params should be in the right 
                 // order 
            apikey: '4f6552da',
            s: searchTerm.trim(),
           
        }
    });
    if(response.data.Error) {
       if(resultsWrapper) resultsWrapper.classList.add('zeroPadding');
        return []; 
    }
    //console.log(response.data); 
    resultsWrapper.classList.remove('zeroPadding');
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
    console.log(response.data); 
}


const onInput =  debouce(async event => {
   const movies= await  fetchDataIndexResult(event.target.value); 
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

const dropdown = document.querySelector('.dropdown'); 
const resultsWrapper = document.querySelector('.results'); 
const input = document.querySelector('#search_bar'); 
input.addEventListener('input',onInput); 