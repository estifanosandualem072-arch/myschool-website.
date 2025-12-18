import { useData } from '../contexts/DataContext';
import { Calendar } from 'lucide-react';

interface NewsProps {
  selectedPostId?: string;
  onNavigate: (page: string) => void;
}

export default function News({ selectedPostId, onNavigate }: NewsProps) {
  const { posts } = useData();
  const publishedPosts = posts.filter((p) => p.published);

  if (selectedPostId) {
    const post = publishedPosts.find((p) => p.id === selectedPostId);
    if (!post) {
      return (
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
              <button
                onClick={() => onNavigate('news')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                ← Back to News
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => onNavigate('news')}
              className="text-blue-100 hover:text-white mb-4 flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to News</span>
            </button>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="flex items-center space-x-2 mt-4 text-blue-100">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {post.featuredImage && (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            )}
            <div className="p-8 lg:p-12">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">News & Announcements</h1>
          <p className="text-blue-100 mt-2">Stay updated with the latest from our school</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {publishedPosts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600">No news articles available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {publishedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
                onClick={() => onNavigate(`news-${post.id}`)}
              >
                <div className="md:flex">
                  {post.featuredImage && (
                    <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className={`p-8 ${post.featuredImage ? 'md:w-2/3' : 'w-full'}`}>
                    <div className="flex items-center space-x-2 text-blue-600 text-sm font-semibold mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                    <span className="text-blue-600 font-semibold hover:text-blue-700">
                      Read More →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
