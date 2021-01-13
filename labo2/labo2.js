

const dropdown = document.querySelector(".dropdown");
const dropdownContent = document.querySelector(".dropdown-content")
const input = document.querySelector("input");
const msgbox = document.querySelector("msg");

dropdown.addEventListener("click", (ev) => onclick(ev));

input.addEventListener("input", (ev) => oninput(ev));

document.addEventListener("click", (ev) => {
    onModelChange([]);
    msg.style.display = 'none';
    open = false;

})

let open = false;
msg.style.display = 'none';
const items = ["banane", "pomme", "orange", "olive", "pizza", "bonbon", "biscuit", "patate"];

function onclick(ev) {
    if (!open) {
        onModelChange(items);
        open = true;
    }
    else {
        onModelChange([]);
        msg.style.display = 'none';
        open = false;
    }
    ev.stopPropagation();

}


function createItem(name) {
    const item = document.createElement("li")
    item.className = "dropdown-item"
    item.textContent = name;
    return item
}

function reset() {
    onModelChange(items);
}

function oninput(ev) {
    const actualInput = ev.target.value;
    let filteredItem = [];
    filteredItem = items.filter(it => it.includes(actualInput))
    onModelChange(filteredItem)
}

function onModelChange(model) {
    const items = document.querySelectorAll('.dropdown-item');
    items.forEach(it => dropdownContent.removeChild(it));
    msg.style.display = 'none';

    if (model.length == 0) {
        msg.style.display = 'block'
    }
    model.forEach(i => dropdownContent.appendChild(createItem(i)));


}
