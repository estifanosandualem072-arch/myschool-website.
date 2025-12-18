export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: 'image' | 'video' | 'pdf' | 'document';
  fileSize?: number;
  mimeType?: string;
  category: 'gallery' | 'downloads' | 'news' | 'general';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'teacher';
}
