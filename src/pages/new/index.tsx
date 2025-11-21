import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../../components/ThemeToggle';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { FileUploader } from '../../components/FileUploader';
import { Badge } from '../../components/ui/badge';
import { motion } from 'framer-motion';

interface FormData {
  id: string;
  category: string;
  title: string;
  subTitle: string;
  url: string;
  techInput: string;
  docInput: string;
  note: string;
  status: string;
  version: string;
}

export default function NewProject() {
  const { register, handleSubmit } = useForm<FormData>();
  const { user } = useAuth();
  const [techStack, setTechStack] = useState<string[]>([]);
  const [docs, setDocs] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [techInput, setTechInput] = useState('');
  const [docInput, setDocInput] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    
    try {
      
      await addDoc(collection(db, 'mvpProjects'), {
        id: data.id,
        category: data.category,
        title: data.title,
        subTitle: data.subTitle,
        url: data.url,
        techStack,
        docs,
        note: data.note,
        thumbnail,
        status: data.status,
        version: data.version,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding project:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert('프로젝트 생성 중 오류가 발생했습니다: ' + errorMessage);
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

  return (
    <motion.div className="container mx-auto p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">New MVP Project</h1>
        <ThemeToggle />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register('id')} placeholder="Project ID" required />
        <Input {...register('category')} placeholder="Category" required />
        <Input {...register('title')} placeholder="Title" required />
        <Input {...register('subTitle')} placeholder="Subtitle" required />
        <Input {...register('url')} placeholder="URL" required />
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
        <Input {...register('note')} placeholder="Note" />
        <FileUploader onUpload={setThumbnail} />
        <Input {...register('status')} placeholder="Status" defaultValue="기획" />
        <Input {...register('version')} placeholder="Version" defaultValue="v1.0" />
        <Button type="submit">Create Project</Button>
      </form>
    </motion.div>
  );
}