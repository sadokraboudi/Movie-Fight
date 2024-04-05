// ******* the old debouce method : 
// let timeoutId; 
// const onInput = event =>{
//     if (timeoutId) clearTimeout(timeoutId); 
//    timeoutId = setTimeout(()=>{
//         fetchDataIndexResult(event.target.value); 
//      }, 500)
//     }
    // *********refactoring the debouce function : 
    const debouce = (func , delay = 1000) =>{
        let timeoutId;
        return (...args) => {
            if(timeoutId) clearTimeout(timeoutId); 
            timeoutId = setTimeout(() => {
                func.apply(null,args); 
            },delay); 
        }
    }