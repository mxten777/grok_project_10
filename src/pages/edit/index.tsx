import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../../components/ThemeToggle';
import type { Project } from '../../types/Project';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { FileUploader } from '../../components/FileUploader';
import { Badge } from '../../components/ui/badge';
import { motion } from 'framer-motion';

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [docs, setDocs] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [techInput, setTechInput] = useState('');
  const [docInput, setDocInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'mvpProjects', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const proj = {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
          } as Project;
          setProject(proj);
          setTechStack(proj.techStack);
          setDocs(proj.docs);
          setThumbnail(proj.thumbnail || '');
          
          // 소유권 확인
          if (user && proj.createdBy && proj.createdBy !== user.uid) {
            alert('이 프로젝트를 수정할 권한이 없습니다.');
            navigate('/');
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !id) return;

    try {
      const docRef = doc(db, 'mvpProjects', id);
      await updateDoc(docRef, {
        ...project,
        techStack,
        docs,
        thumbnail,
        updatedAt: serverTimestamp(),
      });
      navigate(`/detail/${id}`);
    } catch (error) {
      console.error('Error updating project:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert('프로젝트 업데이트 중 오류가 발생했습니다: ' + errorMessage);
    }
  };

  const addTech = () => {
    if (techInput && !techStack.includes(techInput)) {
      setTechStack([...techStack, techInput]);
      setTechInput('');
    }
  };

  const addDocUrl = () => {
    if (docInput && !docs.includes(docInput)) {
      setDocs([...docs, docInput]);
      setDocInput('');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <motion.div className="container mx-auto p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <ThemeToggle />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input value={project.id} onChange={(e) => setProject({ ...project, id: e.target.value })} placeholder="Project ID" required />
        <Input value={project.category} onChange={(e) => setProject({ ...project, category: e.target.value })} placeholder="Category" required />
        <Input value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} placeholder="Title" required />
        <Input value={project.subTitle} onChange={(e) => setProject({ ...project, subTitle: e.target.value })} placeholder="Subtitle" required />
        <Input value={project.url} onChange={(e) => setProject({ ...project, url: e.target.value })} placeholder="URL" required />
        <div>
          <div className="flex gap-2">
            <Input value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Tech Stack" />
            <Button type="button" onClick={addTech}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {techStack.map(tech => <Badge key={tech}>{tech}</Badge>)}
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <Input value={docInput} onChange={(e) => setDocInput(e.target.value)} placeholder="Doc URL" />
            <Button type="button" onClick={addDocUrl}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {docs.map(doc => <Badge key={doc} variant="outline">{doc}</Badge>)}
          </div>
        </div>
        <Input value={project.note} onChange={(e) => setProject({ ...project, note: e.target.value })} placeholder="Note" />
        <FileUploader onUpload={setThumbnail} />
        <Input value={project.status} onChange={(e) => setProject({ ...project, status: e.target.value })} placeholder="Status" />
        <Input value={project.version} onChange={(e) => setProject({ ...project, version: e.target.value })} placeholder="Version" />
        <Button type="submit">Update Project</Button>
      </form>
    </motion.div>
  );
}