import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  onRemove?: () => void;
}

export const FilterChip = ({ label, active, onClick, onRemove }: FilterChipProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <Badge
        variant={active ? "default" : "outline"}
        className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
          active ? 'shadow-md' : 'hover:bg-muted'
        }`}
        onClick={onClick}
      >
        {label}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </Badge>
    </motion.div>
  );
};

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = "Search..." }: SearchBarProps) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 w-full max-w-sm border-2 focus:border-primary transition-colors duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export const FilterDropdown = ({ label, options, selected, onSelect }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border-2 hover:border-primary transition-colors duration-200"
      >
        <Filter className="w-4 h-4" />
        {selected || label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50"
          >
            <div className="p-2">
              <button
                onClick={() => {
                  onSelect('');
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-muted transition-colors duration-150"
              >
                All {label}
              </button>
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-muted transition-colors duration-150"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};