import { Link } from 'react-router-dom';
import GridDistortion from './GridDistortion';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      {/* Fallback background image */}
      <div 
        className="not-found-fallback-bg"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/portfolio/Photo CV.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      <div className="not-found-background">
        <GridDistortion
          imageSrc="/images/portfolio/Photo CV.jpeg"
          grid={20}
          mouse={0.3}
          strength={0.5}
          relaxation={0.8}
          className="not-found-distortion"
        />
      </div>
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">
          I know you would end up here,{' '}
          <Link to="/" className="not-found-link">
            follow me this way
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
