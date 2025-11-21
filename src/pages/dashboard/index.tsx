import { useState, useMemo } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { useAuth } from '../../contexts/AuthContext';
import { ProjectCard } from '../../components/ProjectCard';
import { ProjectTable } from '../../components/ProjectTable';
import { ThemeToggle } from '../../components/ThemeToggle';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { StatsCard, CategoryCard } from '../../components/StatsCard';
import { CategoryPieChart, StatusBarChart, ProjectTimelineChart, CumulativeProjectsChart } from '../../components/Charts';
import { exportDashboardData } from '../../lib/exportUtils';
import {
  FolderOpen,
  CheckCircle,
  Bookmark,
  Tag,
  Grid3X3,
  List,
  Plus,
  LogOut,
  Sparkles,
  Download
} from 'lucide-react';

// Skeleton 컴포넌트들
const StatsCardSkeleton = () => (
  <Card className="animate-pulse">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-20 bg-muted rounded" />
          <div className="h-8 w-16 bg-muted rounded" />
        </div>
        <div className="h-6 w-6 bg-muted rounded" />
      </div>
    </CardContent>
  </Card>
);

const ProjectCardSkeleton = () => (
  <Card className="animate-pulse">
    <CardContent className="p-6">
      <div className="space-y-4">
        <div className="h-6 w-3/4 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-muted rounded" />
          <div className="h-6 w-16 bg-muted rounded" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const { projects, loading, toggleBookmark } = useProjects();
  const { user, signOut } = useAuth();
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const navigate = useNavigate();

  const filteredProjects = projects.filter(project => {
    // 퍼지 검색 적용
    let matchesSearch = true;
    if (searchTerm) {
      const fuseResults = fuse.search(searchTerm);
      const matchedIds = fuseResults.map(result => result.item.id);
      matchesSearch = matchedIds.includes(project.id);
    }

    const matchesCategory = !selectedCategory || project.category === selectedCategory;
    const matchesTech = !selectedTech || project.techStack.includes(selectedTech);
    const matchesBookmark = !showBookmarkedOnly || project.bookmarked;
    return matchesSearch && matchesCategory && matchesTech && matchesBookmark;
  });

  const categories = [...new Set(projects.map(p => p.category))];
  const techStacks = [...new Set(projects.flatMap(p => p.techStack))];

  // Fuse.js 설정
  const fuse = new Fuse(projects, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'subTitle', weight: 0.3 },
      { name: 'techStack', weight: 0.2 },
      { name: 'category', weight: 0.1 }
    ],
    threshold: 0.3,
    includeScore: true
  });

  // 통계 계산
  const stats = {
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === '완료').length,
    bookmarkedProjects: projects.filter(p => p.bookmarked).length,
    categories: categories.reduce((acc, cat) => {
      acc[cat] = projects.filter(p => p.category === cat).length;
      return acc;
    }, {} as Record<string, number>),
    statuses: projects.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  // 차트 데이터 준비
  const categoryChartData = Object.entries(stats.categories).map(([category, count], index) => ({
    name: category,
    value: count,
    color: [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))'
    ][index % 5]
  }));

  const statusChartData = Object.entries(stats.statuses).map(([status, count], index) => ({
    name: status,
    value: count,
    color: [
      'hsl(var(--primary))',
      'hsl(var(--secondary))',
      'hsl(var(--accent))',
      'hsl(var(--muted))'
    ][index % 4]
  }));

  // 시간 기반 차트 데이터 준비
  const generateTimeSeriesData = useMemo(() => {
    if (projects.length === 0) {
      return [];
    }

    const now = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    return last30Days.map(date => {
      const dayStart = new Date(date);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      const createdOnDay = projects.filter(p => {
        try {
          const createdDate = new Date(p.createdAt);
          return !isNaN(createdDate.getTime()) && createdDate >= dayStart && createdDate <= dayEnd;
        } catch {
          return false;
        }
      }).length;

      const completedOnDay = projects.filter(p => {
        if (p.status !== '완료') return false;
        try {
          const updatedDate = new Date(p.updatedAt);
          return !isNaN(updatedDate.getTime()) && updatedDate >= dayStart && updatedDate <= dayEnd;
        } catch {
          return false;
        }
      }).length;

      const totalUpToDay = projects.filter(p => {
        try {
          const createdDate = new Date(p.createdAt);
          return !isNaN(createdDate.getTime()) && createdDate <= dayEnd;
        } catch {
          return false;
        }
      }).length;

      return {
        date: new Date(date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
        created: createdOnDay,
        completed: completedOnDay,
        total: totalUpToDay
      };
    });
  }, [projects]);

  const timelineData = generateTimeSeriesData;

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-muted rounded animate-pulse" />
            <div className="h-4 w-48 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-10 bg-muted rounded animate-pulse" />
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
            <div className="h-10 w-24 bg-muted rounded animate-pulse" />
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <StatsCardSkeleton key={i} />
          ))}
        </div>

        {/* Projects Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const handleExportData = () => {
    try {
      const exportData = {
        summary: stats,
        projects: projects.map(p => ({
          id: p.id,
          title: p.title,
          category: p.category,
          status: p.status,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
          techStack: p.techStack
        })),
        exportDate: new Date().toISOString(),
        totalProjects: projects.length
      };
      exportDashboardData(exportData, `대시보드-데이터-${new Date().toLocaleDateString('ko-KR')}`);
    } catch (error) {
      console.error('Failed to export dashboard data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-4 space-y-8">
        {/* Enhanced Header */}
        <motion.div
          className="flex justify-between items-center py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                MVP Projects
              </h1>
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
              <span>Welcome back,</span>
              <span className="font-medium text-foreground">{user?.email}</span>
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate('/new')}
                className="shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={handleExportData}
                className="border-2 hover:border-primary/50 hover:text-primary transition-colors duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-2 hover:border-destructive/50 hover:text-destructive transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Stats Dashboard */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatsCard
            title="총 프로젝트"
            value={stats.totalProjects}
            icon={<FolderOpen className="w-6 h-6 text-blue-500" />}
            color="border-l-blue-500"
          />
          <StatsCard
            title="완료된 프로젝트"
            value={stats.completedProjects}
            icon={<CheckCircle className="w-6 h-6 text-green-500" />}
            color="border-l-green-500"
          />
          <StatsCard
            title="북마크된 프로젝트"
            value={stats.bookmarkedProjects}
            icon={<Bookmark className="w-6 h-6 text-yellow-500" />}
            color="border-l-yellow-500"
          />
          <StatsCard
            title="카테고리 수"
            value={categories.length}
            icon={<Tag className="w-6 h-6 text-purple-500" />}
            color="border-l-purple-500"
          />
        </motion.div>

        {/* Enhanced Category Distribution */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Tag className="w-6 h-6 text-primary" />
            카테고리별 분포
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(stats.categories).map(([category, count]) => {
              const percentage = Math.round((count / stats.totalProjects) * 100);
              return (
                <CategoryCard
                  key={category}
                  category={category}
                  count={count}
                  percentage={percentage}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Enhanced Status Distribution */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-primary" />
            상태별 분포
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(stats.statuses).map(([status, count]) => (
              <motion.div
                key={status}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">{status}</span>
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        {count}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Charts Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            className="space-y-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Tag className="w-6 h-6 text-primary" />
              카테고리 분포 차트
            </h2>
            <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
              <CategoryPieChart data={categoryChartData} title="카테고리별 분포" />
            </Card>
          </motion.div>

          <motion.div
            className="space-y-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              상태 분포 차트
            </h2>
            <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
              <StatusBarChart data={statusChartData} title="상태별 분포" />
            </Card>
          </motion.div>
        </motion.div>

        {/* Time-based Analytics Section */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            시간 기반 분석
          </h2>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div
              className="space-y-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-bold flex items-center gap-2">
                📈 프로젝트 생성/완료 추이
              </h3>
              <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                <ProjectTimelineChart data={timelineData} title="최근 30일 프로젝트 활동" />
              </Card>
            </motion.div>

            <motion.div
              className="space-y-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-bold flex items-center gap-2">
                📊 누적 프로젝트 성장
              </h3>
              <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                <CumulativeProjectsChart data={timelineData} title="프로젝트 누적 성장" />
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <FolderOpen className="w-8 h-8 text-primary" />
            프로젝트 목록
          </h2>

          <div className="flex gap-4 mb-6 flex-wrap">
            <Input
              placeholder="프로젝트 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded px-3 py-2 bg-background"
            >
              <option value="">모든 카테고리</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="border rounded px-3 py-2 bg-background"
            >
              <option value="">모든 기술</option>
              {techStacks.map(tech => <option key={tech} value={tech}>{tech}</option>)}
            </select>
            <Button
              variant={viewMode === 'card' ? 'default' : 'outline'}
              onClick={() => setViewMode('card')}
              className="flex items-center gap-2"
            >
              <Grid3X3 className="w-4 h-4" />
              카드
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              onClick={() => setViewMode('table')}
              className="flex items-center gap-2"
            >
              <List className="w-4 h-4" />
              테이블
            </Button>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showBookmarkedOnly}
                onChange={(e) => setShowBookmarkedOnly(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">북마크만</span>
            </label>
          </div>

          {filteredProjects.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {projects.length === 0 ? '프로젝트가 없습니다' : '검색 결과가 없습니다'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {projects.length === 0
                    ? '첫 번째 MVP 프로젝트를 만들어보세요!'
                    : '다른 검색어로 시도해보세요.'
                  }
                </p>
                {projects.length === 0 && (
                  <Button onClick={() => navigate('/new')} size="lg">
                    첫 프로젝트 만들기
                  </Button>
                )}
              </div>
            </motion.div>
          ) : viewMode === 'card' ? (
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => navigate(`/detail/${project.id}`)}
                  onBookmarkToggle={() => toggleBookmark(project.id)}
                />
              ))}
            </motion.div>
          ) : (
            <ProjectTable
              projects={filteredProjects}
              onRowClick={(project) => navigate(`/detail/${project.id}`)}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}