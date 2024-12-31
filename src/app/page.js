import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Welcome to Ovex Assessment
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Empowering your digital journey with
                                    innovative solutions and cutting-edge
                                    technology.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button>
                                    <Link href="/rfq">Request a quote</Link>
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
                                        className="ml-2 h-4 w-4 inline-block"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
