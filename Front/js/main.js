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

let scroll_id = 0;          //포스트를 어디까지 로딩 했는지
let scrollable = true       //데이터를 받기전에 서버에 포스트 요청 방지

document.addEventListener('scroll', () => {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && scrollable) {

        scrollable = false

        add_items(4)
    }
})

const content_box = document.getElementById("content_box")

const add_items = (count) => {

    axios({
        method: 'post',
        url: '/get_contents',
        data: {
            id : scroll_id,
            count : count
        }
    })
    .then((res) => {
        for(let o of res.data) {

            var content = document.createElement('a')
            content.setAttribute("href", `/content/${o.content_id}`)
            content.setAttribute("class", "content")

            var img = document.createElement('img')
            img.setAttribute("src", `/${o.content_id}.svg`)

            content.appendChild(img)

            content_box.appendChild(content)
        }

        scrollable = true
        scroll_id += count
    })




    
}
