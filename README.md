# ICONDB 🖼️

## 아이콘 제작과 공유를 위한 무료 플랫폼

<h2 align="center">
  <img src="https://github.com/stack0801/Icon_DB/assets/89950902/b5c6de0a-1b87-4dd2-a64d-05be5a86c48f" alt="Icondb" width="600px" />
  <br>
</h2>

## Features

🌟 소셜 로그인\
🌟 무료 아이콘 업로드 및 다운로드\
🌟 사용자들 간 팔로우\
🌟 해쉬태그 및 아이콘 좋아요 기능\
🌟 사이트 내에서 아이콘 자체 편집

## Getting Start 🚀

```bash
# Clone the repository
$ git clone https://github.com/stack0801/Icon_DB.git
```

Install Frontend dependencies

```bash
# Move into the client
$ cd client

# Install dependencies
$ npm install

# Start the client
$ npm run start
```

Install Backend dependencies
```bash
# Move into the server
$ cd server

# Install dependencies
$ npm install

# Start the server
$ npm run dev
```

### svgedit
```bash
# Move into the svgedit
$ cd svgedit

# Install dependencies
$ npm install

# Start the svgedit
$ npm run start
```

---

## Technologies used 🔧

### Environment
<p>
  <img src="https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=Github&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/>
</p>


### Config
<p>
  <img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white"/>
</p>

### Development
<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/><br/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>
</p>

### Communication 
<p>
  <img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white"/>
  <img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white"/>
  <img src="https://img.shields.io/badge/Microsoft Teams-6264A7?style=flat-square&logo=Microsoft Teams&logoColor=white"/><br/><br/>
</p>

## Page composition 🎨

### (1) MainPage

![main](https://github.com/stack0801/Icon_DB/assets/89950902/6ea496c6-f532-4a30-8ed6-edd4fe4d91c9)

### (2) SignUpPage

![signup](https://github.com/stack0801/Icon_DB/assets/89950902/695943d5-110e-4c4c-a950-c71cccd83a84)

### (3) UploadPage
![upload](https://github.com/stack0801/Icon_DB/assets/89950902/16079b45-a22e-4d54-8c16-47fa38d1cfa3)

### (4) ProfilePage

![profile](https://github.com/stack0801/Icon_DB/assets/89950902/7fe6fb67-2057-4e14-8b04-3e54fd9973fb)

### (5) DownloadPage

![downloads](https://github.com/stack0801/Icon_DB/assets/89950902/08bd0896-817f-4c4c-87ac-0625ced99cad)

## Project Architecture 📂

```bash
├── README.md
├── package-lock.json
├── package.json
├── server : 백엔드 
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js : 서버, 데이터베이스 관련 정보
│   ├── server_user.js : 사용자 관련 코드
│   ├── server_tag.js : 해시태그 관련 코드
│   ├── server_like.js : 좋아요 유무 및 좋아요 수 코드
│   ├── server_follow.js : 팔로워 관련 코드
│   ├── server_content.js : 아이콘 정보 관련 코드
│   └── src
│       ├── aws_multer.js
│       ├── mysql.js
│       └── session.js
├── client : 프론트엔드
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│       ├── assets
│           ├── images
│       ├── components
│           ├── Header
│               ├── DesktopHeader.js
│               ├── MobileHeader.js
│               └── Header.js
│           ├── EditProfilePage
│               ├── EditProfileContainer.js
│               └── EditProfileWrapper.js
│           ├── LandingPage
│               ├── LandingContainer.js
│               └── Top.js : 클릭 시 창의 최상단으로 가는 기능을 가진 코드
│           ├── PostingPage
│               ├── PostingContainer.js
│               └── PostingWrapper.js
│           ├── PostContainer
│               └── PostContainer.js
│           ├── SigninPage
│               └── SigninContainer.js
│           ├── SignupContainer
│               └── SignupConatiner.js
│           ├── GoogleButton.js
│           ├── ImageContainer.js
│           ├── LinkButton.js
│           ├── Linkdiv.js
│           ├── Loading.js
│           ├── Logo.js
│           ├── SearchBox.js
│           ├── StyledButton.js
│           ├── StyledInput.js
│           ├── theme.js
│           └── TopButton.js
│       ├── pages
│           ├── EditProfilePage.js
│           ├── LandingPage.js
│           ├── PostingPage.js
│           ├── PostPage.js
│           ├── ProfilePage.js
│           ├── SearchingPage.js
│           ├── SearchingTagPage.js
│           ├── SigninPage.js
│           └── SignupPage.js
│       ├── App.js
│       └── index.js
│   └── public
│       ├── favicon
│       ├── manifext.json
│       └── index.html
└── svgedit : svg 형식의 파일의 아이콘을 사용자의 필요성에 맞도록 색 및 모양을 바꿀 수 있는 폴더
```

<h2 align="center">
  <img src="https://github.com/user-attachments/assets/a081a5fb-d08c-4841-94ce-f98a43f7ebfe" alt="Icondb" width="100%" />
</h2>
