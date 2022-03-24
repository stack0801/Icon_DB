window.onload = () => {
	console.log("!!!")
}

const login_btn = document.getElementById("login_btn")
const id_ipt = document.getElementById("id_ipt")
const pw_ipt = document.getElementById("pw_ipt")


login_btn.onclick = () => {

	const id = id_ipt.value
	const pw = pw_ipt.value

	//axios 비동기 통신
	axios({
		method: 'post',
		url: '/login',
		data: {
		  	id: id,
		  	pw: pw
		}
	})
	.then((res) => {
		alert(res.data)
	})
}