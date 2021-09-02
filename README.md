# 밀착 MealChak

- [MealChak](https://mealchak.com/)
- [FrontEnd Github](https://github.com/hanghae99-MEALCHAK/MEALCHAK-client-application)
- [BackEnd Github](https://github.com/hanghae99-MEALCHAK/MEALCHAK-server-application)
- [MealChak Notion](https://www.notion.so/Meal-4e2b5486d44e4123a1d352a63eb0d414)
- [MealChak Instagram](https://www.instagram.com/mealchak/)

# **프로젝트 소개**

점심을 시켜먹고 싶은데  최소 주문 금액이 높아 1인분 만 시킬 수가 없어서,
때론 배달비가 아깝거나 가격이 비싸서, 때론 양이 너무 많아서
메뉴를 바꾸거나 망설인적이 있으신가요? 
그런 분들을 위한 배달 모임 서비스 **밀착**입니다! 
**밀착**으로 같이 배달을 시킬 **친구**를 찾아 보세요.

# **Target**

- 최소 주문금액 때문에 먹고 싶은걸 포기하는 모든 이들
- 배달비가 부담스러운 사회 초년생과 대학생
- 혼자 밥먹는게 싫은 1인 가구

# **기획 배경**

> 우리는 코로나 이후에 배달 음식을 더 많이 주문하게 되었습니다. 
만약 내가 다른 이웃과 같은 음식점에서 같이 주문을 한다면
배달비도 절약할 수 있고 환경 보호에도 긍정적인 작용을 할 것이라는 생각을 했습니다.

밀착을 통해 같이 음식을 주문할 동네 친구를 찾아 배달을 한다면 사용자는 배달비를 아끼고 그와 동시에 탄소 배출량을 줄이는 효과로 환경 보호에도 작은 도움이 됩니다.

# **밀착 Team 소개**

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

- 회원가입 없이 카카오톡으로 로그인을 할 수 있습니다.
- 오늘의 인기 메뉴를 확인 할 수 있습니다.
- 사용자의 위치를 지정하여 주변 3KM이내의 모집글들만 조회 합니다.
- 사용자의 위치와 작성된 모집글과의 거리를 나타냅니다.
- 모집글을 작성한 사용자는 참가를 희망하는 사용자의 매너 점수 및 기본 정보를 조회하여 모집 참여에 동의/거절 을 할 수있습니다.
- 마이페이지에서 프로필 사진 및 한 줄 소개, 연령, 성별과 같은 기본 정보의 기입을 유도하여 다른 유저들에게 대략적인 정보를 제공합니다.
- 다른 사용자와의 밀착 경험을 리뷰와 매너 점수로 평가 할 수 있습니다.
- 모집에 참여한 사용자들은 실시간 채팅을 통해 소통을 할 수 있습니다.
- 모집글을 작성한 사용자는 해당 모집에 참여한 사용자를 강제 퇴장 시킬 수 있습니다.

<img width="100%" alt="meal-feature" src="https://user-images.githubusercontent.com/73174694/131767800-900310b9-9ff6-4048-985b-572b3b806051.png">

# 사용 패키지
* **Redux (redux-actions, immer)**
  * 데이터 전역 관리를 위한 리덕스 관리
* **connected-react-router, history**
  * 라우팅 및 페이지 이동을 위한 패키지
* **axios**
  * 서버 통신을 위한 패키지
* **swiper**
  * 슬라이더 구현 패키지
* **react-image-file-resizer**
  * 이미지 업로드 최적화를 위한 image resizer
* **sockjs-client, stompjs**
  * 실시간 웹 소켓 통신을 위한 패키지
* **moment**
  * 시간 및 날짜 설정을 위한 패키지
* **react-daum-postcode**
  * 위치 기반의 서비스를 위한 주소 설정 패키지
* **styled-components**
  * 컴포넌트 스타일 설정 패키지

# Tech Structure

<img width="100%" alt="Screen Shot 2021-09-02 at 11 07 31 AM" src="https://user-images.githubusercontent.com/73174694/131769869-30748761-0ec3-485e-8869-1300a1a76cac.png">

# 트러블 슈팅


### 1 웹 소켓 간헐적 끊김


#### 문제 발견 과정
(onChange > useState > dispatch - action > state 값 변경 > 과도한 리렌더링)

1. 사용자의 채팅 메시지 작성 시, onChange 이벤트와 동시에 이벤트의 value값을 useState로 변경시키고 Redux에 저장하는 Action을 실행하는 구조로 되어 있어 웹 소켓에 구독중인 컴포넌트 전체에 과도한 리렌더링이 발생하였습니다.

2. 메시지 입력은 물론 채팅 지속 가능 시간도 2분이 채 되지 못하여 웹소켓이 끊어지고 채팅이 밀리는 현상이 나타났습니다.

3. 사용자가 새롭게 작성하는 메세지에 글자마다 onChange 이벤트와, Action이 걸려있었습니다. 뿐만 아니라 이렇게 발생한 상태값이 계속해서 리덕스에 저장되는 구조로 되어있어 구독 중인 컴포넌트 전체에 리렌더링이 발생하였습니다. 그러자 채팅 지속 가능 시간이 2분이 채 되지 못하여 웹소켓이 끊어지고 채팅이 밀리는 현상이 나타났습니다.
#### 해결 과정
1. 문제점 해결을 위한 첫 번째 시도
프로파일러로 확인해본 결과 과도한 리렌더링이 문제라고 판단하였고, 이를 해결 하기 위해 throttle 방식을 시도했습니다. 이벤트 발생 빈도의 약간의 유의미한 개선이 있었지만, throttle 타이밍 특성 상 마지막 값에 대한 송신이 불가하다는 문제가 있었습니다.

2. 두 번째 시도
두 번째 접근으로 ref.current 값이 변경될때 리렌더링이 발생하지않는다는 점에서 useRef를 활용하게 되었습니다. 그 결과 불필요하게 임시로 리덕스의 state를 변경하던 로직을 action 없이 바로 send 함수를 실행하는 방식으로 변경 할 수 있었고 과도한 Action 발생과 리렌더링 이슈를 해결할 수 있었습니다.


#### 결과 및 소감
1. useState Hook을 통해 state값이 변하거나 Action을 실행시키는 dispatch가 동작할 때 렌더링이 일어나는 사실에 대한 정확한 이해가 부족하여, 과도한 리렌더링으로 인한 주요 채팅 기능의 오작동을 야기했습니다.

2. 현재는 onChange 마다 실행되던 dispatch 와 액션 부분을 삭제하였고, 그 대신 useRef의 defalutValue값을 소켓 메세지 함수의 파라미터로 사용하고 있습니다. 

3. 웹 소켓 끊어짐 현상이 해결되었고, 채팅 입력시 input의 text 밀림 현상 및 채팅 속도가 개선 되었습니다.

<img width="90%" alt="chat-disconnect" src="https://user-images.githubusercontent.com/73174694/131772390-5e3ad742-e5cf-4074-8cd2-fabce4bb2883.gif">
<img width="90%" alt="re-render" src="https://user-images.githubusercontent.com/73174694/131781941-50864bcc-d5cc-43ae-b831-14e5b856e414.png">

### 2 이미지 렌더링 속도 최적화
#### 문제 발견 과정
1. 사이즈가 큰 이미지의 경우 프로필 수정 이후 이미지 렌더링 되지 않는 현상 발생
2. 프로필 수정 api 요청의 응답이 페이지 렌더링 속도에 미치지 못하였다.
3. api 요청 전 페이지 이동이 되면서 수정 액션이 실행되지 않았음을 확인 하였다. (api 요청 응답 없음)

#### 해결 과정
1. 비동기 처리 순서에 문제가 있다고 생각해서, api 요청이 완료되기 전까지 로딩 처리를 하였고, 로딩이 완료 된 후 확인 알럿 처리를 하였다.
2. 그럼에도 불구하고 로딩이 너무 오래 걸리는 현상이 발생하여 서버에 올려주는 이미지의 용량이 매우 큰 것이 문제라고 판단하였다.
3. 이미지 리사이징 라이브러리를 통해 서버로 api 요청 전 리사이징 된 이미지를 넘겨주었다.
#### 결과 및 소감
1. 큰 용량의 이미지를 업로드 해도 최대 사이즈가 300px을 넘지 않게 되었고, 처리 속도가 향상 되었다.
2. 이전까지 서버에서 이미지 리사이징을 해왔지만 이것을 계기로 프론트 단의 처리가 필요함을 느꼈다. 

### 3 Build 실시간 적용되지 않는 문제
####[velog에서 확인](https://velog.io/@yjh8806/s3-%EB%B2%84%ED%82%B7%EC%97%90-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%9C-build%ED%8C%8C%EC%9D%BC%EC%9D%B4-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%A0%81%EC%9A%A9%EB%90%98%EC%A7%80-%EC%95%8A%EB%8A%94-%EB%AC%B8%EC%A0%9C)
