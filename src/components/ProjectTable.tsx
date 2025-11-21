import type { Project } from '../types/Project';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

interface ProjectTableProps {
  projects: Project[];
  onRowClick: (project: Project) => void;
}

export const ProjectTable = ({ projects, onRowClick }: ProjectTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Tech Stack</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id} onClick={() => onRowClick(project)} className="cursor-pointer">
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.category}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>{project.status}</TableCell>
            <TableCell>{project.updatedAt.toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};