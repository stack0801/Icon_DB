window.onload = () => {
	console.log("!!!")
}


const sign_up_btn = document.getElementById("sign_in-button")
const id_ipt = document.getElementById("id_ipt")
const pw_ipt = document.getElementById("pw_ipt")

/* id_input에서 tab키를 이용해 변환할 때 pw_input을 클릭하는 이벤트 */
id_ipt.addEventListener('keydown', function (e) {
	if (e.keyCode === 9) /* if(e.code === 'Tab') */
		pw_ipt.click();
})

/* pw_input에서 Enter키를 이용해 sing in 버튼을 클릭하는 이벤트 */
pw_ipt.addEventListener('keyup', function (e) {
	if (e.keyCode === 13) /* if(e.code === 'Enter') */
		sign_up_btn.click();
})

id_ipt.onclick = () => {
	id_ipt.parentNode.style.border = '1px solid #dadada';
}

pw_ipt.onclick = () => {
	pw_ipt.parentNode.style.border = '1px solid #dadada';
}

sign_up_btn.onclick = () => {
	const id = id_ipt.value
	const pw = pw_ipt.value

	if (id == "") {
		id_ipt.parentNode.style.border = '3px solid red';
		id_ipt.placeholder = '아이디를 입력하세요.';
	}

	if (pw == "") {
		pw_ipt.parentNode.style.border = '3px solid red';
		pw_ipt.placeholder = '비밀번호를 입력하세요';
	}

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