import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Tabs defaultValue={theme}>
        <TabsList className="gap-3">
          <TabsTrigger value="light" onClick={() => setTheme('light')}>
            <Sun className="w-6" />
          </TabsTrigger>
          <TabsTrigger value="system" onClick={() => setTheme('system')}>
            <Monitor className="w-6" />
          </TabsTrigger>
          <TabsTrigger value="dark" onClick={() => setTheme('dark')}>
            <Moon className="w-6" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default ThemeSwitcher;
