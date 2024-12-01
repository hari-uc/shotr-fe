import axiosInstance from "../axiosInstance";
import { ApiResponse } from "../../types/apiResponse";


export const createShortLink = async (longUrl: string, customAlias: string, topic: string): Promise<ApiResponse<{ shortUrl: string, createdAt: string }>> => {
    const payload: { [key: string]: string } = {
        longUrl,
        customAlias,
        topic
    };

    Object.keys(payload).forEach(key => {
        if (payload[key] === '') {
            delete payload[key];
        }
    });

    const response = await axiosInstance.post('/api/shorten', payload);
    return response.data;
};

