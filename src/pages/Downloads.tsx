import { FileText, Download } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function Downloads() {
  const { media } = useData();
  const downloadItems = media.filter((m) => m.category === 'downloads');

  const getFileIcon = (fileType: string) => {
    return <FileText className="h-8 w-8" />;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Downloads</h1>
          <p className="text-blue-100 mt-2">Access important documents and resources</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {downloadItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600">No downloads available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {downloadItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    {getFileIcon(item.fileType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>Type: {item.fileType.toUpperCase()}</div>
                        {item.fileSize && <div>Size: {formatFileSize(item.fileSize)}</div>}
                      </div>
                      <a
                        href={item.fileUrl}
                        download
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            If you're having trouble accessing or downloading any files, please contact our office
            at info@excellenceschool.edu or call (555) 123-4567. We're here to help!
          </p>
        </div>
      </div>
    </div>
  );
}
