import axiosInstance from "../axiosInstance";
import { ApiResponse } from "../../types/apiResponse";


export const createShortLink = async (longUrl: string, customAlias: string, topic: string): Promise<ApiResponse<{ shortUrl: string, createdAt: string }>> => {
    const response = await axiosInstance.post('/api/shorten', { longUrl, customAlias, topic });
    return response.data;
};

