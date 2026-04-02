import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioConfig, fetchPortfolioConfig } from '../config/portfolioConfig';

type Theme = 'light' | 'dark';

interface PortfolioContextType {
  portfolioData: PortfolioConfig | null;
  isLoading: boolean;
  error: Error | null;
  theme: Theme;
  toggleTheme: () => void;
}

const PortfolioContext = createContext<PortfolioContextType>({
  portfolioData: null,
  isLoading: true,
  error: null,
  theme: 'light',
  toggleTheme: () => {},
});

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  //Theme
  const getInitialTheme = (): Theme => {
    try {
      const stored = localStorage.getItem('portfolio-theme') as Theme;
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  //Data
  useEffect(() => {
    const load = async () => {
      try {
        const [data] = await Promise.all([
          fetchPortfolioConfig(),
          new Promise(r => setTimeout(r, 1500)),
        ]);
        setPortfolioData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolioData, isLoading, error, theme, toggleTheme }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContext;
