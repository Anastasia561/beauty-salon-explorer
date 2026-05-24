const ContactStep = ({register, errors, districts}) => {
    return (
        <div>
            <h3 className="h5 fw-bold mb-4 pb-2 border-bottom text-dark">Step 2: Location & Contacts</h3>
            <div className="mb-3">
                <label className="form-label fw-medium text-secondary">Operational District</label>
                <select
                    className={`form-select ${errors?.districtId ? "is-invalid" : ""}`}
                    {...register("districtId")}
                >
                    <option value="">Select Region...</option>
                    {districts?.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                </select>
                {errors?.districtId && <div className="invalid-feedback">{errors.districtId.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label fw-medium text-secondary">Street Address</label>
                <input
                    type="text"
                    className={`form-control ${errors?.address ? "is-invalid" : ""}`}
                    {...register("address")}
                />
                {errors?.address && <div className="invalid-feedback">{errors.address.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label fw-medium text-secondary">Telephone Number</label>
                <input
                    type="text"
                    className={`form-control ${errors?.phoneNumber ? "is-invalid" : ""}`}
                    {...register("phoneNumber")}
                />
                {errors?.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label fw-medium text-secondary">Website Address URL</label>
                <input
                    type="url"
                    className={`form-control ${errors?.websiteUrl ? "is-invalid" : ""}`}
                    {...register("websiteUrl")}
                />
                {errors?.websiteUrl && <div className="invalid-feedback">{errors.websiteUrl.message}</div>}
            </div>
        </div>
    );
};

export default ContactStep;