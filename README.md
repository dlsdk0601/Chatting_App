# Chatting App

지금까지 계속 공부만 해왔는데, 이를 좀더 능숙하게 사용 할 수있게 배웠던 스킬들을 토대로 카카오톡 같은 채팅 사이트을 만들어보려 합니다.

프로젝트를 진행하면서

-   socket.io를 이용한 채팅
-   recoil를 이용하여 유저의 정보 저장
-   Dark 모드
-   typescript를 이용한 type 정의
-   react-router-dom 이용
    등등의 기술을 구현 해볼 겁니다.

반응형까지 작업 해볼것이고, 끝나는대로 React-native로 어플 제작도 할 계획입니다.

<br />

## 실행

해당 깃을 클론 받고 npm i 후, nodemon 다운 받고 npm run dev로 서버를 실행 시키고, npm run start로 클라이언트를 실행시킬 수 있다.

<br />

## 이슈

<br />

-   cors 오류

<br />

> 지난번에 socket 공부를 할 때는 nodeJs에서 html파일을 불러와서 띄웠기 때문에, cors 오류가 딱히 없었다. 허나 이번엔 react로 작업을 진행했고, 서로 같은 로컬이라도 다른 포트 번호로 실행 시켰기 때문에 cors 오류가 떴다. 여러 가지 방법을 써서 해결해봤지만, babel 설정 오류 때문인지 cors import가 계속 오류가 났다. 때문에 scoket 관련 공식 문서를 통해 해결했다.

<br />

```server.js

    const socketIo = require("socket.io");
    const app = express();
    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

```

<br />

> Room change

<br />

한 유저가 룸을 생성한 후, 다른 유저가 입장 하게 되면 어떤 유저가 입장하였는데 알려주는 이벤트를 만들었다. 그런데 분명히 룸이 다름에도 유저의 입장 메세지가 계속 떴었는데, 이유는 한 루저가 여러 방에 들어와 있다보니 입장 메세지를 받은것이다. 유저1이 1번 2번방에 있고, 유저 2번 방으로 들어갔을때 1번방에도 입장메세지가 뜨는 이슈이다. 처음에는 유저가 다른 방으로 이동할 시에는 방을 떠나는 이벤트를 걸어놨으나 채팅방에 모든 유저가 떠나가면 룸이 사라지게 된다. 그래서 결국 룸의 모든 유저에게 메세지를 보내면 해당룸을 띄어놓은(useParams로 룸의 이름을 넣어놨다)유저에게만 메세지가 뜰수 있도록 분기 처리 하였다.

<br />

그리고 채팅의 기록을 DB에 저장하여 다시 방에 들어왔을때, 미리 띄워놓을까 고민 했지만 아직 DB를 다루는것에 서툴기에 다른 방법을 선택하였다.
입장한 룸의 갯수만큼 컴포넌트를 생성 해서 오프해놓은 컴포넌트는 display: none 처리 하였다.
채팅방이 많아지게되면 비효율적인 방법이지만, 개인 프로젝트를 하기에는 괜찮은 방법이기에 구현 해놓았다.

<br />

> User가 참여한 Room

<br />

해당 유저가 참여한 방을 찾기 위해서, 모든 룸 리스트와 해당 소켓의 아이디를 이용하여 유저가 참여한 방 리스트를 만들고 해당 UI에 표시하였다.
유저의 브라우저가 소켓과 연결이 성공하면 소켓은 유니크한 아이디값을 부여하고 이 아이디값으로 유저가 참여한 방 목록을 뽑을 수 있다.
sids.get(socket.id)를 이용하면, 해당 소켓이 참여한 방의 리스트를 알수 있다.

<br />

```
    const roomArr = Array.from(sids.get(socket.id)).filter(item => item !== socket.id);
    //유저가 들어간 룸 리스트
    const allRoomList: string[] = [...roomList()];
```
