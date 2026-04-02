//Portfolio Config Types

export interface Stat {
  value: string;
  label: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  headline: string;
  location: string;
  intro: string;
  jobStatus: string;
  resumeUrl: string;
  calendarUrl?: string;
  avatarUrl?: string;
  typedStrings: string[];
  stats: Stat[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: string;
  highlights: string[];
  technologies: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  type: 'product' | 'design-system' | 'architecture';
  description: string;
  problem: string;
  approach: string[];
  impact: string[];
  technologies: string[];
}

export interface SkillGroup {
  category: string;
  icon: string;
  items: string[];
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface PortfolioConfig {
  personalInfo: PersonalInfo;
  navLinks: NavLink[];
  experience: Experience[];
  caseStudies: CaseStudy[];
  skills: SkillGroup[];
  socialLinks: SocialLink[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}

// Config URL
export const configURL = '/portfolio/portfolioConfig.json';

// Fetch config
export const fetchPortfolioConfig = async (): Promise<PortfolioConfig> => {
  const response = await fetch(configURL);
  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio config: ${response.status}`);
  }
  return response.json();
};

export default fetchPortfolioConfig;
