import { useState, useEffect } from "react";
import { getProjects } from "@/lib/gallery/projectRepository";

// Types and Interfaces
export interface FolderType {
  id: string;
  title: string;
  title_ar?: string;
  category: string;
  description: string;
  description_ar?: string;
  heroImage: string;
  sections: any[];
}

export function useGalleryData(
  initialProjects?: any[],
  initialFolders?: FolderType[],
) {
  const [folders, setFolders] = useState<FolderType[]>(initialFolders || []);
  const [dbProjects, setDbProjects] = useState<any[]>(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);

  useEffect(() => {
    async function loadData() {
      const projects = await getProjects();
      setDbProjects(projects);
      setLoading(false);
    }
    loadData();
  }, []);

  const folders = dbProjects.map((proj) => ({
    id: proj.id,
    title: proj.title,
    title_ar: proj.title_ar,
    category: proj.category,
    description: proj.description,
    description_ar: proj.description_ar,
    heroImage: proj.hero_image || proj.image_url,
    sections: proj.sections || [],
  }));

  return { folders, loading };
}
