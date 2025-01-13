
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