import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const storageRef = ref(storage, `thumbnails/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading };
};