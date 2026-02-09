import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stage, setStage] = useState('question'); // 'question', 'thinking', 'result'
  const [question, setQuestion] = useState('');
  const [userThought, setUserThought] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  // 2문장 이상 체크
  useEffect(() => {
    const sentences = userThought.split(/[.!?]+/).filter(s => s.trim().length > 0);
    setCanSubmit(sentences.length >= 2);
  }, [userThought]);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setStage('thinking');
    setIsAiGenerating(true);

    // AI API 호출 시뮬레이션 (실제로는 Anthropic API 호출)
    // 실제 구현시 여기에 API 키와 함께 fetch 요청
    setTimeout(() => {
      setAiResponse(`이것은 "${question}"에 대한 AI의 답변입니다. 실제 프로젝트에서는 Anthropic API를 호출하여 실제 답변을 받아옵니다.`);
      setIsAiGenerating(false);
    }, 3000);
  };

  const handleThoughtSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStage('result');
  };

  const handleReset = () => {
    setStage('question');
    setQuestion('');
    setUserThought('');
    setAiResponse('');
    setIsAiGenerating(false);
  };

  return (
    <div className="App">
      {stage === 'question' && (
        <div className="stage-container">
          <h1>Think Before AI</h1>
          <p className="subtitle">Think together with AI</p>
          
          <form onSubmit={handleQuestionSubmit} className="question-form">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question..."
              className="question-input"
              rows="4"
            />
            <button type="submit" className="submit-btn" disabled={!question.trim()}>
              Start
            </button>
          </form>
        </div>
      )}

      {stage === 'thinking' && (
        <div className="stage-container">
          <div className="loading-container">
            {isAiGenerating && (
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
            )}
            <p className="loading-text">AI is generating a response...</p>
          </div>

          <div className="thinking-section">
            <h2>What are your thoughts right now?</h2>
            <p className="prompt-text">Write them down, even if they're rough!</p>
            
            <form onSubmit={handleThoughtSubmit}>
              <textarea
                value={userThought}
                onChange={(e) => setUserThought(e.target.value)}
                placeholder="Write your thoughts freely..."
                className="thought-input"
                rows="8"
              />
              
              <div className="submit-info">
                <span className={canSubmit ? 'valid' : 'invalid'}>
                  {canSubmit ? '✓ Ready to submit' : 'Please write at least 2 sentences'}
                </span>
              </div>

              <button 
                type="submit" 
                className="submit-btn" 
                disabled={!canSubmit || isAiGenerating}
              >
                Submit and see AI response
              </button>
            </form>
          </div>
        </div>
      )}

      {stage === 'result' && (
        <div className="stage-container">
          <h1>Q: {question}</h1>
          
          <div className="result-grid">
            <div className="result-card">
              <h3>Your Thoughts</h3>
              <div className="content">
                {userThought}
              </div>
            </div>

            <div className="result-card">
              <h3>AI Response</h3>
              <div className="content">
                {aiResponse}
              </div>
            </div>
          </div>

          <button onClick={handleReset} className="reset-btn">
            Ask New Question
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
