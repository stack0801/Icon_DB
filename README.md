#ICON_DB

## 프로젝트 정보

### 개발 기간
<p>
  2022.03 ~ 2022.07 약 4개월동안 진행<br/><br/>
</p>

### 프로젝트 소개
<p>
  IconDB는 무료로 아이콘을 배포하고 제작할 수 있는 웹사이트입니다. 사용자는 원하는 아이콘을 선택하고 해당 아이콘을 사용 목적에 맞게 수정할 수 있습니다. 이렇게 제작한 아이콘은 무료로 사용할 수 있습니다.

  또한, IconDB는 팔로우 기능을 제공하여 마음에 드는 사용자를 팔로우할 수 있습니다. 이를 통해 해당 사용자가 제작한 아이콘을 쉽게 확인하고 사용할 수 있습니다. 또한, 해시태그를 이용하여 원하는 아이콘을 검색할 수도 있습니다. 이 기능을 활용하면 사용자의 목적에 부합하는 아이콘을 빠르게 찾아 제작할 수 있습니다.

  IconDB를 이용하면 다양한 아이콘을 찾고, 필요에 맞게 수정하여 사용할 수 있습니다.<br/><br/>
</p>

## 시작 가이드

### Installation
```bash
$ git clone
```

### 1. Frontend
```
cd client
npm install
npm run start
```

### 2. Backend
```
cd server
npm i
npm run dev
```

### 3. svgedit
```
cd svgedit
npm install
npm run start
```
<br/><br/>

## Stacks

### Environment
<p>
  <img src="https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"/>
  
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/>
</p>


### Config
<p>
  <img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white"/>
</p>

### Development
<p>
  <img src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/><br/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/>
</p>

### Communication 
<p>
  <img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white"/>
  <img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white"/><br/><br/>
</p>


## 구현 기능

<br>

### 1. MainPage
--------
1. Header 업로드 / 로그인 / 회원가입 등 다양한 기능 제공
    + 스크롤을 내릴 시에 SearchBox 생성으로 인한 사용자 편의 증가
    + 모바일 버전에 맞는 반응형 Header

2. Icon들을 한번에 볼 수 있도록 화면에 따라 최적화된 List로 표시

#### PC
![Main](https://user-images.githubusercontent.com/89950902/227500136-5bbcd2de-8ac3-4115-8051-a3059cba8957.PNG)

#### Mobile
![Main(Mobile)](https://user-images.githubusercontent.com/89950902/227500164-908740ce-bd62-41e6-9cd1-276e1125e4ae.PNG)

<br><br>

### 2. Posting Page
----------
1. 아이콘을 추가하거나 업데이트하는 페이지
    + 로그인이 되어있을 때만 사용 가능
    + 여러개의 아이콘 등록 불가

#### Posting Page
![Icon Update](https://user-images.githubusercontent.com/89950902/227500881-ce9ff7f7-48fd-4893-b7bc-90fe5f58a276.PNG)

<br><br>

### 3. Profile Page
----------
1. 자신의 Profile Page 방문 시, 프로필 업데이트 기능

2. 다른 사람의 Profile 방문 시, 팔로우 기능

3. 자신의 아이콘, 좋아요한 아이콘, 팔로워, 팔로잉을 테이블 리스트로 표시

#### My Profile Page
![My Profile](https://user-images.githubusercontent.com/89950902/227500804-d4dacb51-d9b1-4f2a-8ccc-647ae7f2ef09.PNG)

#### Other's Profile Page
![Other's Profile](https://user-images.githubusercontent.com/89950902/227500830-4d8c6806-6a54-4712-b164-30c9e27be666.PNG)

<br><br>

### 4. Detail Page
--------
1.  아이콘의 상세설명 및 다운로드 / 좋아요 페이지
      * 파일의 확장자가 SVG일 시, EDIT 버튼을 통해 편집 기능(PNG, JPG 불가)
      * Hashtag를 이용한 검색

#### Detail Page(SVG) EDIT 사용 가능
![My Icon](https://user-images.githubusercontent.com/89950902/227500848-592d4ea2-a328-40bf-9f6a-fd292ae871e1.PNG)

#### Detail Page(PNG) EDIT 사용 불가
![Icon Detail](https://user-images.githubusercontent.com/89950902/227500862-fdb4928c-199d-40dd-a319-4e3f261b4582.PNG)

<br><br>

## 긍정적 요소 & 아쉬운 요소

<p align="justify">

### 긍정적 요소
+ React의 공통 컴포넌트를 사용함으로써 개발 효율성 증가
  
+ 팀원간의 커뮤니케이션 및 일정 관리의 중요성 인지

### 아쉬운 요소
+ TypeScript 및 Redux 사용 미흡
  
+ 디자인 미흡
</p>

<br>
