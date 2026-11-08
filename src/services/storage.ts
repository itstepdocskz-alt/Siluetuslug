import { Project, SiteConfig, ProjectInquiry } from '../types';
import { INITIAL_CONFIG, INITIAL_PROJECTS } from '../data/initialData';

const STORAGE_KEYS = {
  PROJECTS: 'siluet_projects_v1',
  CONFIG: 'siluet_config_v1',
  INQUIRIES: 'siluet_inquiries_v1',
};

export const storage = {
  getProjects(): Project[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to read projects from storage, using defaults:', e);
    }
    // initialize with defaults
    storage.saveProjects(INITIAL_PROJECTS);
    return INITIAL_PROJECTS;
  },

  saveProjects(projects: Project[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to storage:', e);
    }
  },

  getConfig(): SiteConfig {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (data) {
        return { ...INITIAL_CONFIG, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Failed to read config from storage, using defaults:', e);
    }
    storage.saveConfig(INITIAL_CONFIG);
    return INITIAL_CONFIG;
  },

  saveConfig(config: SiteConfig) {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save config to storage:', e);
    }
  },

  getInquiries(): ProjectInquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to read inquiries from storage:', e);
    }
    return [];
  },

  saveInquiries(inquiries: ProjectInquiry[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save inquiries to storage:', e);
    }
  },

  addInquiry(inquiryData: Omit<ProjectInquiry, 'id' | 'createdAt' | 'status'>): ProjectInquiry {
    const list = storage.getInquiries();
    const newInquiry: ProjectInquiry = {
      ...inquiryData,
      id: 'inq-' + Date.now(),
      createdAt: new Date().toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'new',
    };
    list.unshift(newInquiry);
    storage.saveInquiries(list);
    return newInquiry;
  },

  resetAllData() {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(INITIAL_CONFIG));
    } catch (e) {
      console.error('Failed to reset storage:', e);
    }
  },

  exportData(): string {
    const data = {
      projects: storage.getProjects(),
      config: storage.getConfig(),
      inquiries: storage.getInquiries(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },

  importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && Array.isArray(parsed.projects)) {
        storage.saveProjects(parsed.projects);
        if (parsed.config) storage.saveConfig(parsed.config);
        if (Array.isArray(parsed.inquiries)) storage.saveInquiries(parsed.inquiries);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to parse import JSON:', e);
      return false;
    }
  },
};
