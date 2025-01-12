//button status 
const buttonStatus = document.querySelectorAll('[button-status]')

if(buttonStatus.length > 0){
    let url = new URL(window.location.href);
    console.log(url);

    buttonStatus.forEach(button => {
        button.addEventListener('click', () => {
            const status = button.getAttribute('button-status');
            
            if(status){
                url.searchParams.set('status', status)
            }
            else{
                url.searchParams.delete('status');
            }
            window.location.href = url.href;
        });
    });
}
// end button status

// form search
// const formSearch = document.querySelector('#form-search');
// if(formSearch){
//     let url = new URL(window.location.href);

//     formSearch.addEventListener('submit', (e) => {
//         e.preventDefault();
//         // const keyword = e.target.elements.keyword.value;
//         const keyword = document.querySelector('#keyword').value;
//         if(keyword){
//             url.searchParams.set('keyword', keyword);
//         }
//         else{
//             url.searchParams.delete('keyword');
//         }

//         window.location.href = url.href;
//     });
// }

//form search
let url = new URL(window.location.href);
const urlKeyword = url.searchParams.get('keyword');
const keywordInput = document.querySelector('#keyword');
console.log(urlKeyword);
    if(urlKeyword){
        keywordInput.value = urlKeyword;
    }


const formSearch = document.querySelector('#form-search');
if(formSearch){
    let url = new URL(window.location.href);

    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyword = document.querySelector('#keyword').value;
        if(keyword){
            url.searchParams.set('keyword', keyword);
        }        
        else{
            url.searchParams.delete('keyword');
        }
        window.location.href = url.href;
    });
}