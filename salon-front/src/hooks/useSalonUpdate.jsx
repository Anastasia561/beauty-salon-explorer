import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "../api/axios.js";

export const useSalonUpdate = (id, onFormValidationError, onGeneralError) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedDto) => {
            const response = await axios.put(`/businesses/${id}`, updatedDto);
            if (response.data.error) throw response.data;
            return response.data;
        },
        onSuccess: () => {
            toast.success('Salon info updated successfully');
            queryClient.invalidateQueries({queryKey: ['salon', id]});
            queryClient.invalidateQueries({queryKey: ['businesses']});
        },
        onError: (err) => {
            if (!err?.response) {
                toast.error("Server is not responding.");
                return;
            }
            const {status, data} = err.response;

            if (status === 400) {
                const validationErrors = data?.error?.validationErrors;
                if (Array.isArray(validationErrors) && validationErrors.length > 0 && onFormValidationError) {
                    validationErrors.forEach((errObj) => {
                        onFormValidationError(errObj.field, errObj.message);
                    });
                    if (onGeneralError) onGeneralError("Validation failed");
                } else if (onGeneralError) {
                    onGeneralError(data?.error?.message || "Validation failed");
                }
            } else if (status === 404) {
                toast.error("Salon not found");
            } else {
                toast.error("Something went wrong");
            }
        }
    });
};