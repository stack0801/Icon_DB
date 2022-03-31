window.onload = () => {
	console.log("!!!")
}

const sign_up_btn = document.getElementById("sign_in-button")
const id_ipt = document.getElementById("id_ipt")
const pw_ipt = document.getElementById("pw_ipt")

id_ipt.onclick = () => {
	id_ipt.parentNode.style.border = '1px solid #dadada';
}

pw_ipt.onclick = () => {
	pw_ipt.parentNode.style.border = '1px solid #dadada';
}

sign_up_btn.onclick = () => {
	const id = id_ipt.value
	const pw = pw_ipt.value

	if (id == "")
		id_ipt.parentNode.style.border = '1px solid red';

	if (pw == "")
		pw_ipt.parentNode.style.border = '1px solid red';

	if (id != "" && pw != "") {
		//axios 비동기 통신
		axios({
			method: 'post',
			url: '/sign_in',
			data: {
				id: id,
				pw: pw
			}
		})
			.then((res) => {
				alert(res.data)

				if (res.data == 'success') {
					window.location.href = '/'
				}
			})
	}
}