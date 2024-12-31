import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

function Countdown({ requestTime, expiryTime }) {
    const [timeLeft, setTimeLeft] = useState(expiryTime - requestTime);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - 1;
                return newTime > 0 ? newTime : 0;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="text-4xl font-mono">
                    {formatTime(Math.floor(timeLeft))}
                </div>
                <div className="mt-4 text-sm text-gray-500">
                    {timeLeft > 0
                        ? "Time remaining until expiry"
                        : "Quote expired"}
                </div>
            </CardContent>
        </Card>
    );
}

export default Countdown;
