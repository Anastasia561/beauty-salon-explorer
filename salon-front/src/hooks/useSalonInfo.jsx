import {useQuery} from "@tanstack/react-query";
import axios from "../api/axios.js";

export const useSalonInfo = (id) => {
    return useQuery({
        queryKey: ["salon", id],
        queryFn: async () => {
            const res = await axios.get(`/businesses/${id}`);

            if (res.data.error) throw new Error(res.data.error);
            return res.data.data;
        },
        enabled: !!id,
    });
};