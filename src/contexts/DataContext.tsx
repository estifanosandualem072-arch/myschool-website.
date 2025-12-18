import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Page, Post, Media, ContactMessage } from '../types';
import { initialPages, initialPosts, initialMedia } from '../data/mockData';

interface DataContextType {
  pages: Page[];
  posts: Post[];
  media: Media[];
  messages: ContactMessage[];
  addPage: (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePage: (id: string, page: Partial<Page>) => void;
  deletePage: (id: string) => void;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  addMedia: (media: Omit<Media, 'id' | 'createdAt'>) => void;
  deleteMedia: (id: string) => void;
  addMessage: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<Page[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const savedPages = localStorage.getItem('school_cms_pages');
    const savedPosts = localStorage.getItem('school_cms_posts');
    const savedMedia = localStorage.getItem('school_cms_media');
    const savedMessages = localStorage.getItem('school_cms_messages');

    setPages(savedPages ? JSON.parse(savedPages) : initialPages);
    setPosts(savedPosts ? JSON.parse(savedPosts) : initialPosts);
    setMedia(savedMedia ? JSON.parse(savedMedia) : initialMedia);
    setMessages(savedMessages ? JSON.parse(savedMessages) : []);
  }, []);

  useEffect(() => {
    if (pages.length > 0) {
      localStorage.setItem('school_cms_pages', JSON.stringify(pages));
    }
  }, [pages]);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('school_cms_posts', JSON.stringify(posts));
    }
  }, [posts]);

  useEffect(() => {
    if (media.length > 0) {
      localStorage.setItem('school_cms_media', JSON.stringify(media));
    }
  }, [media]);

  useEffect(() => {
    localStorage.setItem('school_cms_messages', JSON.stringify(messages));
  }, [messages]);

  const addPage = (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPage: Page = {
      ...page,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPages([...pages, newPage]);
  };

  const updatePage = (id: string, pageUpdate: Partial<Page>) => {
    setPages(
      pages.map((p) =>
        p.id === id ? { ...p, ...pageUpdate, updatedAt: new Date().toISOString() } : p
      )
    );
  };

  const deletePage = (id: string) => {
    setPages(pages.filter((p) => p.id !== id));
  };

  const addPost = (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
  };

  const updatePost = (id: string, postUpdate: Partial<Post>) => {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, ...postUpdate, updatedAt: new Date().toISOString() } : p
      )
    );
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const addMedia = (mediaItem: Omit<Media, 'id' | 'createdAt'>) => {
    const newMedia: Media = {
      ...mediaItem,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setMedia([newMedia, ...media]);
  };

  const deleteMedia = (id: string) => {
    setMedia(media.filter((m) => m.id !== id));
  };

  const addMessage = (message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    setMessages([newMessage, ...messages]);
  };

  const markMessageRead = (id: string) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        pages,
        posts,
        media,
        messages,
        addPage,
        updatePage,
        deletePage,
        addPost,
        updatePost,
        deletePost,
        addMedia,
        deleteMedia,
        addMessage,
        markMessageRead,
        deleteMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
