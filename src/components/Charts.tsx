import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { FileImage, FileText } from 'lucide-react';
import { exportChartAsImage, exportChartAsPDF } from '../lib/exportUtils';
import { useId } from 'react';

interface ChartData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface TimeSeriesData {
  date: string;
  created: number;
  completed: number;
  total: number;
}

interface CategoryChartProps {
  data: ChartData[];
  title: string;
}

export const CategoryPieChart = ({ data, title }: CategoryChartProps) => {
  const chartId = useId();

  const handleExportImage = async () => {
    try {
      await exportChartAsImage(chartId, `${title}-카테고리-분포`);
    } catch (error) {
      console.error('Failed to export chart:', error);
    }
  };

  const handleExportPDF = async () => {
    try {
      await exportChartAsPDF(chartId, `${title}-카테고리-분포`);
    } catch (error) {
      console.error('Failed to export chart:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            {title}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportImage}
              className="flex items-center gap-1"
            >
              <FileImage className="w-4 h-4" />
              PNG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="flex items-center gap-1"
            >
              <FileText className="w-4 h-4" />
              PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div id={chartId}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [value, '프로젝트 수']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const StatusBarChart = ({ data, title }: CategoryChartProps) => {
  const chartId = useId();

  const handleExportImage = async () => {
    try {
      await exportChartAsImage(chartId, `${title}-상태-분포`);
    } catch (error) {
      console.error('Failed to export chart:', error);
    }
  };

  const handleExportPDF = async () => {
    try {
      await exportChartAsPDF(chartId, `${title}-상태-분포`);
    } catch (error) {
      console.error('Failed to export chart:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            {title}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportImage}
              className="flex items-center gap-1"
            >
              <FileImage className="w-4 h-4" />
              PNG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="flex items-center gap-1"
            >
              <FileText className="w-4 h-4" />
              PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div id={chartId}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [value, '프로젝트 수']}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ProjectTimelineChart = ({ data, title }: { data: TimeSeriesData[], title: string }) => {
  const chartId = useId();

  const handleExportImage = async () => {
    try {
      await exportChartAsImage(chartId, `${title}-타임라인`);
    } catch (error) {
      console.error('Failed to export chart:', error);
    }
  };

  const handleExportPDF = async () => {
    try {
      await exportChartAsPDF(chartId, `${title}-타임라인`);
    } catch (error) {
      console.error('Failed to export chart:', error);
    }
  };

  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              {title}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="flex items-center gap-1"
              >
                <FileImage className="w-4 h-4" />
                PNG
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled
                className="flex items-center gap-1"
              >
                <FileText className="w-4 h-4" />
                PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
            <div className="text-center text-muted-foreground">
              <div className="text-4xl mb-2">📊</div>
              <p>프로젝트 데이터가 없습니다</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            {title}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportImage}
              className="flex items-center gap-1"
            >
              <FileImage className="w-4 h-4" />
              PNG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="flex items-center gap-1"
            >
              <FileText className="w-4 h-4" />
              PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div id={chartId}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number, name: string) => [
                    value,
                    name === 'created' ? '생성' : name === 'completed' ? '완료' : '총계'
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="created"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  animationDuration={2000}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--destructive))', strokeWidth: 2 }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const CumulativeProjectsChart = ({ data, title }: { data: TimeSeriesData[], title: string }) => {
  const chartId = useId();

  const handleExportImage = async () => {
    try {
      await exportChartAsImage(chartId, `${title}-성장-차트`);
    } catch (error) {
      console.error('Failed to export chart:', error);
    }
  };

  const handleExportPDF = async () => {
    try {
      await exportChartAsPDF(chartId, `${title}-성장-차트`);
    } catch (error) {
      console.error('Failed to export chart:', error);
    }
  };

  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              {title}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="flex items-center gap-1"
              >
                <FileImage className="w-4 h-4" />
                PNG
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled
                className="flex items-center gap-1"
              >
                <FileText className="w-4 h-4" />
                PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
            <div className="text-center text-muted-foreground">
              <div className="text-4xl mb-2">📈</div>
              <p>프로젝트 성장 데이터가 없습니다</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            {title}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportImage}
              className="flex items-center gap-1"
            >
              <FileImage className="w-4 h-4" />
              PNG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="flex items-center gap-1"
            >
              <FileText className="w-4 h-4" />
              PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div id={chartId}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [value, '누적 프로젝트 수']}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={3}
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};