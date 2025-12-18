import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Downloads from './pages/Downloads';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAdmin, setShowAdmin] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const savedPage = sessionStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(savedPage);
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    sessionStorage.setItem('currentPage', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminToggle = () => {
    if (showAdmin) {
      setShowAdmin(false);
      setCurrentPage('home');
    } else {
      if (isAuthenticated) {
        setShowAdmin(true);
      } else {
        setCurrentPage('login');
      }
    }
  };

  const handleLogin = () => {
    setShowAdmin(true);
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    logout();
    setShowAdmin(false);
    setCurrentPage('home');
  };

  if (currentPage === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  if (showAdmin && isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header
          currentPage="admin"
          onNavigate={handleNavigate}
          isAdmin={true}
          onAdminToggle={() => {
            handleLogout();
          }}
        />
        <main className="flex-1">
          <Admin />
        </main>
        <Footer />
      </div>
    );
  }

  const renderPage = () => {
    if (currentPage.startsWith('news-')) {
      const postId = currentPage.substring(5);
      return <News selectedPostId={postId} onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'about':
        return <About />;
      case 'news':
        return <News onNavigate={handleNavigate} />;
      case 'gallery':
        return <Gallery />;
      case 'downloads':
        return <Downloads />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAdmin={false}
        onAdminToggle={handleAdminToggle}
      />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
