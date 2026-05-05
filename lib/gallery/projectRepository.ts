/**
 * Project Repository
 * Centralizes data access for Gallery Projects, handling both Supabase and Mock fallbacks.
 * This makes it easy for future developers to switch to a real backend.
 */

import { supabase } from '@/lib/supabase/client';
import { getMockProjects, saveMockProjects } from '@/lib/mockDb';

export interface Project {
  id: string;
  title: string;
  title_ar?: string;
  category: string;
  location?: string;
  location_ar?: string;
  description: string;
  description_ar?: string;
  year?: string;
  hero_image: string;
  image_url?: string; // Fallback field
  sections: ProjectSection[];
  created_at?: string;
}

export interface ProjectSection {
  title: string;
  title_ar?: string;
  images: { src: string; alt?: string }[];
}

const IS_SUPABASE_ENABLED = 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url';

/**
 * Fetches all projects, ordered by creation date.
 */
export async function getProjects(): Promise<Project[]> {
  if (IS_SUPABASE_ENABLED) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Supabase fetch failed, falling back to mock:', err);
      return getMockProjects();
    }
  }
  
  return getMockProjects();
}

/**
 * Saves or updates a project.
 */
export async function upsertProject(project: Partial<Project>): Promise<Project | null> {
  if (IS_SUPABASE_ENABLED) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .upsert([project])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase upsert failed:', err);
      return null;
    }
  }

  // Mock implementation
  const current = getMockProjects();
  let updated;
  if (project.id) {
    updated = current.map((p: Project) => p.id === project.id ? { ...p, ...project } : p);
  } else {
    const newProject = { ...project, id: Date.now().toString(), created_at: new Date().toISOString() } as Project;
    updated = [newProject, ...current];
  }
  saveMockProjects(updated);
  return (project.id ? updated.find((p: Project) => p.id === project.id) : updated[0]) || null;
}

/**
 * Deletes a project.
 */
export async function deleteProject(id: string): Promise<boolean> {
  if (IS_SUPABASE_ENABLED) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase delete failed:', err);
      return false;
    }
  }

  const current = getMockProjects();
  const filtered = current.filter((p: Project) => p.id !== id);
  saveMockProjects(filtered);
  return true;
}
