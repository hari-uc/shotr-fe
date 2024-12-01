import { useLayoutEffect } from 'react';
import { useParams } from 'react-router';

export default function Redirector() {
    const { shortUrl } = useParams();
    const { SHOTR_API_URL } = process.env;
    const redirectUrl = `${SHOTR_API_URL}/api/shorten/${shortUrl}`;

    useLayoutEffect(() => {
        if (shortUrl) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = redirectUrl;
            document.head.appendChild(prefetchLink);

            window.location.replace(redirectUrl);
        }
    }, [shortUrl, redirectUrl]);
    return null;
}