
const buttonsChangeStatus = document.querySelectorAll('[button-change-status]');
if(buttonsChangeStatus){
    const formChangeStatus = document.querySelector('#form-change-status');
    const path = formChangeStatus.getAttribute('data-path');
    console.log(path);

    buttonsChangeStatus.forEach(button => {

        button.addEventListener('click', (e) => {
            const currentStatus = button.getAttribute('data-status');
            const id = button.getAttribute('data-id');

            let changedStatus = currentStatus == 'active' ? 'inactive' : 'active';

            const action = `${path}/${changedStatus}/${id}?_method=PATCH`;
            console.log(action);
            formChangeStatus.action = action;
            formChangeStatus.submit();
        });
    }); 
}

const buttonsDelete = document.querySelectorAll('[button-delete]');
if(buttonsDelete){
    const formDelete = document.querySelector('#form-delete');
    let path = formDelete.getAttribute('data-path');
    // console.log(formDelete.action + path);
    buttonsDelete.forEach(button => {
        button.addEventListener('click', () => {
            const isConfirm = confirm('Ban co chan chan muon xoa san pham nay khong ?');

            if(isConfirm){
                const id = button.getAttribute('data-id');
                const action = `${path}/${id}?_method=DELETE`;
                // const action = `${path}/${id}?_method=DELETE`;
                formDelete.action = action;
                formDelete.submit();
            }
        })
    });
}

