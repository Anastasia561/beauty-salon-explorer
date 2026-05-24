import {useQuery} from "@tanstack/react-query";
import axios from "../api/axios.js";

export const useServices = () => {

    return useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await axios.get("/services");

            if (res.data.error) throw new Error(res.data.error);
            return res.data.data;
        },
        keepPreviousData: true,
    });
};