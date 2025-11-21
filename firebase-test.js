// Firebase 설정 테스트
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAFgQZcMhkqdK_4hadm8cSqig7Yo8u8jsg",
  authDomain: "grok-project-10.firebaseapp.com",
  projectId: "grok-project-10",
  storageBucket: "grok-project-10.firebasestorage.app",
  messagingSenderId: "399366044016",
  appId: "1:399366044016:web:206d2f1222991d6f4777b5"
};

try {
  console.log('Firebase 설정 테스트 시작...');
  const app = initializeApp(firebaseConfig);
  console.log('✅ Firebase 앱 초기화 성공');
  
  const db = getFirestore(app);
  console.log('✅ Firestore 연결 성공');
  console.log('프로젝트 ID:', firebaseConfig.projectId);
  
} catch (error) {
  console.error('❌ Firebase 오류:', error.message);
}