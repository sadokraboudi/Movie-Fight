// reusable code for the autocomplete widge
const createAutoComplete = ({root,
                             renderOption,
                             onOptionSelect,
                             inputValue,
                             fetchData,
                             fetchDetailData}) => {
root.innerHTML =`
<label><b>Search For a item<b>
    <input class="input" id="search_bar" autocomplete="off"/>
</label>
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
</div>
`; 
const dropdown = root.querySelector('.dropdown'); 
const resultsWrapper = root.querySelector('.results'); 
const input = root.querySelector('#search_bar'); 



const onInput =  debouce(async event => {
    const items= await  fetchData(event.target.value); 
    if(!items.length) {
         dropdown.classList.remove('is-active');
         return ;
     }
    resultsWrapper.innerHTML='';
    dropdown.classList.add('is-active'); 
    for(let item of items){
     const anchor = document.createElement('a');  
     anchor.classList.add('dropdown-item'); 
     anchor.innerHTML= renderOption(item); 
     anchor.addEventListener('click',() =>{
         dropdown.classList.remove('is-active');
         input.value = inputValue(item);
         onOptionSelect(item,fetchDetailData);
     });
     resultsWrapper.appendChild(anchor); 

    }
    
     }, 500); 
     input.addEventListener('input',onInput); 

document.addEventListener('click', event =>{
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');

    }
}); 


}