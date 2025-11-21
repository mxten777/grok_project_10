import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc, addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../../components/ThemeToggle';
import type { Project } from '../../types/Project';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { motion } from 'framer-motion';
import { Trash2, Copy } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'mvpProjects', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProject({
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
          } as Project);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleClone = async () => {
    if (!project || !user) return;

    try {
      const { id, createdAt, updatedAt, ...projectData } = project;
      const clonedProject = {
        ...projectData,
        title: `${project.title} (복제본)`,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: user.uid
      };

      const docRef = await addDoc(collection(db, 'mvpProjects'), clonedProject);
      navigate(`/detail/${docRef.id}`);
    } catch (error) {
      console.error('Error cloning project:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert('프로젝트 복제 중 오류가 발생했습니다: ' + errorMessage);
    }
  };

  const handleDelete = async () => {
    if (!project || !user || !id) return;
    
    // 소유권 확인
    if (project.createdBy && project.createdBy !== user.uid) {
      alert('이 프로젝트를 삭제할 권한이 없습니다.');
      return;
    }

    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'mvpProjects', id));
      navigate('/');
    } catch (error) {
      console.error('Error deleting project:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert('프로젝트 삭제 중 오류가 발생했습니다: ' + errorMessage);
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <motion.div className="container mx-auto p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          <Button onClick={() => navigate(`/edit/${project.id}`)}>Edit</Button>
          <Button onClick={handleClone} variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Clone
          </Button>
          {user && project.createdBy === user.uid && (
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>프로젝트 삭제</DialogTitle>
                  <DialogDescription>
                    정말로 "{project.title}" 프로젝트를 삭제하시겠습니까? 
                    이 작업은 되돌릴 수 없습니다.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setDeleteDialogOpen(false)}
                    disabled={deleting}
                  >
                    취소
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? '삭제 중...' : '삭제'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {project.thumbnail && <img src={project.thumbnail} alt="Thumbnail" className="w-full max-w-md mb-4" />}

      <div className="space-y-4">
        <p><strong>Subtitle:</strong> {project.subTitle}</p>
        <p><strong>Category:</strong> {project.category}</p>
        <p><strong>URL:</strong> <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a></p>
        <div>
          <strong>Tech Stack:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.techStack.map(tech => <Badge key={tech}>{tech}</Badge>)}
          </div>
        </div>
        <div>
          <strong>Docs:</strong>
          <ul className="list-disc list-inside mt-2">
            {project.docs.map(doc => <li key={doc}><a href={doc} target="_blank" rel="noopener noreferrer">{doc}</a></li>)}
          </ul>
        </div>
        <p><strong>Note:</strong> {project.note}</p>
        <p><strong>Status:</strong> {project.status}</p>
        <p><strong>Version:</strong> {project.version}</p>
        <p><strong>Created:</strong> {project.createdAt.toLocaleDateString()}</p>
        <p><strong>Updated:</strong> {project.updatedAt.toLocaleDateString()}</p>
      </div>
    </motion.div>
  );
}