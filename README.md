# IconDB
----------
<p align="center">
  <br>
  <img src="/client/public/github_logo.png">
  <br>
</p>


## 프로젝트 소개

> IconDB는 아이콘을 무료로 배포하고 제작하는 웹사이트입니다. 사용자는 원하는 아이콘을 선택하여 사용 목적에 맞게 수정할 수 있습니다. 또한, 마음에 드는 사용자를 팔로우하거나 해시태그를 이용하여 원하는 아이콘을 찾을 수 있어 사용자의 목적에 부합하는 아이콘을 손쉽게 찾아 제작할 수 있습니다.

<br>

## 기술 스택

| JavaScript | CSS |  React   |  Node   | Notion |
| :--------: | :----: | :------: | :-----: | :-------: |
|   ![js]    |   ![css]    | ![react] | ![node] | ![Notion] |

<br>

## 구현 기능
> 반응형 웹사이트로, PC 및 모바일 버전이 분리되어 있습니다.

<br>

### 메인화면
---------
1. 상단 Header에 로그인 / 회원가입 기능 
    + 로그인이 되어있을 시, 포스팅 / 편집 / 마이페이지 / 로그아웃 기능으로 변경
    + 일정 스크롤이 내려가면 상단 Header에 검색 기능 추가
    + 모바일 버전에 맞는 Header 조정

#### PC
![Main](https://user-images.githubusercontent.com/89950902/227500136-5bbcd2de-8ac3-4115-8051-a3059cba8957.PNG)
#### Mobile
![Main(Mobile)](https://user-images.githubusercontent.com/89950902/227500164-908740ce-bd62-41e6-9cd1-276e1125e4ae.PNG)

<br>

### 아이콘 추가 및 업데이트
----------
1. 아이콘을 추가하거나 업데이트할 수 있는 기능
    + 로그인이 되어있을 때만 사용 가능
    + 간단한 설명 기능
    + 여러개의 아이콘 등록 불가

![Icon Update](https://user-images.githubusercontent.com/89950902/227500881-ce9ff7f7-48fd-4893-b7bc-90fe5f58a276.PNG)

<br>

### 원하는 사용자들 간의 팔로우
----------
1. 자신의 Profile 방문 시, 프로필 업데이트 기능
    + 다른 사람의 프로필 방문 시, 해당 기능 불가

2. 다른 사람의 Profile 방문 시, 팔로우 기능

3. 자신의 아이콘, 좋아요한 아이콘, 팔로워, 팔로잉을 리스트로 표시

#### My Profile
![My Profile](https://user-images.githubusercontent.com/89950902/227500804-d4dacb51-d9b1-4f2a-8ccc-647ae7f2ef09.PNG)
#### Other's Profile
![Other's Profile](https://user-images.githubusercontent.com/89950902/227500830-4d8c6806-6a54-4712-b164-30c9e27be666.PNG)

<br>

### 아이콘 상세페이지
--------
1.  아이콘의 상세설명 추가
    + 아이콘 등록자
    + 간단한 설명
    + 업로드 날짜
    + 좋아요 갯수

2.  좋아요 기능 
3.  다운로드 기능
4.  파일의 확장자가 SVG일 시, 편집 기능 추가(PNG, JPG 불가)
5.  간단한 설명 업데이트 및 삭제 기능
6.  해쉬태그를 추가하여 해쉬태그를 이용한 검색 기능

#### Icon(SVG)
![My Icon](https://user-images.githubusercontent.com/89950902/227500848-592d4ea2-a328-40bf-9f6a-fd292ae871e1.PNG)
#### Icon(PNG)
![Icon Detail](https://user-images.githubusercontent.com/89950902/227500862-fdb4928c-199d-40dd-a319-4e3f261b4582.PNG)

<br>

## 배운 점 & 아쉬운 점
-----
<p align="justify">

### 배운 점
+ React의 컴포넌트 기능을 사용해서 중복코드를 없앨 수 있었습니다.
  
+ 팀 프로젝트인만큼 팀원간의 의사소통이 중요하다는 것을 알았습니다.
  
+ Notion을 이용한 진척도 및 회의 내용을 기록하여 제출 기간내에 완성할 수 있었습니다.

### 아쉬운 점
+ React의 기능을 100% 활용 못 한것에 대한 아쉬움이 남았습니다.
  
+ 웹 디자이너의 부재로 디자인 측면에서 아쉬움이 있습니다.
</p>

<br>


<!-- Stack Icon Refernces -->

[js]: /client/public/javascript.svg
[css]: /client/public/css.svg
[react]: /client/public/react.svg
[node]: /client/public/nodedotjs.svg
[Notion]: /client/public/notion.svg
