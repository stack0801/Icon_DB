window.onload = () => {

    const sign_in_btn = document.getElementById("sign_in_btn")
    const sign_up_btn = document.getElementById("sign_up_btn")

    axios({
        method: 'post',
        url: '/get_auth'
    })
    .then((res) => {
        if (res.data == "auth") {
            sign_in_btn.style.display ='none';
            sign_up_btn.innerText="Sign out"; 
        }
    })
}

/* 무한스크롤 */
(() => {
    const $ul = document.querySelector('ul');
    let $li; 

    document.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            $li = $ul.appendChild(document.createElement('li'));
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
