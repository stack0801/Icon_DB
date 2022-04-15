window.onload = () => {

}

const board_in = document.getElementById("board_in")

board_in.onclick = () => {
    const message = document.getElementById("message")

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

