import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { getServerToken } from '@/api/service/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GoogleCredentialResponse {
    credential?: string;
}

interface DecodedToken {
    email: string;
    name: string;
    picture?: string;
    [key: string]: any;
}

export default function Login() {
    const { signIn, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    const handleGoogleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
        if (!credentialResponse.credential) {
            setError('No credential received from Google');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await getServerToken(credentialResponse.credential);

            if (response.success && response.data?.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);

                const decoded = jwtDecode<DecodedToken>(credentialResponse.credential);
                await signIn(decoded);

                toast({
                    title: "Success",
                    description: "Successfully signed in!",
                    variant: "default",
                });

            } else {
                throw new Error(response.error || 'Failed to authenticate with server');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleError = () => {
        const errorMessage = 'Google sign-in failed. Please try again.';
        setError(errorMessage);

        toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
        });
    };

    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Sign in with Google
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="relative flex justify-center">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-50">
                                <Loader2 className="h-6 w-6 animate-spin" />
                            </div>
                        )}

                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            theme="filled_blue"
                            width="240"
                            logo_alignment="left"
                            locale="en"
                            shape="circle"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}