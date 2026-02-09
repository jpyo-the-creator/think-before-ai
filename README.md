# Think Before AI

AI가 답변을 생성하는 동안, 사용자도 스스로 생각해보도록 유도하는 실험적 프로젝트입니다.

## 핵심 아이디어

- AI에게 질문을 하면, AI가 답변을 생성하는 동안 사용자도 자신의 생각을 적어야 합니다
- 최소 2문장 이상 작성해야 AI 답변을 볼 수 있습니다
- 의도적인 friction을 통해 사용자의 사고 시간을 확보합니다

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

브라우저에서 http://localhost:3000 으로 접속하세요.

## 다음 단계

현재는 시뮬레이션된 AI 응답을 사용합니다. 실제 배포를 위해서는:

1. Anthropic API 키 발급
2. `App.jsx`의 `handleQuestionSubmit` 함수에서 실제 API 호출 구현
3. 환경 변수로 API 키 관리 (.env 파일)

## 배포

```bash
# 빌드
npm run build

# Vercel, Netlify 등에 배포
```

## 테스트 계획

- Week 1: 친구 5-10명에게 테스트
- 측정 항목:
  - 실제 사용자 답변 제출률
  - 평균 답변 길이
  - 빈 답변 제출 비율
  - 사용 후 인터뷰

## 라이선스

MIT
