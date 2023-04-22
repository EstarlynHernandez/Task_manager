document.onload = main();

function main(){
    let checked = document.querySelectorAll('.checked');
    checked.forEach((check) => {
        check.onclick = (e) => {
            check.children[0].submit();
        };
    }) 

    let deleteTask = document.querySelectorAll('.task__delete');
    deleteTask.forEach((del) => {
        del.onclick = (e) => {
            console.log('a')
            del.children[0].submit();
        };
    }) 
}
