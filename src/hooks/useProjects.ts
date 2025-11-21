import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Project } from '../types/Project';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      console.log('Fetching projects from Firestore...');
      const q = query(collection(db, 'mvpProjects'), orderBy('updatedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      console.log('Found documents:', querySnapshot.docs.length);
      
      const projectsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      }) as Project[];
      
      setProjects(projectsData);
      console.log('Projects loaded successfully:', projectsData.length);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Firestore 권한 오류일 가능성이 높음
      if (error && typeof error === 'object' && 'code' in error && error.code === 'permission-denied') {
        console.warn('Firestore 권한이 거부되었습니다. Firebase 보안 규칙을 확인하세요.');
      }
      // 에러가 있어도 빈 배열로 설정
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleBookmark = async (projectId: string) => {
    try {
      const project = projects.find(p => p.id === projectId);
      if (!project) return;

      const newBookmarked = !project.bookmarked;
      await updateDoc(doc(db, 'mvpProjects', projectId), {
        bookmarked: newBookmarked
      });

      // 로컬 상태 업데이트
      setProjects(prev => prev.map(p => 
        p.id === projectId ? { ...p, bookmarked: newBookmarked } : p
      ));
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  return { projects, loading, toggleBookmark };
};