import { FormData } from './types';

const STORAGE_KEY = 'appointments_submissions';

export interface StoredSubmission extends FormData {
  id: string;
  submittedAt: string;
}

export const storage = {
  saveSubmission: (formData: FormData): StoredSubmission => {
    const submissions = storage.getSubmissions();
    const newSubmission: StoredSubmission = {
      ...formData,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
    };
    
    submissions.push(newSubmission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    return newSubmission;
  },

  getSubmissions: (): StoredSubmission[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  getSubmission: (id: string): StoredSubmission | undefined => {
    const submissions = storage.getSubmissions();
    return submissions.find(sub => sub.id === id);
  },

  deleteSubmission: (id: string): void => {
    const submissions = storage.getSubmissions();
    const filtered = submissions.filter(sub => sub.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  clearSubmissions: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
}; 