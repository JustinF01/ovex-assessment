"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Countdown from "../Countdown/Countdown";

export default function Pop({ data, isOpen, togglePopup }) {
    const [totalCost, setTotalCost] = useState(0);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const number = parseFloat(data.amount);
    const formattedCurrency = new Intl.NumberFormat("en-US", {
        style: "decimal", // Use 'decimal' style to omit the symbol
        minimumFractionDigits: 2, // Ensure 2 decimal places for cents
        maximumFractionDigits: 2,
    }).format(number);

    useEffect(() => {
        if (data.side === "buy") {
            setTotalCost(parseFloat(data.amount) / parseFloat(data.rate));
        } else {
            setTotalCost(parseFloat(data.amount) * parseFloat(data.rate));
        }
    }, [data.amount, data.rate, data.side]);

    return (
        <div className="flex flex-col items-center space-y-4">
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={togglePopup}
                    ></div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative z-10">
                        <Button
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={togglePopup}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        <h2 className="text-xl font-semibold mb-4">
                            Quotation
                        </h2>
                        <div>
                            <Countdown
                                requestTime={data.requestDate}
                                expiryTime={data.expiryDate}
                            />
                        </div>
                        <div className="space-y-2 mt-4">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <span className="text-sm font-medium">
                                    Amount:
                                </span>
                                <span className="col-span-2 text-sm">
                                    {`${data.currency.toUpperCase()} ${formattedCurrency}`}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <span className="text-sm font-medium">
                                    Rate:
                                </span>
                                <span className="col-span-2 text-sm">
                                    {`${data.rate}`}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <span className="text-sm font-medium">
                                    Total Asset:
                                </span>
                                <span className="col-span-2 text-sm">
                                    {totalCost}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
