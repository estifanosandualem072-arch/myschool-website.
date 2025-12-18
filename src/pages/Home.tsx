import { BookOpen, Users, Award, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const { posts } = useData();
  const latestPosts = posts.filter((p) => p.published).slice(0, 3);

  const features = [
    {
      icon: BookOpen,
      title: 'Quality Education',
      description: 'Comprehensive curriculum designed to foster critical thinking and creativity.',
    },
    {
      icon: Users,
      title: 'Experienced Faculty',
      description: 'Dedicated teachers committed to student success and personal growth.',
    },
    {
      icon: Award,
      title: 'Excellence in Learning',
      description: 'Recognized for academic achievements and innovative teaching methods.',
    },
    {
      icon: Calendar,
      title: 'Rich Activities',
      description: 'Diverse extracurricular programs to develop well-rounded individuals.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37, 99, 235, 0.9), rgba(29, 78, 216, 0.9)), url(https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Excellence School</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Where every student is empowered to reach their full potential through exceptional
              education and unwavering support.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => onNavigate('about')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Learn More
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all border-2 border-white transform hover:scale-105"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {latestPosts.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
              <button
                onClick={() => onNavigate('news')}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
              >
                <span>View All</span>
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => onNavigate(`news-${post.id}`)}
                >
                  {post.featuredImage && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-sm text-blue-600 font-semibold mb-2">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
