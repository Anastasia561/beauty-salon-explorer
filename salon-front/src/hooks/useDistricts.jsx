import {useQuery} from "@tanstack/react-query";
import axios from "../api/axios.js";

export const useDistricts = () => {

    return useQuery({
        queryKey: ["districts"],
        queryFn: async () => {
            const res = await axios.get("/districts");

            if (res.data.error) throw new Error(res.data.error);
            return res.data.data;
        },
        keepPreviousData: true,
    });
};