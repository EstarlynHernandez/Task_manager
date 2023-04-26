document.onload = main();

function main() {
    task();
    shadowMenu();
    moveTask('.task');
    moveTask('.groupItem');
}

function task() {
    let checked = document.querySelectorAll(".checked");
    let deleteTask = document.querySelectorAll(".delete");
    let taskType = document.querySelector("#type");
    let hiddenType = document.querySelector("#count");
    let tastExtra = document.querySelectorAll(".taskExtra");

    checked.forEach((check) => {
        check.onclick = (e) => {
            check.parentElement.parentElement.classList.toggle("task__complete");
            check.children[0].submit();
        };
    });

    deleteTask.forEach((del) => {
        del.onclick = (e) => {
            del.parentElement.classList.toggle("deleting");
            del.children[0].submit();
        };
    });

    taskType.onchange = () => {
        if (hiddenType) {
            hiddenType.classList.add("dnone");
        }
        if (taskType.value != "normal") {
            hiddenType = document.querySelector("#" + taskType.value);
            hiddenType.classList.remove("dnone");
        }
    };

    tastExtra.forEach((extra) => {
        if (
            extra.childElementCount > 0 &&
            !extra.parentElement.parentElement.classList.contains("task__complete")
        ) {
            extra.onclick = () => {
                sendUpdate(extra);
            };
        }
    });
}

function moveTask(items) {
    let tasks = document.querySelectorAll(items);
    let mouseX;
    let down;
    let newMouseX;

    tasks.forEach((task) => {
        task.addEventListener("touchstart", (e) => {
            down = true;
            mouseX = e.touches[0].screenX;
        });
        task.addEventListener("touchmove", (e) => {
            if (down) {
                newMouseX = e.touches[0].screenX - mouseX;
                if (newMouseX > -120 && newMouseX < 5) {
                    task.style = "left:" + newMouseX + "px";
                }
            }
        });
        task.addEventListener("touchend", () => {
            down = false;
            if (newMouseX < -30) {
                task.style = "left: -80px";
            }else{
                task.style = "left: 0px";
            }
        });
    });
}

function shadowMenu() {
    let create = document.querySelector(".create");
    let closeTabs = document.querySelectorAll(".closeTab");
    let createTab = document.querySelector(".createTab");
    let content = document.querySelector("#content");
    let openMenu = document.querySelector("#openMenu");
    let menu = document.querySelector("#menu");
    let shadow = document.querySelector(".shadow");

    if (openMenu) {
        openMenu.onclick = () => {
            menu.classList.remove("dnone");
            content.classList.add("blur");
            create.classList.add("dnone");
            shadow.classList.remove("dnone");
        };
    }

    closeTabs.forEach((closeTab) => {
        closeTab.onclick = () => {
            menu.classList.add("dnone");
            create.classList.add("dnone");
            shadow.classList.add("dnone");
            content.classList.remove("blur");
        };
    });

    createTab.onclick = () => {
        create.classList.remove("dnone");
        shadow.classList.remove("dnone");
        content.classList.add("blur");
    };
}

function sendUpdate(item) {
    let values = item.querySelector("p").innerText.split("-");
    let result = parseInt(values[0]) + 1;

    item.querySelector("p").innerText = result + "-" + values[1];

    if (result == values[1]) {
        let check = item.parentElement.querySelector(".checked form");
        item.parentElement.parentElement.classList.toggle("task__complete");

        check.submit();
    }
}
