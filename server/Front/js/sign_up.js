window.onload = () => {
	console.log("!!!")
}


const sign_up_btn = document.getElementById("sign_up-button")
const id_ipt = document.getElementById("id_ipt")
const pw_ipt = document.getElementById("pw_ipt")
const nickname_ipt = document.getElementById("nickname_ipt")

id_ipt.addEventListener('keydown', function (e) {
	if (e.code == 'Tab')
		pw_ipt.click();
})

pw_ipt.addEventListener('keydown', function (e) {
	if (e.code == 'Tab')
		nickname_ipt.click();
})

id_ipt.onclick = () => {
	id_ipt.parentNode.style.border = '2px solid #9ed1d9';
}
pw_ipt.onclick = () => {
	pw_ipt.parentNode.style.border = '2px solid #9ed1d9';
}
nickname_ipt.onclick = () => {
	nickname_ipt.parentNode.style.border = '2px solid #9ed1d9';
}

sign_up_btn.onclick = () => {
	const id = id_ipt.value
	const pw = pw_ipt.value
	const nickname = nickname_ipt.value

	if (id == "") {
		id_ipt.parentNode.style.border = '2px solid #f5a282';
		id_ipt.placeholder = '아이디를 입력하세요';
	}
	if (pw == "") {
		pw_ipt.parentNode.style.border = '2px solid #f5a282';
		pw_ipt.placeholder = '비밀번호를 입력하세요';
	}
	if (nickname == "") {
		nickname_ipt.parentNode.style.border = '2px solid #f5a282';
		nickname_ipt.placeholder = '닉네임을 입력하세요';
	}

	if (id != "" && pw != "") {
		//axios 비동기 통신
		axios({
			method: 'post',
			url: '/sign_up',
			data: {
				id: id,
				pw: pw,
				nickname: nickname
			}
		})
		.then((res) => {
			alert(res.data)

			if (res.data == 'success') {
				window.location.href = '/sign_in'
			}
		})
	}
}