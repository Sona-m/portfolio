import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PortfolioConfig,
  fetchPortfolioConfig,
} from "../config/portfolioConfig";

interface PortfolioContextType {
  portfolioData: PortfolioConfig | null;
  isLoading: boolean;
  error: Error | null;
}

const PortfolioContext = createContext<PortfolioContextType>({
  portfolioData: null,
  isLoading: true,
  error: null,
});

export const usePortfolio = () => useContext(PortfolioContext);

interface PortfolioProviderProps {
  children: React.ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({
  children,
}) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioConfig | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        // Simulate minimum loading time of 1.5 seconds to allow the loading screen to be visible
        const [data] = await Promise.all([
          fetchPortfolioConfig(),
          new Promise((resolve) => setTimeout(resolve, 1500)),
        ]);

        setPortfolioData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load portfolio data:", error);
        setError(
          error instanceof Error ? error : new Error("Unknown error occurred")
        );
        setIsLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolioData, isLoading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContext;
