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
        
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
    //    console.log(inputsChecked); 
       
        const typeChange = document.querySelector('select[name="type"]').value;
        if(typeChange == 'delete-all' && inputsChecked.length > 0){
            const isConfirm = confirm('Ban co chac chan muon xoa nhung san pham nay khong ?');
            if(!isConfirm){
                return;
            }
        }
        else if(typeChange == 'none'){
            alert('Chon mot hanh dong ');
            return;
        }
        
       if(inputsChecked.length != 0){
            let ids = [];
            const inputIds = formChangeMulti.querySelector('input[name="ids"]');
            inputsChecked.forEach(item => {
                const id = item.getAttribute('value');
                if(typeChange == 'change-position'){
                    const position = item.closest('tr').querySelector('input[name="position"]').value;
                    ids.push(`${id}-${position}`);
                    // console.log(`${id}-${position}`);
                }
                else{
                    ids.push(id);
                }
            })

            // console.log(ids);
            // console.log(inputIds.value);
            inputIds.value = ids.join(', ');
            formChangeMulti.submit();
       }
       else{
        alert('Hay chon it nhat 1 ban ghi');
       }
    });
}

// show alert
const showAlert = document.querySelector('[show-alert]');
if(showAlert){
    const time = parseInt(showAlert.getAttribute('data-time'));
    setTimeout(() => {
        showAlert.classList.add('alert-hidden');
    }, time);

    const closeAlert = showAlert.querySelector('[close-alert]');
    closeAlert.addEventListener('click', () => {
        showAlert.classList.add('alert-hidden');
    });
}

// upload image
const uploadImage = document.querySelector('[upload-image]');
if(uploadImage){
    const uploadImageInput = document.querySelector('[upload-image-input');
    const uploadImagePreview = document.querySelector('[upload-image-preview');
    uploadImageInput.addEventListener('change', (e) => {
        // console.log(e.target.files[0] );
        const [file] = uploadImageInput.files;
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}
// end upload image

// sort
const sort = document.querySelector('[sort]');
if(sort){
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector('[sort-select]');
    const sortClear = sort.querySelector('[sort-clear]')
    sortSelect.addEventListener('change', () => {
        // console.log(sortSelect.value); //e.target.value
        let keyValue = sortSelect.value.split('-');

        console.log(keyValue);
        const[sortKey, sortValue] = keyValue

        url.searchParams.set('sortKey', sortKey);
        url.searchParams.set('sortValue', sortValue);
        window.location.href = url.href;
    });

    sortClear.addEventListener('click', () => {
        url.searchParams.delete('sortKey');
        url.searchParams.delete('sortValue');
        window.location.href = url.href;
    })

    const sortKeyParam = url.searchParams.get('sortKey');
    const sortValueParam = url.searchParams.get('sortValue');
    if(sortKeyParam && sortValueParam){
        const stringSort = sortKeyParam.concat('-', sortValueParam)
        // console.log(stringSort);
        const optionSelected = sortSelect.querySelector(`option[value="${stringSort}"]`);
        optionSelected.selected =  true;
    }
}
// end sort