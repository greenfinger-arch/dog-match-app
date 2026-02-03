export const questions = [
  {
    id: 1,
    question: "현재 주로 생활하시는 공간은 어떤 형태인가요?",
    image: "/images/q1.jpg",
    category: "environment",
    options: [
      { text: "아늑한 아파트나 빌라", scores: { size: 1, energy: 2, noise: 1 } },
      { text: "마당이 있는 넓은 주택", scores: { size: 5, energy: 5, noise: 5 } }
    ]
  },
  {
    id: 2,
    question: "강아지와 함께하는 하루 산책 시간은 어느 정도 예상하시나요?",
    image: "/images/q2.jpg",
    category: "activity",
    options: [
      { text: "30분 내외의 가벼운 산책", scores: { energy: 1, trainability: 2 } },
      { text: "1시간 이상의 역동적인 활동", scores: { energy: 5, trainability: 4 } }
    ]
  },
  {
    id: 3,
    question: "이웃과의 거리나 개인적 성향상, 짖음(소음)에 얼마나 민감하신가요?",
    image: "/images/q3.jpg",
    category: "noise",
    options: [
      { text: "매우 민감함 (조용한 친구가 좋아요)", scores: { noise: 1 } },
      { text: "어느 정도는 괜찮음 (씩씩해도 좋아요)", scores: { noise: 4 } }
    ]
  },
  {
    id: 4,
    question: "털 빠짐이나 주기적인 미용 등 위생 관리에 할애할 시간은?",
    image: "/images/q4.jpg",
    category: "care",
    options: [
      { text: "최소한의 관리를 선호해요", scores: { care: 1 } },
      { text: "매일 빗질하며 꼼꼼히 관리할 수 있어요", scores: { care: 5 } }
    ]
  },
  {
    id: 5,
    question: "하루 중 강아지가 혼자 집을 지켜야 하는 시간은 얼마나 되나요?",
    image: "/images/q5.jpg",
    category: "independence",
    options: [
      { text: "4시간 미만 (거의 같이 있어요)", scores: { independence: 1 } },
      { text: "6시간 이상 (집을 비우는 편이에요)", scores: { independence: 5 } }
    ]
  },
  {
    id: 6,
    question: "함께 거주하는 가족 중에 어린 아이나 어르신이 계신가요?",
    image: "/images/q6.jpg",
    category: "family",
    options: [
      { text: "예, 배려심 깊은 친구가 필요해요", scores: { sociability: 5, trainability: 5 } },
      { text: "아니오, 에너지가 넘쳐도 상관없어요", scores: { sociability: 2, energy: 4 } }
    ]
  },
  {
    id: 7,
    question: "반려견을 키워보신 경험이나 훈련에 대한 자신감은?",
    image: "/images/q7.jpg",
    category: "experience",
    options: [
      { text: "처음이라 서툴고 조심스러워요", scores: { trainability: 1 } },
      { text: "경험이 있고 단호한 훈련도 자신 있어요", scores: { trainability: 5 } }
    ]
  },
  {
    id: 8,
    question: "어떤 성향의 강아지에게 더 매력을 느끼시나요?",
    image: "/images/q8.jpg",
    category: "personality",
    options: [
      { text: "애교 많고 항상 붙어있는 해바라기", scores: { sociability: 5, independence: 1 } },
      { text: "적당한 거리를 둘 줄 아는 쿨한 동반자", scores: { sociability: 2, independence: 5 } }
    ]
  },
  {
    id: 9,
    question: "대형견 특유의 높은 유지비용(사료, 병원비 등)을 감당할 준비가 되셨나요?",
    image: "/images/q9.jpg",
    category: "budget",
    options: [
      { text: "실속 있고 효율적인 관리를 원해요", scores: { size: 1, budget: 1 } },
      { text: "비용이 들어도 듬직한 대형견이 좋아요", scores: { size: 5, budget: 5 } }
    ]
  },
  {
    id: 10,
    question: "마음속으로 생각하고 있는 강아지의 크기는?",
    image: "/images/q10.jpg",
    category: "size",
    options: [
      { text: "품 안에 쏙 들어오는 소형견", scores: { size: 1 } },
      { text: "존재감 넘치는 중/대형견", scores: { size: 5 } }
    ]
  }
];