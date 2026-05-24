const GeneralInfoStep = ({register, errors}) => {
    return (
        <div>
            <h3 className="h5 fw-bold mb-4 pb-2 border-bottom text-dark">Step 1: Core Profile Info</h3>
            <div className="mb-3">
                <label className="form-label fw-medium text-secondary">Salon Brand Name</label>
                <input
                    type="text"
                    className={`form-control ${errors?.name ? "is-invalid" : ""}`}
                    {...register("name")}
                />
                {errors?.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label fw-medium text-secondary">Price Category Range</label>
                <select
                    className="form-select"
                    {...register("priceRange")}
                >
                    <option value="$">$ (Budget Friendly)</option>
                    <option value="$$">$$ (Moderate)</option>
                    <option value="$$$">$$$ (Standard)</option>
                    <option value="$$$$">$$$$ (Luxury)</option>
                    <option value="$$$$$">$$$$$ (Premium)</option>
                </select>
            </div>
        </div>
    );
};

export default GeneralInfoStep;