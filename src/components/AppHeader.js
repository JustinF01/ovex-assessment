import Link from "next/link";

const AppHeader = () => {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link className="flex items-center justify-center" href="/">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="sr-only">Ovex Assessment</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link
                    className="text-sm font-medium hover:underline underline-offset-4"
                    href="/rfq"
                >
                    Request a Quote
                </Link>
            </nav>
        </header>
    );
};

export default AppHeader;
