import {useServices} from "../../hooks/useServices.jsx";

const ServicesStep = ({serviceIds = [], setValue, errors}) => {
    const {data: services = [], isLoading, isError} = useServices();

    if (isError) return <div className="alert alert-danger m-4">Failed to load services</div>;

    if (isLoading) {
        return (
            <div className="text-center p-4">
                <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                <span className="text-muted small">Loading treatment lists...</span>
            </div>
        );
    }

    const handleServiceToggle = (serviceId) => {
        const updatedIds = serviceIds.includes(serviceId)
            ? serviceIds.filter(id => id !== serviceId)
            : [...serviceIds, serviceId];

        setValue("serviceIds", updatedIds, {shouldValidate: true});
    };

    return (
        <div>
            <h3 className="h5 fw-bold mb-4 pb-2 border-bottom text-dark">Step 3: Offered Treatments</h3>
            <p className="text-muted small mb-3">Check or clear services provided at this specific establishment:</p>

            <div className={`list-group mb-2 ${errors?.serviceIds ? 'border border-danger rounded-3' : ''}`}>
                {services.map(service => {
                    const isChecked = serviceIds.includes(service.id);
                    return (
                        <label
                            key={service.id}
                            className={`list-group-item d-flex gap-3 align-items-center p-3 cursor-pointer ${isChecked ? 'bg-light' : ''}`}
                        >
                            <input
                                className="form-check-input flex-shrink-0"
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleServiceToggle(service.id)}
                                style={{width: '1.2rem', height: '1.2rem'}}
                            />
                            <span className="fw-medium text-dark">{service.name}</span>
                        </label>
                    );
                })}
            </div>
            {errors?.serviceIds && (
                <div className="text-danger small mt-1">
                    {errors.serviceIds.message}
                </div>
            )}
        </div>
    );
};

export default ServicesStep;