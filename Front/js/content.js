window.onload = () => {

    const content_box = document.getElementById("content_box")

    axios({
        method: 'post',
        url: '/get_content',
        data: {
            id : window.location.href.split('/')[4]
        }
    })
    .then((res) => {

        let img = document.createElement('img')
        img.setAttribute("src", `/${res.data[0].content_id}.svg`)
        content_box.appendChild(img)

        let message = document.createTextNode(res.data[0].message)
        content_box.appendChild(message)
    })
}