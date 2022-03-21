# Chatting App

지금까지 계속 공부만 해왔는데, 이를 좀더 능숙하게 사용 할 수있게 배웠던 스킬들을 토대로 카카오톡 같은 채팅 사이트을 만들어보려 합니다.

프로젝트를 진행하면서 

* socket.io를 이용한 채팅 
* recoil를 이용하여 유저의 정보 저장 
* Dark 모드
* typescript를 이용한 type 정의
* react-router-dom 이용
등등의 기술을 구현 해볼 겁니다.

반응형까지 작업 해볼것이고, 끝나는대로 React-native로 어플 제작도 할 계획입니다.

<br />

## 이슈

<br />

* cors 오류

<br />

> 지난번에 socket 공부를 할 때는 nodeJs에서 html파일을 불러와서 띄웠기 때문에, cors 오류가 딱히 없었다. 허나 이번엔 react로 작업을 진행했고, 서로 같은 로컬이라도 다른 포트 번호로 실행 시켰기 때문에 cors 오류가 떴다. 여러 가지 방법을 써서 해결해봤지만, babel 설정 오류 때문인지 cors import가 계속 오류가 났다. 때문에 scoket 관련 공식 문서를 통해 해결했다.

<br />
server.js
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