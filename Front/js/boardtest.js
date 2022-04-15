window.onload = () => {

}

const board_in = document.getElementById("board_in")

board_in.onclick = () => {
    const messageElement = document.getElementById("message")
    const message = messageElement.value

    axios({
        method: 'post',
        url: '/boardtest',
        data: {
            message: message
        }
    })
        .then((res) => {
            alert(res.data)
            window.location.href = '/'
        })
}