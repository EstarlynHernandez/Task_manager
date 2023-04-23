document.onload = main();

function main() {
    task();
    shadowMenu();
}

function task() {
    let checked = document.querySelectorAll(".checked");
    let deleteTask = document.querySelectorAll(".delete");
    let taskType = document.querySelector("#type");
    let hiddenType = document.querySelector('#count');

    checked.forEach((check) => {
        check.onclick = (e) => {
            check.parentElement.classList.toggle('task__complete');
            check.children[0].submit();
        };
    });

    deleteTask.forEach((del) => {
        del.onclick = (e) => {
            del.parentElement.classList.toggle('deleting');
            del.children[0].submit();
        };
    });

    taskType.onchange = () => {
        if(hiddenType){
            hiddenType.classList.add('dnone');
        }
        if(taskType.value != 'normal'){
            hiddenType = document.querySelector('#'+taskType.value);
            console.log('#'+taskType.value); 
            hiddenType.classList.remove('dnone');
        }
    }
}

function shadowMenu() {
    let create = document.querySelector(".create");
    let closeTabs = document.querySelectorAll(".closeTab");
    let createTab = document.querySelector(".createTab");
    let content = document.querySelector('#content');

    closeTabs.forEach((closeTab) => {
        closeTab.onclick = () => {
            create.classList.add("dnone");
            content.classList.remove('blur');
        };
    });

    createTab.onclick = () => {
        create.classList.remove("dnone");
        content.classList.add('blur');
    };
}
