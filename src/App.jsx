import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GithubProjects from "./GithubProjects";
import ProjectDetails from "./ProjectDetails";
import NotFound from "./NotFound";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryUI from "./ErrorBoundaryUI";

function errorBoundaryMessage(error) {
  console.log(`error Caught By Error Boundary: ${error}`);
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary
              FallbackComponent={ErrorBoundaryUI}
              onError={errorBoundaryMessage}
            >
              <GithubProjects />
            </ErrorBoundary>
          }
        />
        <Route
          path="/project/:id"
          element={
            <ErrorBoundary
              FallbackComponent={ErrorBoundaryUI}
              onError={errorBoundaryMessage}
            >
              <ProjectDetails />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
