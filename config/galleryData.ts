export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryFolder {
  id: string;
  title: string;
  category: string;
  description: string;
  heroImage: string;
  sections: {
    title: string;
    images: GalleryImage[];
  }[];
}

export const galleryFolders: GalleryFolder[] = [
  {
    id: 'modern-villa-1',
    title: 'Modern Villa - Contemporary',
    category: 'Residential',
    description: 'This project represents a modern villa that clean geometry, natural textures, and functional design to create a timeless residential space. The composition focuses on strong vertical and horizontal lines, balanced proportions, and seamless integration with the surrounding landscape. Large openings bring in natural light while maintaining privacy, and the façade combines light colored stucco with dark marble cladding to enhance contrast and depth. The villa is designed with a minimalist architectural language, offering both elegance and simplicity.',
    heroImage: 'modern-villa-v3.jpg',
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
          { src: 'modern-villa-sales-3.jpg', alt: 'Typical floor plan A' },
          { src: 'modern-villa-sales-4.jpg', alt: 'Typical floor plan B' },
          { src: 'modern-villa-sales-5.jpg', alt: 'Ground floor variation' },
          { src: 'modern-villa-sales-6.jpg', alt: 'Typical floor plan C' },
          { src: 'modern-villa-sales-7.jpg', alt: 'Typical floor plan D' },
          { src: 'modern-villa-sales-8.jpg', alt: 'Ground floor variation B' },
          { src: 'modern-villa-sales-9.jpg', alt: 'Ground floor variation C' },
          { src: 'modern-villa-sales-10.jpg', alt: 'Lower ground variation' },
        ]
      },
    ]
  },
  {
    id: 'post-modern-villa',
    title: 'Post - Modern Villa',
    category: 'Residential',
    description: 'Defined by dynamic, flowing curves giving the building a sculptural, artistic, and bold visual identity. The use of high-contrast palette of greys and beige colored stucco and integrated lighting design creates a luxurious look.',
    heroImage: 'post-modern-villa.jpg',
    sections: [
      {
        title: 'Project Visuals',
        images: [
          { src: 'post-modern-villa.jpg', alt: 'Post - Modern Villa Main View' },
          { src: 'post-modern-villa-left .jpg', alt: 'Contemporary Facade Perspective' },
          { src: 'post-modern-villa-night.jpg', alt: 'Post - Modern Villa Night View' },
          { src: 'post-modern-villa-right.jpg', alt: 'Modern Villa V3 Architectural View' },
        ]
      },
      {
        title: 'Entrance',
        images: [
          { src: 'post-modern-villa-entrance1.jpg', alt: 'Luxury Entrance Foyer' },
          { src: 'post-modern-villa-entrance2.jpg', alt: 'Grand Hallway View' },
          { src: 'post-modern-villa-entrance3.jpg', alt: 'Elevator Lobby and Stairs' },
        ]
      },
      {
        title: 'Sales Plan',
        images: []
      },
    ]
  },
  {
    id: 'signature-estate',
    title: 'Signature Estate - Luxury Redefined',
    category: 'Residential',
    description: 'The villa\'s exterior design is inspired by modern architecture. The use of warm colored stucco combined with wooden accents creates a charming and timeless look. Large windows and glass doors are strategically placed to allow ample natural light to flood the interior spaces and provide beautiful views of the surrounding landscape.',
    heroImage: 'signature-estate-main.jpg',
    sections: [
      {
        title: 'Project Visuals',
        images: [
          { src: 'signature-estate-main.jpg', alt: 'Signature Estate Main View' },
          { src: 'signature-estate-v1.jpg', alt: 'Signature Estate Residential Design V1' },
          { src: 'signature-estate-v2.jpg', alt: 'Signature Estate Residential Design V2' },
          { src: 'signature-estate-v3.jpg', alt: 'Signature Estate Modern Design' },
          { src: 'signature-estate-v4.jpg', alt: 'Signature Estate Alternative Perspective' },
        ]
      },
      {
        title: 'Entrance',
        images: [
          { src: 'V 14 entrance Shot 1.jpg', alt: 'Grand Entry Foyer' },
          { src: 'V 14 entrance Shot 2.jpg', alt: 'Interior Hallway' },
          { src: 'V 14 entrance Shot 3.jpg', alt: 'Luxury Lobby' },
        ]
      },
      {
        title: 'Sales Plan',
        images: [
          { src: 'signature-estate-sales-typical.jpg', alt: 'Typical Floor Plan - 418 m2' },
          { src: 'signature-estate-sales-ground-1.jpg', alt: 'Ground Floor Plan - 307 m2' },
          { src: '13- Ground  Right.jpg', alt: 'Ground Floor Right' },
          { src: '14- Ground left.jpg', alt: 'Ground Floor Left' },
          { src: '15-Lower Ground RIGHT.jpg', alt: 'Lower Ground Right' },
          { src: '16-Lower Ground Left.jpg', alt: 'Lower Ground Left' },
          { src: '17-Garage.jpg', alt: 'Garage Plan' },
        ]
      }
    ]
  },
  {
    id: 'contemporary-villa-395',
    title: 'Contemporary - Modern Villa - Elegance in Simplicity',
    category: 'Residential',
    description: 'This project is characterized by clean lines, geometric forms and minimalist detailing. Features a light, neutral color palette contrasted with stone cladding to maintain a clean, uncluttered aesthetic look. Strategic use of large windows and glass-railed balconies to maximize natural light and view that emphasizes open concept façade.',
    heroImage: 'V 395 Shot 1.jpg',
    sections: [
      {
        title: 'Project Visuals',
        images: [
          { src: 'V 395 Shot 1.jpg', alt: 'Contemporary Villa Main View' },
          { src: 'V 395 Shot 2.jpg', alt: 'Side Perspective' },
          { src: 'V 395 Shot 3.jpg', alt: 'Contemporary Villa Night View' },
        ]
      },
      {
        title: 'Entrance',
        images: [
          { src: 'Entrance Shot 1.jpg', alt: 'Main Entrance Lobby' },
          { src: 'Entrance Shot 2.jpg', alt: 'Entrance Hallway' },
          { src: 'Entrance Shot 3.jpg', alt: 'Lobby Perspective' },
        ]
      },
      {
        title: 'Sales Plan',
        images: [
          { src: '9- typical right.jpg', alt: 'Typical Floor Right' },
          { src: '10- typical left.jpg', alt: 'Typical Floor Left' },
          { src: '11-ground right.jpg', alt: 'Ground Floor Right' },
          { src: '12-ground left.jpg', alt: 'Ground Floor Left' },
          { src: '13-garage.jpg', alt: 'Garage Plan' },
        ]
      }
    ]
  }
];
