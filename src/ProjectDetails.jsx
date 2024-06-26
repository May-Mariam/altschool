import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

const ProjectDetail = () => {
  const [project, setProject] = useState([]);
  const { id } = useParams();
  const [filteredProject, setFilteredProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const { showBoundary } = useErrorBoundary();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/repos/May-Mariam/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to Fetch Repo Details");
        }
        const data = await response.json();
        console.log(data);
        setProject(data);
      } catch (error) {
        setError(error.message);
        showBoundary(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading)
    return (
      <div className="d-flex align-items-center justify-content-center">
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  if (error) return <p>Error loading projects: {error}</p>;

  return (
    <div className="py-5 mx-5">
      <div className="repo-header">
        <h2 className="repo-title">{project.name}</h2>
        <p className="repo-fullname">{project.full_name}</p>
      </div>
      <div className="repo-details">
        <p className="repo-description">
          {" "}
          Repository Description: {project.description}
        </p>
        <p className="repo-stars">Stars: {project.stargazers_count}</p>
        <p className="repo-forks">Forks: {project.forks_count}</p>
        <p className="repo-url">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProjectDetail;
