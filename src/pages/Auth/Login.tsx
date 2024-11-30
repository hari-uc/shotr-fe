import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
    const { signIn, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    const handleGoogleSuccess = (credentialResponse: any) => {
        const decoded = jwtDecode(credentialResponse.credential);
        signIn(decoded);
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            theme="filled_blue"
                            width="100%"
                            shape="circle"
                            logo_alignment="left"
                            locale="en"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
