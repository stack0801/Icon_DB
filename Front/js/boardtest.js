window.onload = () => {

}

const board_in = document.getElementById("board_in")
const board_img = document.getElementById("upload_icon")
const messageElement = document.getElementById("message")

board_in.onclick = () => {

    const formData = new FormData()
    formData.append("img", board_img.files[0])
    formData.append("message", messageElement.value)

    axios({
        method: 'post',
        url: '/boardtest',
        header: { 'content-type': 'multipart/form-data' },
        data: formData
    })
    .then((res) => {
        alert(res.data)
        if (res.data == 'success') 
            window.location.href = '/'
    })
}