import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404 - Not Found</h1>
            <Button onClick={() => navigate('/')}>Go back to home</Button>
        </div>
    );
}
