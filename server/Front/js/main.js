window.onload = () => {

    const sign_in_btn = document.getElementById("sign_in_btn")
    const sign_up_btn = document.getElementById("sign_up_btn")

    axios({
        method: 'post',
        url: '/get_auth'
    })
        .then((res) => {
            if (res.data == "auth") {
                sign_in_btn.style.display = 'none';
                sign_up_btn.innerText = "Sign out";
            }
        })
}

//무한스크롤
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
            id: scroll_id,
            count: count
        }
    })
        .then((res) => {
            for (let o of res.data) {

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


//검색창
var lastScrollTop = 0;
var delta = 5;
var fixBox = document.getElementById('header');
var fixBoxHeight = fixBox.offsetHeight;
var didScroll;
//스크롤 이벤트 
window.onscroll = function(e) {
    didScroll = true;
};

//0.25초마다 스크롤 여부 체크하여 스크롤 중이면 hasScrolled() 호출
setInterval(function(){
    if(didScroll){
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled(){
    var nowScrollTop = window.scrollY;
    if(Math.abs(lastScrollTop - nowScrollTop) <= delta){
        return;
    }
    if(nowScrollTop > lastScrollTop && nowScrollTop > fixBoxHeight){
        //Scroll down
        fixBox.classList.add('hide');
    }else{
        if(nowScrollTop + window.innerHeight < document.body.offsetHeight){
            //Scroll up
            fixBox.classList.add('show');
        }
    }
    lastScrollTop = nowScrollTop;
}