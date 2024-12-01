export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string | null;
    message?: string;
    meta?: Record<string, any>;
}
