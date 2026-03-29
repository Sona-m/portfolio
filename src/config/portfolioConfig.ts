import { IconName } from "@fortawesome/fontawesome-svg-core";

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  age?: number;
  pronouns?: string;
  intro: string;
  jobStatus: string;
  avatarUrl?: string;
  resumeUrl: string;
  calendarUrl?: string;
}

export interface Experience {
  position: string;
  company: string;
  period: string;
  description: string[];
  technologies?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string[];
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
  isLive?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: IconName;
}

export interface PortfolioConfig {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socialLinks: SocialLink[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}

// Config URL can be modified to point to a different JSON file
// Uses CONFIG_URL environment variable if provided,
// otherwise falls back to default "/portfolioConfig.json"
// export const configURL = process.env.CONFIG_URL || "/portfolioConfig.json";
export const configURL = "/portfolioConfig.json";

// Function to fetch portfolio config
export const fetchPortfolioConfig = async (): Promise<PortfolioConfig> => {
  try {
    const response = await fetch(configURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio config: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching portfolio config:", error);
    throw error;
  }
};

// Function to fetch dev jokes
export const fetchDevJokes = async (): Promise<string[]> => {
  try {
    const response = await fetch("/devJokes.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch dev jokes: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching dev jokes:", error);
    return [
      "Why do programmers prefer dark mode? Because light attracts bugs.",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
      "!false... it's funny because it's true!",
    ];
  }
};

// Get a random joke
export const getRandomJoke = (jokes: string[]): string => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
};

export default fetchPortfolioConfig;
