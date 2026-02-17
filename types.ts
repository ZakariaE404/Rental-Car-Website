
export interface Project {
  cover: string;
  title: string;
  role: string;
  description: string;
  technologies: string[];
  features: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
  icon: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}
