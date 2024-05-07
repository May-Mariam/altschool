export default function ErrorBoundaryUI() {
  const handleRefresh = () => {
    window.location.refresh();
  };
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-12 error-container">
          <h1 className="error-heading">Error Boundary</h1>
          <p className="error-message">Oops! Something Went Wrong.</p>
          <button onClick={handleRefresh}>Refresh</button>
        </div>
      </div>
    </div>
  );
}
