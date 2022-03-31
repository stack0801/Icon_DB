window.onload = () => {

}

(() => {
    const $ul = document.querySelector('ul');
    let $li;

    document.addEventListener('scroll',()=>{
        if((window.innerHeight+window.scrollY) >= document.body.offsetHeight){
            $li=$ul.appendChild(document.createElement('li'));
        }
    })
})();

const content = document.getElementById("content")

const add_items = () => {
    var addContent = document.createElement("div");
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
    addContent.classList.add("post")
    content.appendChild(addContent);
    }
}
