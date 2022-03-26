window.onload = () => {
	console.log("!!!")
}

const sign_up_btn = document.getElementById("sign_up-button")
const id_ipt = document.getElementById("id_ipt")
const pw_ipt = document.getElementById("pw_ipt")
const nickmane_ipt = document.getElementById("nickmane_ipt")

sign_up_btn.onclick = () => {
	const id = id_ipt.value
	const pw = pw_ipt.value
	const nickmane = nickmane_ipt.value

	//axios 비동기 통신
	axios({
		method: 'post',
		url: '/sign_up',
		data: {
		  	id: id,
		  	pw: pw,
			nickmane: nickmane
		}
	})
	.then((res) => {
		alert(res.data)

		if(res.data == 'success') {
			window.location.href='/sign_in'
		}
	})
}