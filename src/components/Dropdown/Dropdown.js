"use client";

import { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Dropdown({
    options,
    handleSelectChange,
    selectedOption,
    compact,
    placeholder,
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (options.length >= 1) {
            setIsLoading(false);
        }
    }, [options]);

    if (isLoading) {
        return <div>Loading options...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={compact ? `mr-1` : "w-full max-w-sm mx-auto"}>
            <Select onValueChange={handleSelectChange} value={selectedOption}>
                {compact ? (
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                ) : (
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                )}
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
