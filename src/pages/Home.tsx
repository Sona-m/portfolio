import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import CaseStudies from '../components/sections/CaseStudies';
import Experience from '../components/sections/Experience';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';
import Layout from '../components/layout/Layout';
import LoadingScreen from '../components/LoadingScreen';
import { usePortfolio } from '../context/PortfolioContext';

const Home = () => {
  const { portfolioData, isLoading } = usePortfolio();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading || !portfolioData) {
    return <LoadingScreen isLoading={true} />;
  }

  const { seo } = portfolioData;

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Layout portfolioConfig={portfolioData}>
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords.join(', ')} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seo.title} />
          <meta name="twitter:description" content={seo.description} />
          {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
          {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}
        </Helmet>

        <Hero portfolioConfig={portfolioData} />
        <About portfolioConfig={portfolioData} />
        <CaseStudies portfolioConfig={portfolioData} />
        <Experience portfolioConfig={portfolioData} />
        <Skills portfolioConfig={portfolioData} />
        <Contact portfolioConfig={portfolioData} />
      </Layout>
    </>
  );
};

export default Home;
