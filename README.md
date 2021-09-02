# MEALCHAK-client-application
# 밀착 MealChak

---

- [MealChak](https://mealchak.com/)
- [FrontEnd Github](https://github.com/hanghae99-MEALCHAK/MEALCHAK-client-application)
- [BackEnd Github](https://github.com/hanghae99-MEALCHAK/MEALCHAK-server-application)
- [MealChak Notion](https://www.notion.so/Meal-4e2b5486d44e4123a1d352a63eb0d414)
- [MealChak Instagram](https://www.instagram.com/mealchak/)

# **프로젝트 소개**

---

점심을 시켜먹고 싶은데  최소 주문 금액이 높아 1인분 만 시킬 수가 없어서,
때론 배달비가 아깝거나 가격이 비싸서, 때론 양이 너무 많아서
메뉴를 바꾸거나 망설인적이 있으신가요? 
그런 분들을 위한 배달 모임 서비스 **밀착**입니다! 
**밀착**으로 같이 배달을 시킬 **친구**를 찾아 보세요.

# **Target**

---

- 최소 주문금액 때문에 먹고 싶은걸 포기하는 모든 이들
- 배달비가 부담스러운 사회 초년생과 대학생
- 혼자 밥먹는게 싫은 1인 가구

# **기획 배경**

---

> 우리는 코로나 이후에 배달 음식을 더 많이 주문하게 되었습니다. 
만약 내가 다른 이웃과 같은 음식점에서 같이 주문을 한다면
배달비도 절약할 수 있고 환경 보호에도 긍정적인 작용을 할 것이라는 생각을 했습니다.

밀착을 통해 같이 음식을 주문할 동네 친구를 찾아 배달을 한다면 사용자는 배달비를 아끼고 그와 동시에 탄소 배출량을 줄이는 효과로 환경 보호에도 작은 도움이 됩니다.

# **밀착 Team 소개**

---

### 👨‍👨‍👧‍👦  팀원( 노션 링크 넣기)

- Frontend : 김건우, 이수진, 윤정현 `React`
- Backend : 박응수, 박강희, 이태경, 하연후 `SpringBoot`
- Designer : 박수진, 하유진 `UX/UI`

### 📅  진행 기간

- 21.07.23(금) - 21.08.31(화)

### 🎥  시연 영상

- 유툽링크링크

### 🗣️ **커뮤니케이션 툴**

- Github
- Slack
- Gather
- Discode

# 서비스 **소개**

---

- 회원가입 없이 카카오톡으로 로그인을 할 수 있습니다.
- 오늘의 인기 메뉴를 확인 할 수 있습니다.
- 사용자의 위치를 지정하여 주변 3KM이내의 모집글들만 조회 합니다.
- 사용자의 위치와 작성된 모집글과의 거리를 나타냅니다.
- 모집글을 작성한 사용자는 참가를 희망하는 사용자의 매너 점수 및 기본 정보를 조회하여 모집 참여에 동의/거절 을 할 수있습니다.
- 마이페이지에서 프로필 사진 및 한 줄 소개, 연령, 성별과 같은 기본 정보의 기입을 유도하여 다른 유저들에게 대략적인 정보를 제공합니다.
- 다른 사용자와의 밀착 경험을 리뷰와 매너 점수로 평가 할 수 있습니다.
- 모집에 참여한 사용자들은 실시간 채팅을 통해 소통을 할 수 있습니다.
- 모집글을 작성한 사용자는 해당 모집에 참여한 사용자를 강제 퇴장 시킬 수 있습니다.

<img width="1054" alt="밀착 소개" src="https://user-images.githubusercontent.com/61892583/131768163-6db407bb-1c89-415d-a8e3-638c9034c9d8.png"></img>


# 개발 환경

---

Server 

- `AWS EC2(Ununtu 18.04.5 LTS)ex`

DB 

- `Google SQL(MySQL)`

SCM 

- `Git(GitHub)`

ETC 

- `AWS S3`

FrontEnd(Language & Framework & Library)

- `JavaScript`
- Framework :`React 17.0.1`
- Build Tools : `Create React App`
- State Management : `Redux 4.0.5`,`Immer 8.0.1`
- Infrastructure : `AWS S3, Route53, Amazon CloudFront`
- Design Tool :`Figma`
- `Axios 0.21.1`
- `SockJS-Client 1.5.1` , `StompJS 2.3.3`
- `Swiper`
- `React-Image-File-Resizer 0.4.7`
- `React-Daum-Postcode 2.0.6`
- `Styled-Component 5.2.1`

BackEnd(Language & Framework & Library)

- `Java 8`
- `JDK 1.8.0`
- Framework : `Spring Boot 2.5.3`
- IDE : `IntelliJ IDEA 2021.1.2`
- Build Tools : `Gradle 7.1.1`
- ORM : `Spring Data JPA 2.5.3`
- `JWT 0.9.1`
- `Swagger 3.0.0`
- `Spring Sequrity 5.5.1`
- `CORS`
- `Websocket 5.3.9` , `SockJS 1.1.2` , `Stomp 5.3.9`
- `Redis 2.5.3`

### Tech Structure

![Screen Shot 2021-08-31 at 13.37.29 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d568dd46-954b-4052-8249-78faadddee48/Screen_Shot_2021-08-31_at_13.37.29_PM.png)

![2021-08-31_01-44-59.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8e40ad78-35e6-4056-a71d-c0c408c8db9a/2021-08-31_01-44-59.png)

![아키텍처.PNG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9eda7507-c81c-4a42-9c3b-84e5e5c52bb2/아키텍처.png)

# ERD

---

[https://drawsql.app/mealchak/diagrams/mealchak#](https://drawsql.app/mealchak/diagrams/mealchak#)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/995043ff-4c72-4401-b9cc-d1d078b86241/Untitled.png)

# 어려웠던 점 및 개선 방향

---

### 쿼리

- AS-IS

    즉시 로딩으로 인해 Post를 조회할 경우 Post와 연관된 ChatRoom, User, Menu 등의 Entity를 조회하는 N+1의 문제로 성능상의 이슈가 발생하였습니다.

- TO-BE

    메소드간의 영향을 끼치지 않기 위해 QueryDsl과 JPA repository의 사용을 분리하여 entity의 참조관계를 수정하지 않도록 하였습니다.

![KakaoTalk_Photo_2021-08-20-14-19-24.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/10302043-da3e-4bbd-871f-91dcbfc3c5c2/KakaoTalk_Photo_2021-08-20-14-19-24.gif)

                    (AS-IS)기존 API요청 응답속도

![KakaoTalk_Photo_2021-08-20-14-19-31.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cc66158b-799d-4f73-8460-a13438f8675f/KakaoTalk_Photo_2021-08-20-14-19-31.gif)

                     (TO-BE)현재 API요청 응답속도

### 모집글과 사용자의 거리를 구하는 방식

- AS-IS
     사용자와 모집글의 위치를 주소와 위도,경도로 받아 저장을 하고 모집글과 유저의 거리를 구할 때 주소를 구 단위(서울시 강남구)로 잘라 해당 구 안에 있는 모집글들만 불러와 거리를 구했습니다.
그러나 인접한 다른 구에서 작성된 모집글과 유저의 거리가 가까움에도 구의 이름이 달라 모집글을 불러오지 못하는 경우가 발생 하였고 이를 해결 하고자 고민을 하였습니다.
- TO-BE
    사용자와 모집글의 주소와 상관없이 위도와 경도를 이용하여 사용자의 위치 주변 3KM이내의 모집글만 불러와서 해당 모집글들에 사용자와의 거리를 입력하고 그 거리를 KEY값으로 TreeMap을 통해 오름차순 정렬을 하였습니다.

### 웹 소켓 간헐적 끊김

- AS-IS
    - 문제점 발견
    (onChange > useState > dispatch - action > state 값 변경 > ****과도한 리렌더링)

        사용자의 채팅 메시지 작성 시, onChange 이벤트와 동시에 이벤트의 value값을 useState로 변경시키고 Redux에 저장하는 Action을 실행하는 구조로 되어 있어 웹 소켓에 구독중인 컴포넌트 전체에 과도한 리렌더링이 발생하였습니다.

        → 메시지 입력은 물론 채팅 지속 가능 시간도 2분이 채 되지 못하여 웹소켓이 끊어지고 채팅이 밀리는 현상이 나타났습니다.

        사용자가 새롭게 작성하는 메세지에 글자마다 onChange 이벤트와, Action이 걸려있었습니다. 뿐만 아니라 이렇게 발생한 상태값이 계속해서 리덕스에 저장되는 구조로 되어있어 구독 중인 컴포넌트 전체에 리렌더링이 발생하였습니다. 그러자 채팅 지속 가능 시간이 2분이 채 되지 못하여 웹소켓이 끊어지고 채팅이 밀리는 현상이 나타났습니다.

    - 문제점 해결을 위한 첫 번째 시도

        프로파일러로 확인해본 결과 과도한 리렌더링이 문제라고 판단하였고, 이를 해결 하기 위해 throttle 방식을 시도했습니다. 이벤트 발생 빈도의 약간의 유의미한 개선이 있었지만, throttle 타이밍 특성 상 마지막 값에 대한 송신이 불가하다는 문제가 있었습니다.

    - 두 번째 시도

        두 번째 접근으로 ref.current 값이 변경될때 리렌더링이 발생하지않는다는 점에서 useRef를 활용하게 되었습니다. 그 결과 쓸데없이 임시로 리덕스의 state를 변경하지 않고 바로 send 함수를 실행하는 방식이 가능해졌고 과도한 Action 발생과 리렌더링 이슈를 해결할 수 있었습니다.

- TO-BE

    useState Hook을 통해 state값이 변하거나 Action을 실행시키는 dispatch가 동작할 때 렌더링이 일어나는 사실에 대한 정확한 이해가 부족하여, 과도한 리렌더링으로 인한 주요 채팅 기능의 오작동을 야기했습니다.

    현재는 onChange 마다 실행되던 dispatch 와 액션 부분을 삭제하였고, 그 대신 useRef의 defalutValue값을 소켓 메세지 함수의 파라미터로 사용하고 있습니다. 

    웹 소켓 끊어짐 현상이 해결되었고, 채팅 입력시 input의 text 밀림 현상 및 채팅 속도가 개선 되었습니다.

![Screen Shot 2021-08-31 at 15.31.32 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6ddbfb9-4d02-4a43-9ede-529136d9290e/Screen_Shot_2021-08-31_at_15.31.32_PM.png)

(AS-IS) 기존 렌더링

![Screen Shot 2021-08-31 at 15.34.05 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a4035d0c-4c9d-4c23-8286-cbcdb5fed8b6/Screen_Shot_2021-08-31_at_15.34.05_PM.png)

(TO-BE) 현재 렌더링

![chat_rendering.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5e2462c6-2f63-4f48-b4f1-712eeff9685e/chat_rendering.gif)

(AS-IS) 기존

### 이미지 렌더링 속도 최적화(front)

- AS-IS
 사이즈가 큰 이미지의 경우 프로필 수정 이후 이미지 렌더링 되지 않는 현상이 발생했다. 프로필 수정 api 요청의 응답이 페이지 렌더링 속도에 미치지 못하였다. api 요청을 하는동안 확인 알럿 처리를 하여 요청이 완료되기 전에 페이지 이동(확인 알럿 클릭)을 하면 수정 액션이 실행되지 않았음을 확인 하였다.
- TO-BE
 비동기 처리 순서에 문제가 있다고 생각해서, api 요청이 완료되기 전까지 로딩 처리를 하였고, 로딩이 완료 된 후 확인 알럿 처리를 하였다. 그럼에도 불구하고 로딩이 너무 오래 걸리는 현상이 발생하여 서버에 올려주는 이미지의 용량이 매우 큰 것이 문제라고 판단하였다. 이미지 리사이징 라이브러리를 통해 서버로 api 요청 전 리사이징 된 이미지를 넘겨주었다. 
 큰 용량의 이미지를 업로드 해도 최대 사이즈가 300px을 넘지 않게 되었고, 처리 속도가 향상 되었다. 이전까지 서버에서 이미지 리사이징을 해왔지만 이것을 계기로 프론트 단의 처리가 필요함을 느꼈다.

### Build 실시간 적용되지 않는 문제

- 재배포 시, S3버킷에 업로드 한 build파일이 반영되지 않는 문제가 발생해 지금까지 사용해 온 S3, Route 53, cloudfront에서 문제를 찾기 시작
- S3에 업로드 하는 과정에서의 문제로 추측했으나 S3와 확인 결과, 최신 정보가 기록되어 있었기 때문에 아닌 것으로 판단

    ![스크린샷 2021-08-31 오전 11.48.25.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/213c584f-590c-4211-b254-40380aee3ad8/스크린샷_2021-08-31_오전_11.48.25.png)

- 문제 발생 시점이 HTTP에서 HTTPS로 변경한 이후이므로 CloudFront의 문제일 것이라 추측
- 재배포 내용이 반영되지 않은 것은 CloudFront가 각각 Edge Location에서 데이터를 캐싱 후 기본 설정된 생명 주기동안에는 데이터를 새로 캐싱하지 않아서 발생한 문제임을 인식
    - (메모)
    - Edge Location - AWS의 CDN 서비스인(컨텐츠 전송 네트워크,Content Delivery Network) CloudFront를 위한 캐시 서버
    - 생명주기 - TTL(Time to live)
- AS-IS
    - 재배포 시, S3버킷에 업로드 한 build파일이 반영되지 않는 문제가 발생해 지금까지 사용해 온 S3, Route 53, cloudfront에서 문제를 찾기 시작
    - S3에 업로드 하는 과정에서의 문제로 추측했으나 S3와 확인 결과, 최신 정보가 기록되어 있었기 때문에 아닌 것으로 판단

        ![스크린샷 2021-08-31 오전 11.48.25.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/213c584f-590c-4211-b254-40380aee3ad8/스크린샷_2021-08-31_오전_11.48.25.png)

    - 문제 발생 시점이 HTTP에서 HTTPS로 변경한 이후이므로 CloudFront의 문제일 것이라 추측
    - 재배포 내용이 반영되지 않은 것은 CloudFront가 각각 Edge Location에서 데이터를 캐싱 후 기본 설정된 생명 주기동안에는 데이터를 새로 캐싱하지 않아서 발생한 문제임을 인식
        - (메모)
        - Edge Location - AWS의 CDN 서비스인(컨텐츠 전송 네트워크,Content Delivery Network) CloudFront를 위한 캐시 서버
        - 생명주기 - TTL(Time to live)
- TO-BE
    - CloudFront 콘솔 - 동작 탭에서 TTL을 설정해주는 방법이 있지만 빈번하게 수정, 배포해야하는 개발 상황이라 바로 캐시를 무효화하는 방법을 사용해 S3에 업로드 내용을 반영해 배포

        CloudFront 콘솔 - 동작(Behavior)탭

        ![스크린샷 2021-08-31 오전 11.29.02.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e3838010-ef0c-447a-b9c7-34e33983c1f9/스크린샷_2021-08-31_오전_11.29.02.png)

        ![스크린샷 2021-08-31 오전 11.34.31.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b5a26ee3-78a9-4044-bbc6-939b1bf45867/스크린샷_2021-08-31_오전_11.34.31.png)

        - CloudFront 콘솔 - 무효화 탭

        ![스크린샷 2021-08-31 오전 11.29.43.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e2ea95bf-6531-457b-8b56-5128d0ee9aa3/스크린샷_2021-08-31_오전_11.29.43.png)

        ![스크린샷 2021-08-31 오전 11.29.55.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6942c70a-53a5-47ca-b29b-f2de3f8f7daa/스크린샷_2021-08-31_오전_11.29.55.png)

        - 

        ![스크린샷 2021-08-31 오전 11.30.03.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/052a2231-7666-470d-a711-17b499070db7/스크린샷_2021-08-31_오전_11.30.03.png)

# **사용자 피드백**

---

"들어온 승인 요청에 알림 뱃지가 필요해요"

- 새로운 요청이나 채팅이 오면 뱃지를 통해 알 수 있도록 표시했습니다.

    ![2021-08-31_01-56-21.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/afbf5f03-4157-44af-a6c5-67399ef4489d/2021-08-31_01-56-21.png)

    ![2021-08-31_01-56-37.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/35cc002d-9ede-4803-a3ab-189f7b08439a/2021-08-31_01-56-37.png)

**"모집글 작성 시 가게이름으로 검색할 수 있었으면 좋겠어요"
"배달을 시킬 가게의 정보를 볼 수 있었으면 좋겠어요"**

- 배달 예정  식당을 TEXT로만 입력하던 기존 방식에서 식당을 검색하여 입력하는 기능을 추가하였고 모집글 에서 식당의 정보(메뉴, 평점, 위치 등)를 볼 수 있게 했습니다.

![2021-08-31_02-25-26.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2b5f71cf-0bab-444a-b917-0ae90c1c2eda/2021-08-31_02-25-26.png)

![2021-08-31_02-24-35.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2861c2d2-6ae9-425c-8917-e163e684b264/2021-08-31_02-24-35.png)

"**음식을 나눠서 각자가지고 갈지 같이 먹을지에 대한 카테고리가 있으면 좋을 것 같아요!**"

- 사용자들이 서로 만나 음식을 같이 먹을지 나눠 갖을지를 채팅을 통해 소통하여 정하게 하던 기존 방식에서 모집글을 작성할 때 미리 정하여 선택하여 참여할 수 있게 했습니다.

![2021-08-31_02-41-05.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c6cf5813-4b7f-482e-9f8b-e7e350d65456/2021-08-31_02-41-05.png)

![2021-08-31_02-41-38.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5d53d181-a50a-45fb-a415-31f4c3db3c52/2021-08-31_02-41-38.png)

# **앞으로의 개선점**

---

- 사용자가 앱에 머물거나  재사용 할 수 있도록 하는 유도 장치 필요
- 채팅에 사진 업로드
- 모임글을 외부로 링크형식으로 공유할 수 있는 기능
- 리뷰 등록에 권한 설정 ( 단일적인 기능이 아닌 이를 증명할 수 있는 기능까지 추가되어야 함)