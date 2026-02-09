# 🚀 Think Before AI - 빠른 시작

## 첫 번째 프로토타입 완성! 🎉

당신의 아이디어를 실제 작동하는 앱으로 만들었습니다.

---

## 📦 설치하고 실행하기 (5분)

```bash
# 1. 프로젝트 폴더로 이동
cd think-before-ai

# 2. 의존성 설치
npm install

# 3. 실행!
npm start
```

브라우저가 자동으로 열리면서 `http://localhost:3000` 에 앱이 나타납니다.

---

## ✨ 지금 바로 테스트하기

현재 버전은 **데모 모드**로 작동합니다:
- AI 응답이 3초 후 자동 생성됩니다 (실제 API 호출 없음)
- 바로 테스트해볼 수 있습니다!

### 테스트 시나리오
1. 질문 입력: "인공지능의 미래는 어떻게 될까?"
2. AI 생성 중 화면에서 당신의 생각 2문장 이상 작성
3. 제출 후 비교 화면 확인

---

## 🔑 실제 Claude API 연결하기 (선택)

실제 Claude의 답변을 받고 싶다면:

1. **API 키 발급**: https://console.anthropic.com/
2. **환경 변수 설정**:
   ```bash
   cp .env.example .env
   # .env 파일에 API 키 입력
   ```
3. **API 버전으로 전환**:
   ```bash
   mv src/App.jsx src/App-demo.jsx
   mv src/App-with-API.jsx src/App.jsx
   npm start
   ```

자세한 내용은 `DEPLOYMENT.md` 참고!

---

## 📊 Week 1 실험 계획

### 목표
- 친구 5-10명 테스트 참여
- 각자 3일 이상 사용
- 피드백 수집

### 확인할 것들
1. ✅ 실제로 자신의 생각을 적나요?
2. ✅ 빈 텍스트로 제출하는 비율은?
3. ✅ friction이 짜증나나요, 유용한가요?
4. ✅ AI 답변과 비교가 도움이 되나요?

### 데이터 확인 방법
브라우저 개발자 도구 (F12) → Console에서:
```javascript
console.table(JSON.parse(localStorage.getItem('thinkBeforeAI')))
```

---

## 🎯 다음 단계

### 이번 주 (Week 1)
- [ ] 친구들에게 링크 공유
- [ ] 매일 피드백 수집
- [ ] 사용 패턴 관찰

### 다음 주 (Week 2)
- [ ] 두 번째 아이디어 프로토타입 시작
- [ ] "AI 답변 카드 기반 팀 검증 도구"
- [ ] 두 개 비교하여 어느 쪽이 더 강한지 판단

---

## 💡 빠른 배포 (선택)

친구들과 공유하려면:

```bash
# Vercel로 1분 배포
npm i -g vercel
vercel
```

링크가 생성되고 바로 공유 가능!

---

## 🐛 문제 생기면?

1. `npm install` 에러 → Node.js 최신 버전 설치
2. 포트 충돌 → `package.json`에서 포트 변경
3. 기타 문제 → README.md와 DEPLOYMENT.md 참고

---

## 🎊 축하합니다!

아이디어에서 실제 작동하는 프로토타입까지 **1시간 만에** 완성했습니다.

이제 실제로 사용하면서 배우고, 개선하고, 다음 버전을 만드세요!

**핵심**: 완벽하게 만들려고 하지 말고, 빠르게 테스트하고 배우세요. 🚀
