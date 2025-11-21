import { useState } from 'react';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface TechTagProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export const TechTag = ({ tags, onChange }: TechTagProps) => {
  const [input, setInput] = useState('');

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      onChange([...tags, input.trim()]);
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add technology..."
        />
        <Button onClick={addTag} type="button" size="sm">
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <X
              className="w-3 h-3 cursor-pointer"
              onClick={() => removeTag(tag)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};