export interface Project {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  title: string;
  subTitle: string;
  url: string;
  techStack: string[];
  docs: string[];
  note: string;
  thumbnail?: string;
  status: string;
  version: string;
  createdBy?: string;
  bookmarked?: boolean;
}