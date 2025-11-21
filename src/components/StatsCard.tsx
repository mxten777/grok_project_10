import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import {
  TrendingUp
} from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    label: string;
  };
}

export const StatsCard = ({ title, value, icon, color, trend }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={`border-l-4 ${color} shadow-sm hover:shadow-md transition-shadow duration-200`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
              <p className="text-3xl font-bold">{value}</p>
              {trend && (
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{trend.label}</span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-full bg-opacity-10 ${color.replace('border-l-', 'bg-')}`}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface CategoryCardProps {
  category: string;
  count: number;
  percentage: number;
}

export const CategoryCard = ({ category, count, percentage }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-lg">{category}</span>
            <Badge variant="secondary" className="text-sm">
              {count}
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{percentage}%</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};