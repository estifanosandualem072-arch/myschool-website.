import { Page, Post, Media } from '../types';

export const initialPages: Page[] = [
  {
    id: '1',
    title: 'About Us',
    slug: 'about',
    content: `
# Our School

Welcome to our institution of excellence. We are dedicated to providing quality education and fostering a nurturing environment for all students.

## Mission
To empower students with knowledge, skills, and values that will enable them to succeed in life and contribute positively to society.

## Vision
To be a leading educational institution recognized for academic excellence, innovation, and character development.

## Our Faculty
Our experienced and dedicated teachers are committed to helping each student reach their full potential through personalized attention and innovative teaching methods.
    `,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const initialPosts: Post[] = [
  {
    id: '1',
    title: 'Welcome to the New School Year!',
    slug: 'welcome-new-school-year',
    excerpt: 'We are excited to begin another year of learning and growth.',
    content: `
We are thrilled to welcome all students, parents, and staff to the new academic year! This year promises to be filled with exciting opportunities for learning, growth, and achievement.

Our dedicated team has prepared engaging programs and activities designed to challenge and inspire every student. We look forward to working together to make this year memorable and successful.
    `,
    featuredImage: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg',
    published: true,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Annual Science Fair Coming Soon',
    slug: 'annual-science-fair',
    excerpt: 'Join us for our exciting annual science fair next month.',
    content: `
Mark your calendars! Our annual science fair will be held next month, featuring innovative projects from students across all grades.

This event celebrates curiosity, creativity, and scientific thinking. Students will showcase their research, experiments, and discoveries. Parents and community members are invited to attend and support our young scientists.
    `,
    featuredImage: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg',
    published: true,
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Parent-Teacher Conference Schedule',
    slug: 'parent-teacher-conference',
    excerpt: 'Schedule your parent-teacher conference today.',
    content: `
We invite all parents to participate in our upcoming parent-teacher conferences. This is an excellent opportunity to discuss your child's progress, strengths, and areas for development.

Conferences will be held throughout the week. Please contact the office to schedule your appointment at a convenient time.
    `,
    featuredImage: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
    published: true,
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const initialMedia: Media[] = [
  {
    id: '1',
    title: 'School Building',
    description: 'Main school building exterior',
    fileUrl: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg',
    fileType: 'image',
    category: 'gallery',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Students in Class',
    description: 'Students engaged in learning',
    fileUrl: 'https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg',
    fileType: 'image',
    category: 'gallery',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Library',
    description: 'School library and reading area',
    fileUrl: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
    fileType: 'image',
    category: 'gallery',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Science Lab',
    description: 'Modern science laboratory',
    fileUrl: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg',
    fileType: 'image',
    category: 'gallery',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Sports Day',
    description: 'Annual sports day event',
    fileUrl: 'https://images.pexels.com/photos/9295/sports-match-championship-stadium.jpg',
    fileType: 'image',
    category: 'gallery',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Student Handbook 2024',
    description: 'Complete guide for students and parents',
    fileUrl: '/downloads/student-handbook.pdf',
    fileType: 'pdf',
    category: 'downloads',
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Homework Guidelines',
    description: 'Best practices for completing homework',
    fileUrl: '/downloads/homework-guidelines.pdf',
    fileType: 'pdf',
    category: 'downloads',
    createdAt: new Date().toISOString(),
  },
];
