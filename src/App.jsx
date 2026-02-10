import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stage, setStage] = useState('question');
  const [question, setQuestion] = useState('');
  const [userThought, setUserThought] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [error, setError] = useState('');

  // 2문장 이상 체크
  useEffect(() => {
    const sentences = userThought.split(/[.!?]+/).filter(s => s.trim().length > 0);
    setCanSubmit(sentences.length >= 2);
  }, [userThought]);

  const callAnthropicAPI = async (prompt) => {
    try {
      const response = await fetch('http://think-before-ai-production.uprailway.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: prompt
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.answer;
    } catch (error) {
      throw new Error(`Failed to connect to server: ${error.message}`);
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setStage('thinking');
    setIsAiGenerating(true);
    setError('');

    try {
      // 실제 API 호출
      const response = await callAnthropicAPI(question);
      setAiResponse(response);
    } catch (err) {
      console.error('API 호출 실패:', err);
      setError(err.message);
      // 에러가 발생해도 데모를 위해 기본 응답 제공
      setAiResponse(`[데모 모드] "${question}"에 대한 답변입니다. 실제 배포시 API 키를 설정하면 실제 Claude 응답을 받을 수 있습니다.`);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleThoughtSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    
    // localStorage에 저장 (간단한 분석용)
    const timestamp = new Date().toISOString();
    const data = {
      timestamp,
      question,
      userThought,
      aiResponse,
      userThoughtLength: userThought.length,
      sentenceCount: userThought.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    };
    
    const history = JSON.parse(localStorage.getItem('thinkBeforeAI') || '[]');
    history.push(data);
    localStorage.setItem('thinkBeforeAI', JSON.stringify(history));
    
    setStage('result');
  };

  const handleReset = () => {
    setStage('question');
    setQuestion('');
    setUserThought('');
    setAiResponse('');
    setIsAiGenerating(false);
    setError('');
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
            <p className="loading-text">
              {isAiGenerating ? 'AI is generating a response...' : 'AI response is ready'}
            </p>
            {error && <p className="error-text">⚠️ {error}</p>}
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
