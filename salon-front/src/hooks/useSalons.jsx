import {useQuery} from "@tanstack/react-query";
import axios from "../api/axios.js";

export const useSalons = (page = 0, size = 5, service = "", district = "") => {

    return useQuery({
        queryKey: ["businesses", page, size, service, district],
        queryFn: async () => {
            const res = await axios.get("/businesses", {
                params: {page, size, service: service || undefined, district: district || undefined},
            });

            if (res.data.error) throw new Error(res.data.error);
            return res.data.data;
        },
        keepPreviousData: true,
    });
};