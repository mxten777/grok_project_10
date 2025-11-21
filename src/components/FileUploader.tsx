import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useUpload } from '../hooks/useUpload';

interface FileUploaderProps {
  onUpload: (url: string) => void;
}

export const FileUploader = ({ onUpload }: FileUploaderProps) => {
  const { uploadFile, uploading } = useUpload();
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (file) {
      try {
        const url = await uploadFile(file);
        onUpload(url);
        setFile(null);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  );
};