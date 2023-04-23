document.onload = main();

function main() {
    task();

    shadowMenu();
}

function task() {
    let checked = document.querySelectorAll(".checked");
    let deleteTask = document.querySelectorAll(".delete");

    checked.forEach((check) => {
        check.onclick = (e) => {
            check.children[0].submit();
        };
    });

    deleteTask.forEach((del) => {
        del.onclick = (e) => {
            del.children[0].submit();
        };
    });
}

function shadowMenu() {
    let create = document.querySelector(".create");
    let closeTabs = document.querySelectorAll(".closeTab");
    let createTab = document.querySelector(".createTab");

    closeTabs.forEach((closeTab) => {
        closeTab.onclick = () => {
            create.classList.add("dnone");
        };
    });

    createTab.onclick = () => {
        create.classList.remove("dnone");
    };
}
