import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import About from './pages/About'
import Attributions from './pages/Attributions'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Home from './pages/Home'
import ImageGenerator from './pages/ImageGenerator'
import Projects from './pages/Projects'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="about" element={<About />} />
        <Route path="attributions" element={<Attributions />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        {/* Hidden experiment: reachable by direct URL only, never linked. */}
        <Route path="image-generator" element={<ImageGenerator />} />
        <Route path="contact" element={<Navigate to="/about" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
