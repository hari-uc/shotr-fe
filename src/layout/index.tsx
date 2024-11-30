import NavBar from './nav-bar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}