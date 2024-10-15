import ClipLoader from 'react-spinners/ClipLoader'; // Importando o ClipLoader
import '../styles/loading.css';

const LoadingIcon = () => {
    return (
        <div className="loading-container">
            <ClipLoader color="#2980b9" loading={true} size={50} />
        </div>
    );
}

export default LoadingIcon;