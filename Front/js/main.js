window.onload = () => {
	add_items()
    add_items()
    add_items()
    add_items()
    add_items()
    add_items()
    add_items()
    add_items()
    add_items()
    add_items()
}

const content = document.getElementById("content")

const add_items = () => {
    var addContent = document.createElement("div");
    addContent.classList.add("post")
    content.appendChild(addContent);
} 