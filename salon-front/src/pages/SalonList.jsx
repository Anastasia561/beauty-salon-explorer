import DataCard from "../components/common/DataCard.jsx";
import {useSalons} from "../hooks/useSalons.jsx";
import ListContainer from "../components/common/ListContainer.jsx";
import {useState} from "react";
import SearchInput from "../components/common/SearchInput.jsx";
import Pagination from "../components/common/Pagination.jsx";
import {useDistricts} from "../hooks/useDistricts.jsx";
import {useNavigate} from "react-router-dom";

const SalonList = () => {
    const [district, setDistrict] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const pageSize = 10;
    const navigate = useNavigate();

    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleDistrictChange = (e) => {
        setDistrict(e.target.value);
        setCurrentPage(1);
    };

    const {data, isLoading, isError} = useSalons(currentPage - 1, pageSize, searchTerm, district);
    const {data: districts} = useDistricts();

    if (isError) return <div className="alert alert-danger m-4">Failed to load salons</div>;

    const salons = data?.content || [];
    const totalPages = data?.totalPages || 0;

    return (
        <ListContainer title="Beauty Salons">
            <div className="d-flex flex-wrap gap-3 p-3 mb-4 rounded shadow-sm border bg-light">
                <div style={{flex: '1 1 300px'}}>
                    <SearchInput onSearch={handleSearch} placeholder="Search by service name..."/>
                </div>
                <div style={{minWidth: '200px'}}>
                    <select
                        className="form-select"
                        value={district}
                        onChange={handleDistrictChange}
                    >
                        <option value="">All Districts</option>

                        {districts && districts.map((dist) => {
                            return (
                                <option key={dist.id} value={dist.name}>
                                    {dist.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>

            <div className="row row-cols-1 g-4 mt-2">
                {isLoading ? (
                    <div className="d-flex flex-column align-items-center justify-content-center p-5">
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="text-muted fw-medium">Searching for salons...</div>
                    </div>
                ) : salons.length > 0 ? (
                    salons.map(salon => (
                        <DataCard
                            key={salon.id}
                            name={
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-shop text-primary fs-5"></i>
                                    <span className="text-dark">{salon.name}</span>
                                </div>
                            }
                            details={[
                                {
                                    label: <><i className="bi bi-geo-alt-fill me-1 text-secondary"></i>District</>,
                                    value: <span className="text-dark fw-medium">{salon.districtName}</span>
                                },
                                {
                                    label: <><i className="bi bi-star-fill me-1 text-warning"></i>Rating</>,
                                    value: <span className="text-dark fw-bold">★ {salon.avgRating}</span>
                                },
                                {
                                    label: <><i className="bi bi-currency-dollar me-1 text-success"></i>Price Range</>,
                                    value: <span className="text-dark fw-medium">{salon.priceRange}</span>
                                }
                            ]}
                            renderActions={() => (
                                <div className="d-flex gap-2 justify-content-end w-100 mt-2 mt-md-0">
                                    <button
                                        className="btn btn-light btn-sm d-flex align-items-center gap-1 px-3 border shadow-sm"
                                        onClick={() => navigate(`/salons/${salon.id}`)}>
                                        <i className="bi bi-info-circle text-success"></i> Info
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm d-flex align-items-center gap-1 px-3 shadow-sm">
                                        <i className="bi bi-pencil-square"></i> Update
                                    </button>
                                </div>
                            )}
                        />
                    ))
                ) : (
                    <div className="text-center p-5 text-muted">No salons matched your search.</div>
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </ListContainer>
    );
};

export default SalonList;