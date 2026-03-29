import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";
import Layout from "../components/layout/Layout";
import LoadingScreen from "../components/LoadingScreen";
import { usePortfolio } from "../context/PortfolioContext";

const Home = () => {
  const { portfolioData, isLoading } = usePortfolio();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading || !portfolioData) {
    return <LoadingScreen isLoading={true} />;
  }

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Layout portfolioConfig={portfolioData}>
        <Helmet>
          <title>{portfolioData.seo.title}</title>
          <meta name="description" content={portfolioData.seo.description} />
          <meta
            name="keywords"
            content={portfolioData.seo.keywords.join(", ")}
          />
          <meta property="og:title" content={portfolioData.seo.title} />
          <meta
            property="og:description"
            content={portfolioData.seo.description}
          />
          {portfolioData.seo.ogImage && (
            <meta property="og:image" content={portfolioData.seo.ogImage} />
          )}
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={portfolioData.seo.title} />
          <meta
            name="twitter:description"
            content={portfolioData.seo.description}
          />
          {portfolioData.seo.ogImage && (
            <meta name="twitter:image" content={portfolioData.seo.ogImage} />
          )}
        </Helmet>

        <Hero portfolioConfig={portfolioData} />
        <About portfolioConfig={portfolioData} />
        <Experience portfolioConfig={portfolioData} />
        <Skills portfolioConfig={portfolioData} />
        <Projects portfolioConfig={portfolioData} />
        <Contact portfolioConfig={portfolioData} />
      </Layout>
    </>
  );
};

export default Home;
