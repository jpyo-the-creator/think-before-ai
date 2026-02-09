# Think Before AI - 배포 가이드

## 🚀 빠른 시작

### 로컬 테스트
```bash
cd think-before-ai
npm install
npm start
```

현재 버전은 시뮬레이션 모드로 작동합니다 (3초 대기 후 더미 응답).

---

## 🔑 실제 API 연결하기

### 1. Anthropic API 키 발급
1. https://console.anthropic.com/ 접속
2. API Keys 메뉴에서 새 키 생성
3. 키 복사

### 2. 환경 변수 설정
```bash
# .env 파일 생성
cp .env.example .env

# .env 파일 편집하여 API 키 입력
REACT_APP_ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

### 3. API 버전으로 전환
```bash
# src/App.jsx를 백업하고 API 버전으로 교체
mv src/App.jsx src/App-demo.jsx
mv src/App-with-API.jsx src/App.jsx

# 재시작
npm start
```

---

## 📦 배포하기

### Vercel (추천)
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 환경 변수 설정
vercel env add REACT_APP_ANTHROPIC_API_KEY
```

### Netlify
```bash
# 빌드
npm run build

# Netlify에 build 폴더 드래그 앤 드롭
# 또는 netlify-cli 사용
npm i -g netlify-cli
netlify deploy --prod
```

**중요**: 배포 시 환경 변수를 플랫폼 설정에서 추가해야 합니다.

---

## 📊 데이터 수집 및 분석

현재 localStorage를 사용하여 다음 데이터를 저장합니다:
- 질문 내용
- 사용자 답변 (길이, 문장 수)
- AI 답변
- 타임스탬프

### 데이터 확인
브라우저 개발자 도구 → Console에서:
```javascript
JSON.parse(localStorage.getItem('thinkBeforeAI'))
```

### 향후 개선 (Firebase/Supabase 연결)
실제 분석을 위해서는 백엔드 DB 연결이 필요합니다.

---

## 🧪 테스트 계획

### Week 1 목표
- [ ] 친구 5-10명 테스트 참여
- [ ] 최소 3일 이상 사용
- [ ] 매일 1-2개 질문 권장

### 측정 지표
1. **제출률**: 전체 세션 중 실제 답변 제출한 비율
2. **평균 답변 길이**: 사용자가 작성한 평균 글자 수
3. **빈 답변률**: 최소 기준만 채우고 제출하는 비율
4. **재사용률**: 다시 돌아와서 사용하는 비율

### 인터뷰 질문
- 자신의 생각을 먼저 적는 게 도움이 되었나요?
- 어떤 점이 불편했나요?
- AI 답변과 비교했을 때 어떤 느낌이었나요?
- 계속 사용하고 싶나요? 왜?

---

## 🔧 커스터마이징 아이디어

### UI 개선
- [ ] 다크 모드 추가
- [ ] 애니메이션 개선
- [ ] 모바일 최적화

### 기능 추가
- [ ] 히스토리 보기 (과거 질문/답변)
- [ ] 차이점 하이라이트 (내 답변 vs AI)
- [ ] 공유 기능
- [ ] 문장 수 조건 커스터마이징

### 데이터 분석
- [ ] 대시보드 추가
- [ ] 개인 통계 (질문 횟수, 평균 사고 시간)
- [ ] A/B 테스트 (최소 문장 수 변경)

---

## 📝 다음 프로젝트: 팀 검증 도구

Week 2에 만들 "AI 답변 카드 기반 팀 검증 도구"와 연결 가능성:
- 이 도구에서 생성된 AI 답변을 자동으로 카드로 변환
- 팀원들에게 공유하여 검증 받기
- 두 도구를 통합한 워크플로우

---

## 🐛 문제 해결

### API 호출이 안 됨
- .env 파일이 제대로 설정되었는지 확인
- API 키가 유효한지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### CORS 에러
- 프로덕션 배포 필요 (로컬에서는 프록시 설정 필요)
- 또는 백엔드 서버를 통한 API 호출

---

## 💡 학습 포인트

이 프로젝트를 통해 배울 수 있는 것:
1. React 상태 관리 (useState, useEffect)
2. API 연동 (Anthropic Claude)
3. 폼 검증 (문장 수 체크)
4. 로컬 데이터 저장
5. 배포 프로세스

**핵심**: 아이디어 → 프로토타입 → 테스트 → 개선의 빠른 사이클!
