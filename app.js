const fetchDataIndexResult = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {// the params should be in the right 
                 // order 
            apikey: '4f6552da',
            s: searchTerm
           
        }
    });
    console.log(response.data);  

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


const onInput = debouce(event => {
    fetchDataIndexResult(event.target.value); 
    }, 500)
     
const input = document.querySelector('#search_bar'); 
input.addEventListener('input',onInput); 