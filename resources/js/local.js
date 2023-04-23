document.onload = main();

function main() {
    localTask();
    task();

    shadowMenu();
}

function task() {
    let checked = document.querySelectorAll(".checked");
    let deleteTask = document.querySelectorAll(".delete");
    let taskCreate = document.querySelector(".taskCreate");

    taskCreate.onsubmit = (e) => {
        e.preventDefault();
        if (document.querySelector("#name").value.length > 3) {
            let task = {
                complete: false,
                title: document.querySelector("#name").value,
                details: document.querySelector("#details").value,
            };
            saveTask(task);
        }
    };

    // checked.forEach((check) => {
    //     check.onclick = (e) => {
    //         // check.children[0].submit();
    //     };
    // });

    // deleteTask.forEach((del) => {
    //     del.onclick = (e) => {
    //         // del.children[0].submit();
    //     };
    // });
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

function localTask() {
    let local = localStorage.getItem("task");
    if (local) {
        let tasks = JSON.parse(local);
        tasks.forEach((task) => {
            createTask(task, tasks);
        });
    }
}

function createTask(task, tasks) {
    let container = document.querySelector(".tasks");
    let li = document.createElement("li");
    let taskStatus = document.createElement("img");
    let taskDelete = document.createElement("img");
    let info = document.createElement("div");
    let title = document.createElement("h3");
    let details = document.createElement("p");

    title.innerText = task.title;
    title.classList.add("task__title");
    details.innerText = task.details;
    details.classList.add("task__text");
    info.appendChild(title);
    info.appendChild(details);
    info.classList.add("task__info");

    taskStatus.setAttribute("src", "icons/circle.svg");
    taskStatus.setAttribute("alt", "not found");
    taskStatus.classList.add("task__checked", "checked");

    taskStatus.onclick = () => {
        updateTask(task, tasks);
    };

    taskDelete.setAttribute("src", "icons/delete.svg");
    taskDelete.setAttribute("alt", "not found");
    taskDelete.classList.add("task__delete", "delete");

    taskDelete.onclick = () => {
        removeTask(task, tasks);
    };

    li.classList.add("task");

    if (task.complete) {
        li.classList.add("task__complete");
        taskStatus.setAttribute("src", "icons/complete.svg");
    }

    li.appendChild(taskStatus);
    li.appendChild(info);
    li.appendChild(taskDelete);

    container.appendChild(li);
}

function saveTask(task) {
    let container = document.querySelector(".tasks");
    let local = localStorage.getItem("task");
    if (local == null) {
        let file = JSON.stringify([task]);
        localStorage.setItem("task", file);
    } else {
        let file = JSON.parse(local);
        file.push(task);

        localStorage.setItem("task", JSON.stringify(file));
    }

    container.innerHTML = " ";

    localTask();
}

function updateTask(task, tasks) {
    let container = document.querySelector(".tasks");
    tasks.filter((item) => {
        if (item === task) {
            item.complete = !!!item.complete;
            return item;
        } else {
            return item;
        }
    });

    container.innerHTML = " ";

    localStorage.setItem("task", JSON.stringify(tasks));

    localTask();
}

function removeTask(task, tasks) {
    let container = document.querySelector(".tasks");
    let items = tasks.filter((item) => {
        if (item === task) {
            return null;
        } else {
            return item;
        }
    });

    container.innerHTML = " ";

    localStorage.setItem("task", JSON.stringify(items));

    localTask();
}
