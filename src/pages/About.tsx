import { useData } from '../contexts/DataContext';

export default function About() {
  const { pages } = useData();
  const aboutPage = pages.find((p) => p.slug === 'about' && p.published);

  const parseContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-4xl font-bold text-gray-900 mb-6">
            {trimmedLine.substring(2)}
          </h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            {trimmedLine.substring(3)}
          </h2>
        );
      } else if (trimmedLine) {
        elements.push(
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {trimmedLine}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="text-blue-100 mt-2">Learn about our mission, vision, and values</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {aboutPage ? (
          <div className="bg-white rounded-xl shadow-md p-8 lg:p-12">
            {aboutPage.featuredImage && (
              <img
                src={aboutPage.featuredImage}
                alt={aboutPage.title}
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
            )}
            <div className="prose prose-lg max-w-none">
              {parseContent(aboutPage.content)}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Our School</h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to our institution of excellence. We are dedicated to providing quality
              education and fostering a nurturing environment for all students.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To empower students with knowledge, skills, and values that will enable them to
              succeed in life and contribute positively to society.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Vision</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To be a leading educational institution recognized for academic excellence,
              innovation, and character development.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
