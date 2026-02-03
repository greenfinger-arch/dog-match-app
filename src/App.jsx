import { useState } from 'react';
import { questions } from './data/questions';
import { dogs } from './data/dogs';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

function App() {
  const [page, setPage] = useState('home'); // home, quiz, loading, result
  const [currentStep, setCurrentStep] = useState(0);
  const [userScores, setUserScores] = useState({
    size: 0, energy: 0, noise: 0, care: 0, independence: 0, sociability: 0, trainability: 0
  });
  const [resultDog, setResultDog] = useState(null);

  // --- 사운드 효과 ---
  const playSound = (type) => {
    const audio = new Audio(type === 'bark' ? '/sounds/bark.mp3' : '/sounds/success.mp3');
    audio.play().catch(() => {});
  };

  // --- 🟢 모든 상태 초기화 함수 (중요!) ---
  const restartTest = () => {
    setPage('home');
    setCurrentStep(0);
    setResultDog(null);
    setUserScores({
      size: 0, energy: 0, noise: 0, care: 0, independence: 0, sociability: 0, trainability: 0
    });
  };

  // --- 답변 처리 로직 ---
  const handleAnswer = (scores) => {
    playSound('bark');
    const newScores = { ...userScores };
    Object.keys(scores).forEach(key => {
      newScores[key] = (newScores[key] || 0) + scores[key];
    });
    setUserScores(newScores);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setPage('loading');
      setTimeout(() => {
        const dog = findBestMatch(newScores);
        setResultDog(dog);
        setPage('result');
        playSound('success');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#fbbf24', '#ef4444']
        });
      }, 2500);
    }
  };

  // --- 매칭 알고리즘 ---
  const findBestMatch = (finalScores) => {
    return dogs.reduce((prev, curr) => {
      const prevDiff = calculateDifference(finalScores, prev.traits);
      const currDiff = calculateDifference(finalScores, curr.traits);
      return currDiff < prevDiff ? curr : prev;
    });
  };

  const calculateDifference = (user, dog) => {
    return Object.keys(dog).reduce((acc, key) => {
      return acc + Math.pow((user[key] || 0) - dog[key], 2);
    }, 0);
  };

  // --- 차트 데이터 변환 ---
  const getChartData = (traits) => [
    { subject: '에너지', A: traits.energy },
    { subject: '크기', A: traits.size },
    { subject: '훈련', A: traits.trainability },
    { subject: '사교성', A: traits.sociability },
    { subject: '독립성', A: traits.independence },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900 overflow-x-hidden">
      <AnimatePresence mode="wait">
        
        {/* 1. 시작 화면 */}
        {page === 'home' && (
          <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-3xl shadow-xl"
          >
            <h1 className="text-4xl font-black text-slate-800 leading-tight">나에게 맞는<br/><span className="text-blue-600">반려견 찾기</span></h1>
            <img src="/images/main.jpg" className="rounded-2xl shadow-lg w-full h-56 object-cover" alt="main" />
            <p className="text-slate-500 font-medium italic">"10개의 질문으로 당신의 소울메이트를 분석합니다."</p>
            <button onClick={() => { playSound('bark'); setPage('quiz'); }} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-xl hover:bg-blue-600 transition-all shadow-lg">테스트 시작하기</button>
            <footer className="pt-2 text-[10px] text-slate-300 uppercase tracking-widest font-bold">© All rights reserved.</footer>
          </motion.div>
        )}

        {/* 2. 퀴즈 화면 */}
        {page === 'quiz' && (
          <motion.div key={currentStep} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}
            className="max-w-md w-full space-y-6 bg-white p-6 rounded-3xl shadow-xl"
          >
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}></div>
            </div>
            <img src={questions[currentStep].image || "/images/main.jpg"} className="w-full h-44 object-cover rounded-2xl shadow-sm" alt="quiz-step" />
            <div className="space-y-1">
              <span className="text-blue-600 font-bold text-xs">QUESTION {currentStep + 1} / 10</span>
              <h2 className="text-xl font-bold text-slate-800">{questions[currentStep].question}</h2>
            </div>
            <div className="grid gap-3">
              {questions[currentStep].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option.scores)}
                  className="w-full p-4 text-left border-2 border-slate-50 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-semibold text-slate-700">
                  {option.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* 3. 로딩 화면 */}
        {page === 'loading' && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="max-w-md w-full text-center space-y-8 bg-white p-12 rounded-3xl shadow-xl"
          >
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-8 border-slate-100 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl">🐕</div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-800 animate-pulse">심층 분석 중...</h2>
              <p className="text-slate-400 font-medium text-sm">라이프스타일 매칭 엔진 가동 중</p>
            </div>
          </motion.div>
        )}

        {/* 4. 결과 화면 */}
        {page === 'result' && resultDog && (
          <motion.div key="result" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="text-center space-y-1">
              <span className="text-blue-600 font-black text-xs tracking-[0.2em] uppercase">Match Analysis Result</span>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">{resultDog.breed}</h2>
            </div>

            <img src={resultDog.image} alt={resultDog.breed} className="w-full h-56 object-cover rounded-2xl shadow-md" />

            {/* 방사형 차트 영역 */}
            <div className="bg-slate-50 rounded-2xl h-64 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={getChartData(resultDog.traits)}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }} />
                  <Radar name={resultDog.breed} dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-slate-600 text-center leading-relaxed font-medium text-sm">{resultDog.description}</p>

            <div className="flex gap-2 pt-2">
              <button onClick={() => { playSound('bark'); alert('링크가 복사되었습니다!'); }} className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors">결과 공유</button>
              {/* 🔴 수정한 다시하기 버튼 */}
              <button onClick={restartTest} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors">다시하기</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;