import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

const GithubProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.github.com/users/May-Mariam/repos"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        setError(error.message);
        showBoundary(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const results = projects.filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProjects(results);
    setCurrentPage(1);
  }, [search, projects]);

  // Pagination controls
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  if (loading)
    return (
      <div className="d-flex align-items-center justify-content-center">
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error loading projects: {error}</p>;

  return (
    <div className="container">
      <div className="py-5">
        <h1>My GitHub Projects</h1>
        <div className="mb-3">
          <label htmlFor="searchInput" className="form-label">
            Search projects
          </label>
          <input
            type="text"
            className="form-control"
            id="searchInput"
            placeholder="Search by project name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="">
          <div className="row g-3">
            {currentProjects.map((project) => (
              <div className="col-md-4" key={project.id}>
                <div
                  className="card h-100 border-0 shadow"
                  onClick={() => handleProjectClick(project.name)}
                >
                  <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.description}</p>
                    <a
                      onClick={() => handleProjectClick(project.name)}
                      target="_parent"
                      rel="noopener noreferrer"
                      className="btn btn-primary pointer"
                    >
                      See more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* //pagination */}

          <div className="my-3 d-flex gap-3 ">
            <button
              disabled={currentPage <= 1}
              onClick={previousPage}
              className="btn btn-secondary page-item"
            >
              Previous
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={nextPage}
              className="btn btn-secondary page-item"
            >
              <a href="" className="page-link"></a>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubProjects;
