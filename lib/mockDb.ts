export const MOCK_PROJECTS_DB = [
  {
    id: 'modern-villa-1',
    title: 'Modern Villa - Contemporary',
    category: 'Residential',
    description: 'This project represents a modern villa that clean geometry, natural textures, and functional design to create a timeless residential space. The composition focuses on strong vertical and horizontal lines, balanced proportions, and seamless integration with the surrounding landscape.',
    location: 'Cairo, Egypt',
    year: '2024',
    hero_image: 'modern-villa-v3.jpg',
    sections: [
      {
        title: 'Project Visuals',
        images: [
          { src: 'modern-villa-v3.jpg', alt: 'Modern Villa V3 Main View' },
          { src: 'modern-villa-v3-left.jpg', alt: 'Modern Villa V3 Left Perspective' },
          { src: 'modern-villa-v3-right.jpg', alt: 'Modern Villa V3 Right Perspective' },
        ]
      },
      {
        title: 'Entrance',
        images: [
          { src: 'modern-villa-entrance-1.jpg', alt: 'Main entrance detail' },
          { src: 'modern-villa-entrance-2.jpg', alt: 'Entrance lobby' },
          { src: 'modern-villa-entrance-3.jpg', alt: 'Entrance perspective' },
        ]
      },
      {
        title: 'Sales Plan',
        images: [
          { src: 'modern-villa-sales-1.jpg', alt: 'Ground floor plan' },
          { src: 'modern-villa-sales-2.jpg', alt: 'Lower ground plan' },
        ]
      },
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'post-modern-villa',
    title: 'Post - Modern Villa',
    category: 'Residential',
    description: 'Defined by dynamic, flowing curves giving the building a sculptural, artistic, and bold visual identity. The use of high-contrast palette of greys and beige colored stucco and integrated lighting design creates a luxurious look.',
    location: 'Sheikh Zayed, Egypt',
    year: '2023',
    hero_image: 'post-modern-villa.jpg',
    sections: [
      {
        title: 'Project Visuals',
        images: [
          { src: 'post-modern-villa.jpg', alt: 'Post - Modern Villa Main View' },
          { src: 'post-modern-villa-left.jpg', alt: 'Contemporary Facade Perspective' },
          { src: 'post-modern-villa-night.jpg', alt: 'Post - Modern Villa Night View' },
        ]
      },
      {
        title: 'Entrance',
        images: [
          { src: 'post-modern-villa-entrance1.jpg', alt: 'Luxury Entrance Foyer' },
        ]
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'signature-estate',
    title: 'Signature Estate - Luxury Redefined',
    category: 'Residential',
    description: 'The villa\'s exterior design is inspired by modern architecture. The use of warm colored stucco combined with wooden accents creates a charming and timeless look.',
    location: 'Giza, Egypt',
    year: '2024',
    hero_image: 'signature-estate-main.jpg',
    sections: [
      {
        title: 'Project Visuals',
        images: [
          { src: 'signature-estate-main.jpg', alt: 'Signature Estate Main View' },
          { src: 'signature-estate-v1.jpg', alt: 'Signature Estate Residential Design V1' },
        ]
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'contemporary-villa-395',
    title: 'Contemporary - Modern Villa - Elegance in Simplicity',
    category: 'Residential',
    description: 'This project is characterized by clean lines, geometric forms and minimalist detailing. Features a light, neutral color palette contrasted with stone cladding to maintain a clean, uncluttered aesthetic look.',
    location: 'New Cairo, Egypt',
    year: '2022',
    hero_image: 'V-395-Shot-1.jpg',
    sections: [
      {
        title: 'Project Visuals',
        images: [
          { src: 'V-395-Shot-1.jpg', alt: 'Contemporary Villa Main View' },
        ]
      }
    ],
    created_at: new Date().toISOString()
  }
];

export function getMockProjects() {
  if (typeof window === 'undefined') return MOCK_PROJECTS_DB;
  const stored = localStorage.getItem('mock_projects');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      
      // Migration: Strip old prefixes from existing localStorage data
      const NEXT_BASE_PATH = '/dar-el-meamar-next';
      const ASSETS_PATH = '/assets/';
      const OLD_PREFIX = `${NEXT_BASE_PATH}${ASSETS_PATH}`;
      
      parsed.forEach((proj: any) => {
        if (proj.hero_image?.startsWith(OLD_PREFIX)) {
          proj.hero_image = proj.hero_image.replace(OLD_PREFIX, '');
        } else if (proj.hero_image?.startsWith(ASSETS_PATH)) {
          proj.hero_image = proj.hero_image.replace(ASSETS_PATH, '');
        }

        proj.sections?.forEach((sec: any) => {
          sec.images?.forEach((img: any) => {
            if (img.src?.startsWith(OLD_PREFIX)) {
              img.src = img.src.replace(OLD_PREFIX, '');
            } else if (img.src?.startsWith(ASSETS_PATH)) {
              img.src = img.src.replace(ASSETS_PATH, '');
            }
          });
        });
      });

      return parsed;
    } catch (e) {
      return MOCK_PROJECTS_DB;
    }
  }
  return MOCK_PROJECTS_DB;
}

export function saveMockProjects(projects: any[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('mock_projects', JSON.stringify(projects));
  } catch (e: any) {
    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
      alert('Local Storage is full! This usually happens when uploading very large images in Demo Mode. \n\nPlease use smaller images (< 500KB) or connect to Supabase for unlimited storage.');
    } else {
      console.error('Failed to save to localStorage:', e);
    }
  }
}
