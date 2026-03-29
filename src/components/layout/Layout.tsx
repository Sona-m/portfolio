import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.scss";
import { PortfolioConfig } from "../../config/portfolioConfig";

interface LayoutProps {
  children: ReactNode;
  portfolioConfig: PortfolioConfig;
}

const Layout = ({ children, portfolioConfig }: LayoutProps) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer portfolioConfig={portfolioConfig} />
    </div>
  );
};

export default Layout;
