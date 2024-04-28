import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProjectDetail = () => {
  const [project, setProject] = useState([]);
  const { id } = useParams();
  const [filteredProject, setFilteredProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://github.com/May-Mariam/image-search-app"
        );
        if (!response.ok) {
          navigate(`/404`);
        }
        const data = await response.json();
        console.log(data)
        setProject(data);
      } catch (error) {
        setError(error.message);
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
    <div className="container">
      <div className="py-5" >
      {project.name}
      {project.full_name}
    
      </div>
    </div>
  );
};

export default ProjectDetail;
