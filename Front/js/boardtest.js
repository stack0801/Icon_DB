window.onload = () => {
    const message = document.getElementById("message")

    axios({
        method: 'post',
        url: '/boardtest',
        data: {
            id: "Soosung",
            message: message,
        }
    })
    .then((res) => {
        alert(res.data)

        if (res.data == 'success') {
            window.location.href = '/sign_in'
        }
    })

}
