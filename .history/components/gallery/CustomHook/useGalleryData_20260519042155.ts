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
  heroImage?: string;
  sections: any[];
}

export function useGalleryData(
  initialProjects?: any[],
  initialFolders?: FolderType[],
) {
  // if we have initial folders, we can use them directly without fetching
  const [folders, setFolders] = useState<FolderType[]>(initialFolders || []);
  const [loading, setLoading] = useState(!initialFolders && !initialProjects);

  useEffect(() => {
    // if we already have initial folders, we can skip fetching
    if (folders.length === 0) {
      async function loadData() {
        try {
          const projects = await getProjects();
          const mappedFolders = projects.map((proj: any) => ({
            id: proj.id,
            title: proj.title,
            title_ar: proj.title_ar,
            category: proj.category,
            description: proj.description,
            description_ar: proj.description_ar,
            heroImage: proj.hero_image || proj.image_url,
            sections: proj.sections || [],
          }));
          setFolders(mappedFolders);
        } catch (error) {
          console.error("Failed to fetch gallery data:", error);
        } finally {
          setLoading(false);
        }
      }
      loadData();
    }
  }, [initialFolders, folders.length]);

  return { folders, loading };
}
