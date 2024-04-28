 const NotFound = () => {
  return(
    <div className="container text-center">
    <div className="row">
      <div className="col-md-12 error-container">
        <h1 className="error-heading">404</h1>
        <p className="error-message">Oops! Page not found.</p>
        <p className="error-message">The page you are looking for might have been removed or its name changed or it is temporarily unavailable.</p>
        <a href="/" className="btn btn-primary error-back-link">Back to Home</a>
      </div>
    </div>
  </div>
  )

 }


export default NotFound;