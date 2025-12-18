import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Post, Page, Media } from '../types';

type AdminTab = 'posts' | 'pages' | 'media' | 'messages';

export default function Admin() {
  const { posts, pages, media, messages, addPost, updatePost, deletePost, addPage, updatePage, deletePage, addMedia, deleteMedia, markMessageRead, deleteMessage } = useData();
  const [activeTab, setActiveTab] = useState<AdminTab>('posts');
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [editingPage, setEditingPage] = useState<Partial<Page> | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSavePost = () => {
    if (!editingPost) return;

    if (editingPost.id) {
      updatePost(editingPost.id, editingPost);
    } else {
      const slug = editingPost.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
      addPost({
        title: editingPost.title || '',
        slug,
        content: editingPost.content || '',
        excerpt: editingPost.excerpt || '',
        featuredImage: editingPost.featuredImage,
        published: editingPost.published ?? true,
        publishedAt: new Date().toISOString(),
      });
    }

    setEditingPost(null);
    setShowForm(false);
  };

  const handleSavePage = () => {
    if (!editingPage) return;

    if (editingPage.id) {
      updatePage(editingPage.id, editingPage);
    } else {
      const slug = editingPage.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
      addPage({
        title: editingPage.title || '',
        slug,
        content: editingPage.content || '',
        featuredImage: editingPage.featuredImage,
        published: editingPage.published ?? true,
      });
    }

    setEditingPage(null);
    setShowForm(false);
  };

  const renderPostsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Posts</h2>
        <button
          onClick={() => {
            setEditingPost({ title: '', content: '', excerpt: '', published: true });
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Post</span>
        </button>
      </div>

      {showForm && editingPost && (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {editingPost.id ? 'Edit Post' : 'Create New Post'}
            </h3>
            <button onClick={() => { setShowForm(false); setEditingPost(null); }}>
              <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Post Title"
            value={editingPost.title || ''}
            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Excerpt"
            value={editingPost.excerpt || ''}
            onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Featured Image URL"
            value={editingPost.featuredImage || ''}
            onChange={(e) => setEditingPost({ ...editingPost, featuredImage: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Post Content"
            value={editingPost.content || ''}
            onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editingPost.published ?? true}
              onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>

          <button
            onClick={handleSavePost}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Post</span>
          </button>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  {post.published ? (
                    <Eye className="h-4 w-4 text-green-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                <p className="text-xs text-gray-500">
                  Published: {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingPost(post);
                    setShowForm(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPagesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Pages</h2>
        <button
          onClick={() => {
            setEditingPage({ title: '', content: '', published: true });
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Page</span>
        </button>
      </div>

      {showForm && editingPage && (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {editingPage.id ? 'Edit Page' : 'Create New Page'}
            </h3>
            <button onClick={() => { setShowForm(false); setEditingPage(null); }}>
              <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Page Title"
            value={editingPage.title || ''}
            onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Page Content (supports Markdown: # for headers, ## for subheaders)"
            value={editingPage.content || ''}
            onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
            rows={15}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editingPage.published ?? true}
              onChange={(e) => setEditingPage({ ...editingPage, published: e.target.checked })}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>

          <button
            onClick={handleSavePage}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Page</span>
          </button>
        </div>
      )}

      <div className="space-y-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{page.title}</h3>
                  {page.published ? (
                    <Eye className="h-4 w-4 text-green-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-600">Slug: /{page.slug}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingPage(page);
                    setShowForm(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deletePage(page.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessagesTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600">No messages yet.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-xl shadow-md p-6 ${!msg.read ? 'border-l-4 border-blue-600' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{msg.name}</h3>
                  <p className="text-sm text-gray-600">{msg.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {!msg.read && (
                    <button
                      onClick={() => markMessageRead(msg.id)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-green-100 mt-2">Manage your school website content</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => { setActiveTab('posts'); setShowForm(false); }}
              className={`px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'posts'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => { setActiveTab('pages'); setShowForm(false); }}
              className={`px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'pages'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pages
            </button>
            <button
              onClick={() => { setActiveTab('messages'); setShowForm(false); }}
              className={`px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'messages'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Messages {messages.filter(m => !m.read).length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {messages.filter(m => !m.read).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'posts' && renderPostsTab()}
        {activeTab === 'pages' && renderPagesTab()}
        {activeTab === 'messages' && renderMessagesTab()}
      </div>
    </div>
  );
}
