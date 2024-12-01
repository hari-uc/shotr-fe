import axiosInstance from "../axiosInstance";
import { ApiResponse } from "../../types/apiResponse";

export const getServerToken = async (googleToken: string): Promise<ApiResponse<{ accessToken: string }>> => {
    const response = await axiosInstance.post('/api/auth/token/exchange', { token: googleToken });
    return response.data;
};