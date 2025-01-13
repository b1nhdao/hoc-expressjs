//button status 
const buttonStatus = document.querySelectorAll('[button-status]')

if(buttonStatus.length > 0){
    let url = new URL(window.location.href);

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

//form search
let url = new URL(window.location.href);
const urlKeyword = url.searchParams.get('keyword');
const keywordInput = document.querySelector('#keyword');
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

// End form search

// Pagination
const buttonsPagination = document.querySelectorAll('[button-pagination]');
if(buttonsPagination){
    let url = new URL(window.location.href);

    buttonsPagination.forEach(button => {
        button.addEventListener('click', (e) => {
            const page = button.getAttribute('button-pagination');
            url.searchParams.set('page', page);
            window.location.href = url.href;
        })
    });
}
// End Pagination

// checkbox multi
const checkboxMulti = document.querySelector('[checkbox-multi]');
if (checkboxMulti){
    const checkall = checkboxMulti.querySelector("input[name='checkall']");
    const inputsID = checkboxMulti.querySelectorAll("input[name='id']");
    checkall.addEventListener('click', () => {
        if(checkall.checked == true){
            inputsID.forEach(button => {
                button.checked = true;
            });
        }
        else{
            inputsID.forEach(button => {
                button.checked = false;
            });
        }
    });

    inputsID.forEach(button => {
        button.addEventListener('click', () =>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputsID.length)
            {
                checkall.checked = true;
            }
            else {
                checkall.checked = false;
            }
        })
    });
}

//end checkmulti

// form change multi 
const formChangeMulti = document.querySelector('[form-change-multi]');
if(formChangeMulti){
    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const checkall = checkboxMulti.querySelector("input[name='checkall']");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
    //    console.log(inputsChecked); 
       
       if(inputsChecked){
            let ids = [];
            const inputIds = formChangeMulti.querySelector('input[name="ids"]');
            inputsChecked.forEach(item => {
                const id = item.getAttribute('value');
                ids.push(id);
            })
            // console.log(ids);
            // console.log(inputIds.value);
            inputIds.value = ids.join(', ');
            formChangeMulti.submit();
       }
       else{
        alert('Hay chon it nhat 1 ban ghi')
       }
    });
}