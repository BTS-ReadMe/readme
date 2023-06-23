# 프로젝트명
>  실시간 소통 웹소설 컨텐츠 플랫폼 "ReadMe" 입니다!

## 소개
[실시간 소통 웹소설 컨텐츠 플랫폼]은 독자들이 웹소설을 읽는 동안 감정을 실시간으로 공유하고, 소통할 수 있는 서비스입니다. 이 플랫폼의 핵심 기능은, 독자들이 소설의 각 문장에 이모지를 추가하여 그 순간의 감정을 즉시 표현할 수 있다는 것입니다. SSE(Server-Sent Events) 기술을 적용하여 높은 실시간과 원활한 상호작용을 제공합니다. 이 서비스는 독자들이 소설과 관련된 감정을 더 깊게 표현하고 공유할 수 있도록 설계되어, 소설을 읽는 새로운 방식을 제시합니다.

## 참여 기간
2023. 04.11 ~ 2023. 06.15

## Tech stack
Frontend  
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white" />
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
<img src="https://img.shields.io/badge/React%20Query-FF4154?style=flat&logo=ReactQuery&logoColor=white" />
<img src="https://img.shields.io/badge/Recoil-5A29E4?style=flat&logo=Recoil&logoColor=white" />
<img src="https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=PWA&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" />
<img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white" />
<img src="https://img.shields.io/badge/Ant%20Design-0170FE?style=flat&logo=AntDesign&logoColor=white" />
<img src="https://img.shields.io/badge/Axios-000000?style=flat&logo=Axios&logoColor=white" />

Tool  
<img src="https://img.shields.io/badge/IntelliJ IDEA-000000?style=flat&logo=IntelliJ IDEA&logoColor=white" />
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=flat&logo=GitHub Actions&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=Docker&logoColor=white" />
<img src="https://img.shields.io/badge/Google Cloud-4285F4?style=flat&logo=Google Cloud&logoColor=white" />

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki

## 멤버
  * FE
    - 김민경 : User 서비스, Search, Viewer 서비스, BFF 처리, Client Data 최적화
    - 이시현 : User Sign In/Up 플로우 처리, 충전/결제 기능, 관리자, 내서재, Profile 포함 운영 기능

## 기능
|메인|소설|검색|
|:-:|:-:|:-:|
|<img src="https://github.com/BTS-ReadMe/.github/assets/110506500/48d5b681-c6b7-4471-aeb5-a19c10ff144f" width="200" height="500" alt="이미지">|<img src="https://github.com/BTS-ReadMe/.github/assets/110506500/ad986a26-091f-4db4-8382-25479707c984" width="200" height="500" alt="이미지">|<img src="https://github.com/BTS-ReadMe/.github/assets/110506500/9315179f-606c-4085-8be2-3f5731d59e3e" width="200" height="500" alt="이미지">

|소설상세페이지 - 홈|에피소드|댓글|연령제한(15세 미만일때)|
|:-:|:-:|:-:|:-:|
|![image](https://github.com/BTS-ReadMe/readme/assets/113071800/137fc040-8ddb-42de-9107-296bf60a03e8)|![image](https://github.com/BTS-ReadMe/readme/assets/113071800/207cb9f5-6324-486c-a684-26b61c680bed)|![image](https://github.com/BTS-ReadMe/readme/assets/113071800/38e8458c-d84f-47a6-ae09-c0037959b2f9)|![image](https://github.com/BTS-ReadMe/readme/assets/113071800/607bb0a4-b726-48e0-879b-65f874ec324d)


|소설뷰어페이지 - 평점 등록/수정|댓글 등록|이전화/다음화 보기|이모지 추가|
|:-:|:-:|:-:|:-:|
|![image](https://github.com/BTS-ReadMe/readme/assets/113071800/97f6709b-cba9-4377-9b1c-f4e5cc552202)|![image](https://github.com/BTS-ReadMe/readme/assets/113071800/ed0d318c-1972-452d-be16-821a579b12a6)|![image](https://github.com/BTS-ReadMe/readme/assets/113071800/8c355628-6dd4-4684-8ae9-287f5508b49a)|![image](https://github.com/BTS-ReadMe/readme/assets/113071800/b1e80cc5-74f4-429c-b83a-a605f1459216)|

## 구현 패턴
#### 코드의 안정성과 효율성을 위한 React Query 및 TypeScript 사용
React Query를 활용하여 데이터 패칭, 캐싱, 에러 핸들링을 효율적으로 관리하였고, 사용자 자주 접하는 요소에 대해 캐싱을 적용하여 API 호출을 최적화하였습니다. 
TypeScript를 도입하여 코드의 안정성을 높이고, 타입 안정성을 확보하여 개발 과정에서 오류를 줄였습니다.
#### SSR, CSR 적용과 SEO 최적화
메인페이지, 소설 상세페이지, 조회 페이지에서 SSR(Server Side Rendering)을 적용하여 페이지 로딩 성능을 개선하였고 LightHouse를 이용한 성능 테스트 결과 50에서 78로 상승시켰습니다. 
SEO 최적화를 위해 이미지에 적절한 alt 태그를 부여하고, 페이지 title과 description을 최적화하여 검색 엔진 최적화하여 검색 엔진 노출을 향상시켰습니다.
#### 사용자 최적화 환경
소설을 클릭하고 이전 버튼을 눌렸을경우 스크롤을 기억하여 마지막 스크롤로 되돌아 갈 수 있게 구현하였습니다. 최소한의 동작으로 원하는 정보를 제공하고자합니다.
사용자 경험 향상을 위해 다른 서비스 사이트를 벤치마킹하고, 사용자에게 선택의 폭을 주기 위해 Card/List 형식의 뷰를 제공합니다.

## FrontEnd 개발 환경 설정
Node.js의 버전은 v18.16.0입니다.
```sh
설치 : npm install or yarn
실행 : npm run devlocal or yarn devlocal
```

## 디렉토리 구조
Repo
```
├─components
│  ├─layouts
│  ├─pages
│  │  ├─admin
│  │  ├─library
│  │  ├─main
│  │  ├─mypage
│  │  ├─novel
│  │  ├─noveldetail
│  │  ├─point
│  │  ├─search
│  │  └─viewer
│  ├─ui
│  └─widget
├─data
├─pages
│  ├─admin
│  ├─api
│  ├─noveldetail
│  └─viewer
├─public
│  └─assets
│      └─images
│          └─icons
├─state
├─styles
│  └─common
└─types
   ├─admin
   ├─service
   └─user
```
    
## 페이지 접근 권한
|권한|이름|
|:-:|:-:|
|ADMIN|관리자|
|USER|로그인한 유저|
|GUEST|게스트|


