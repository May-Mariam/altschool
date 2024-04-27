import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const { id } = useParams();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.github.com/repos/soloPayne/financial-dashboard/contents"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        setError(error.message);
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
    <div className="container">
      <div className="py-5">
        <div className="mb-3">
          <label htmlFor="searchInput" className="form-label">
            Search project content
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
          <table class="table caption-top">
            <caption>List of contents for: {id}</caption>
            <thead>
              <tr>
                <th scope="col">s/N</th>
                <th scope="col">File name</th>
                <th scope="col">Url</th>
                <th scope="col">Size</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project, index) => (
                <tr key={project.path}>
                  <th scope="row">{indexOfFirstProject + index + 1}</th>
                  <td>{project.name}</td>
                  <td>{project.url}</td>
                  <td>{project.size}</td>
                </tr>
              ))}
            </tbody>
          </table>

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

export default ProjectDetails;
