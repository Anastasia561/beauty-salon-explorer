import 'bootstrap-icons/font/bootstrap-icons.css';
import {useSalonInfo} from "../hooks/useSalonInfo.jsx";
import {useNavigate, useParams} from "react-router-dom";

const SalonDetail = () => {
    const {id} = useParams();
    const {data: salonData, isLoading, isError} = useSalonInfo(id);
    const navigate = useNavigate();

    if (isError) return <div className="alert alert-danger m-4">Failed to load salon info</div>;

    if (isLoading) {
        return (
            <div className="container my-5" style={{maxWidth: '900px'}}>
                <button onClick={() => navigate(-1)}
                        className="btn btn-link text-decoration-none text-muted p-0 mb-4 d-inline-flex align-items-center gap-2">
                    <i className="bi bi-arrow-left"></i> Back to Exploration
                </button>
                <div className="d-flex flex-column align-items-center justify-content-center p-5">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="text-muted fw-medium">Loading salon info...</div>
                </div>
            </div>
        );
    }

    if (!salonData) return <div className="alert alert-warning m-4">No salon details found.</div>;

    const {
        name,
        districtName,
        address,
        phoneNumber,
        websiteUrl,
        avgRating,
        priceRange,
        totalReviews,
        services
    } = salonData;

    return (
        <div className="container my-5" style={{maxWidth: '900px'}}>
            <button onClick={() => navigate('/')}
                    className="btn btn-link text-decoration-none text-muted p-0 mb-4 d-inline-flex align-items-center gap-2">
                <i className="bi bi-arrow-left"></i> Back to Exploration
            </button>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
                <div className="p-4 p-md-5 text-white"
                     style={{background: 'linear-gradient(135deg, #1e1e24 0%, #2a2a35 100%)'}}>
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <i className="bi bi-geo-alt text-warning"></i>
                        <span className="text-uppercase fw-semibold tracking-wider small text-white-50">
                            {districtName} District
                        </span>
                    </div>
                    <h1 className="display-6 fw-bold mb-3">{name}</h1>

                    <div
                        className="d-flex flex-wrap gap-4 align-items-center mt-3 pt-3 border-top border-secondary-subtle">
                        <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-star-fill text-warning fs-5"></i>
                            <span className="fw-bold fs-5">{avgRating}</span>
                            <span className="text-white-50 small">({totalReviews} genuine reviews)</span>
                        </div>
                        <div className="vr text-white-50 d-none d-sm-block" style={{height: '20px'}}></div>
                        <div className="d-flex align-items-center gap-2">
                            <span className="text-white-50 small">Price Tier:</span>
                            <span className="fw-bold letter-spacing-1 text-warning">{priceRange}</span>
                        </div>
                    </div>
                </div>

                <div className="card-body p-4 p-md-5">
                    <div className="row g-4">
                        <div className="col-12 col-md-6 border-end">
                            <h3 className="h5 fw-bold text-dark mb-4 pb-2 border-bottom">Contact & Location</h3>
                            <div className="d-flex flex-column gap-3">

                                <div className="d-flex align-items-start gap-3">
                                    <div className="p-2 bg-light rounded-3 text-primary">
                                        <i className="bi bi-map fs-5"></i>
                                    </div>
                                    <div>
                                        <div className="small text-muted">Street Address</div>
                                        <div className="fw-medium text-dark">{address}, {districtName}</div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-start gap-3">
                                    <div className="p-2 bg-light rounded-3 text-success">
                                        <i className="bi bi-telephone fs-5"></i>
                                    </div>
                                    <div>
                                        <div className="small text-muted">Phone Enquiries</div>
                                        <a href={`tel:${phoneNumber}`}
                                           className="fw-medium text-decoration-none text-dark hover-underline">
                                            {phoneNumber}
                                        </a>
                                    </div>
                                </div>

                                {websiteUrl && (
                                    <div className="d-flex align-items-start gap-3">
                                        <div className="p-2 bg-light rounded-3 text-info">
                                            <i className="bi bi-globe fs-5"></i>
                                        </div>
                                        <div>
                                            <div className="small text-muted">Official Site</div>
                                            <a href={websiteUrl} target="_blank" rel="noopener noreferrer"
                                               className="fw-medium text-decoration-none text-primary break-all">
                                                {websiteUrl.replace(/https?:\/\//, '')} <i
                                                className="bi bi-box-arrow-up-right small ms-1"></i>
                                            </a>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="col-12 col-md-6 ps-md-4">
                            <h3 className="h5 fw-bold text-dark mb-4 pb-2 border-bottom">Available Services</h3>
                            <div className="d-flex flex-wrap gap-2">
                                {services && services.length > 0 ? (
                                    services.map(service => (
                                        <span
                                            key={service.id}
                                            className="badge bg-light text-dark border px-3 py-2 rounded-3 fw-medium d-inline-flex align-items-center gap-2"
                                            style={{fontSize: '0.9rem'}}
                                        >
                                            <i className="bi bi-check2-circle text-primary"></i>
                                            {service.name}
                                        </span>
                                    ))
                                ) : (
                                    <div className="text-muted small italic">No specified treatments registered.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalonDetail;