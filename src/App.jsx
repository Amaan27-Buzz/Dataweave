import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import DatabaseDesigner from './pages/DatabaseDesigner'
import About from './pages/About'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'database-designer':
        return <DatabaseDesigner />;
      case 'about':
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App