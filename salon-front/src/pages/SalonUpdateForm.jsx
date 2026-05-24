import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {useSalonInfo} from "../hooks/useSalonInfo.jsx";
import {useDistricts} from "../hooks/useDistricts.jsx";
import {useSalonUpdate} from "../hooks/useSalonUpdate.jsx";

import GeneralInfoStep from "../components/salonUpdate/GeneralnfoStep.jsx";
import ContactStep from "../components/salonUpdate/ContactStep.jsx";
import ServicesStep from "../components/salonUpdate/ServicesStep.jsx";
import {step1Schema, step2Schema, step3Schema} from "../components/salonUpdate/Schemas.jsx";

const SalonUpdateForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const {data: initialSalon, isLoading: loadingSalon} = useSalonInfo(id);
    const {data: districts} = useDistricts();

    const [step, setStep] = useState(1);
    const totalSteps = 3;
    const [generalError, setGeneralError] = useState("");

    const schemas = {
        1: step1Schema,
        2: step2Schema,
        3: step3Schema
    };

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schemas[step]),
        mode: "all",
        shouldUnregister: false,
        defaultValues: {
            name: "", districtId: "", address: "", phoneNumber: "",
            websiteUrl: "", priceRange: "$$", serviceIds: []
        }
    });

    useEffect(() => {
        if (initialSalon) {
            const matchingDistrict = districts?.find(
                d => d.name?.toLowerCase() === initialSalon.districtName?.toLowerCase()
            );

            reset({
                name: initialSalon.name || "",
                districtId: matchingDistrict ? String(matchingDistrict.id) : String(initialSalon.districtId || ""),
                address: initialSalon.address || "",
                phoneNumber: initialSalon.phoneNumber || "",
                websiteUrl: initialSalon.websiteUrl || "",
                priceRange: initialSalon.priceRange || "$$",
                serviceIds: initialSalon.services ? initialSalon.services.map(s => s.id) : []
            });
        }
    }, [initialSalon, districts, reset]);

    const updateMutation = useSalonUpdate(id,
        () => {
        },
        (genMsg) => setGeneralError(genMsg)
    );

    if (loadingSalon) {
        return (
            <div className="text-center p-5">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    const nextStep = async (e) => {
        e.preventDefault();
        setGeneralError("");

        const isValid = await trigger();
        if (isValid && step < totalSteps) {
            setStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) setStep(prev => prev - 1);
    };

    const onFormSubmit = (data) => {
        setGeneralError("");

        const finalDto = {
            ...data,
            districtId: parseInt(data.districtId, 10),
            serviceIds: data.serviceIds.map(id => parseInt(id, 10))
        };

        updateMutation.mutate(finalDto, {
            onSuccess: () => navigate(`/salons/${id}`)
        });
    };

    const currentFormValues = watch();

    return (
        <div className="container my-5" style={{maxWidth: '650px'}}>
            {generalError && <div className="alert alert-danger mb-4">{generalError}</div>}

            <div className="card shadow-sm border-0 mb-4 bg-white p-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small fw-bold text-uppercase">Update Profile Progress</span>
                    <span className="badge bg-primary">Step {step} of {totalSteps}</span>
                </div>
                <div className="progress" style={{height: '6px'}}>
                    <div className="progress-bar bg-primary" style={{width: `${(step / totalSteps) * 100}%`}}></div>
                </div>
            </div>

            <form onSubmit={step === totalSteps ? handleSubmit(onFormSubmit) : nextStep}
                  className="card shadow-sm border-0 p-4 bg-white">

                {step === 1 && <GeneralInfoStep register={register} errors={errors}/>}
                {step === 2 && <ContactStep register={register} districts={districts} errors={errors}/>}
                {step === 3 && (<ServicesStep serviceIds={currentFormValues.serviceIds} setValue={setValue}
                                              errors={errors}/>)}

                <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                    <button type="button" className="btn btn-light border px-4"
                            onClick={step === 1 ? () => navigate(-1) : prevStep}>
                        {step === 1 ? "Cancel" : "Back"}
                    </button>
                    <button type="submit" className={`btn px-4 ${step === totalSteps ? 'btn-success' : 'btn-primary'}`}
                            disabled={updateMutation.isPending}>
                        {updateMutation.isPending && <span className="spinner-border spinner-border-sm me-2"></span>}
                        {step === totalSteps ? "Save Changes" : "Continue"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SalonUpdateForm;