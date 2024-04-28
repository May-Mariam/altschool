import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GithubProjects from './github-projects';
import ProjectDetails from './project-details';
import NotFound from './notfound';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GithubProjects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/404" element={<NotFound/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
