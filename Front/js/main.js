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

// 무한스크롤 

document.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log("!!!")
        add_items()
        add_items()
        add_items()
        add_items()
        add_items()
        add_items()
        add_items()
        add_items()
    }
})

const content = document.getElementById("content_box")

const add_items = () => {
    var addContent = document.createElement("div");
    addContent.classList.add("content")
    content.appendChild(addContent);
}
