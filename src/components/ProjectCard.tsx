import type { Project } from '../types/Project';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onBookmarkToggle?: () => void;
}

export const ProjectCard = ({ project, onClick, onBookmarkToggle }: ProjectCardProps) => {
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmarkToggle?.();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="cursor-pointer" onClick={onClick}>
        <CardHeader className="relative">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle>{project.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{project.subTitle}</p>
            </div>
            {onBookmarkToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmarkClick}
                className="ml-2 p-1 h-8 w-8"
              >
                {project.bookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
          <p className="text-sm">{project.category}</p>
          <p className="text-sm text-muted-foreground">{project.status}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};