import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GithubProjects from './github-projects';
import ProjectDetails from './project-details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GithubProjects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
