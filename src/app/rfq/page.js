"use client";

import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/Dropdown/Dropdown";
import Pop from "@/components/Pop/Pop";
import axios from "axios";

export default function Home() {
    const [markets, setMarkets] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMarket, setSelectedMarket] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [side, setSide] = useState("buy");
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [displayData, setDisplayData] = useState({
        name: "John Doe",
        age: 30,
        email: "john@example.com",
        occupation: "Software Developer",
        location: "New York, NY",
        hobbies: "Reading, Hiking, Photography",
    });

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleMarketSelection = (value) => {
        setSelectedMarket(value);
    };

    const handleCurrencySelection = (value) => {
        setSelectedCurrency(value);
    };

    const handleChange = (event) => {
        const newValue = event.target.value;
        if (newValue === "" || /^[0-9\b]+$/.test(newValue)) {
            setValue(newValue);
            setError("");
        } else {
            setError("Please enter numbers only");
        }
    };

    useEffect(() => {
        axios
            .get("api/getMarkets")
            .then((response) => {
                if (response.status === 200) {
                    setMarkets(
                        response.data.map((market) => ({
                            value: market.id,
                            label: market.name,
                        }))
                    );
                }
            })
            .catch((error) => console.error(error)); // Logs the fetched data

        axios
            .get("api/getCurrencies")
            .then((response) => {
                if (response.status === 200) {
                    setCurrencies(
                        response.data.map((curr) => ({
                            value: curr.id,
                            label: curr.name,
                        }))
                    );
                }
            })
            .catch((error) => console.error(error)); // Logs the fetched data
    }, []);

    const handleSideSelection = (type) => {
        setSide(type);
    };

    const handleRequestQuote = () => {
        try {
            const marketForQuote = markets.find(
                (market) => market.value === selectedMarket
            )?.value;

            const fromAmount = value;
            const data = {
                market: marketForQuote,
                fromAmount,
                side,
            };
            const config = {
                headers: {
                    "Content-Type": "application/json", // Set the content type
                },
            };
            axios
                .post("api/requestQuote", JSON.stringify(data), config)
                .then((res) => {
                    if (res.status === 200) {
                        const dataToDisplay = {
                            amount: res.data.from_amount,
                            currency: res.data.from_currency,
                            rate: res.data.rate,
                            expiryDate: res.data.expires_at,
                            requestDate: res.data.requested_at,
                            side: res.data.side,
                        };
                        setIsOpen(true);
                        setDisplayData(dataToDisplay);
                    }
                })
                .catch((error) => console.error(error.message));
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="mb-12">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Request a Quote
                                </h1>
                            </div>
                            <div className="w-full max-w-[1200px] m-auto flex flex-col items-stretch justify-between">
                                <div className="rfq-box w-full flex-col items-center justify-center border h-full py-12  m-1">
                                    <div className="buttonGroup max-w-sm mx-auto flex items-start justify-start w-full mb-4">
                                        <div className="mr-1 w-full">
                                            <Button
                                                variant={
                                                    side === "buy"
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className={`w-full ${
                                                    side === "buy"
                                                        ? "bg-green-500 hover:bg-green-600"
                                                        : ""
                                                }`}
                                                aria-pressed={side === "buy"}
                                                onClick={() =>
                                                    handleSideSelection("buy")
                                                }
                                            >
                                                Buy
                                            </Button>
                                        </div>
                                        <div className="w-full">
                                            <Button
                                                variant={
                                                    side === "sell"
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className={`w-full ${
                                                    side === "sell"
                                                        ? "bg-red-500 hover:bg-red-600"
                                                        : ""
                                                }`}
                                                aria-pressed={side === "sell"}
                                                onClick={() =>
                                                    handleSideSelection("sell")
                                                }
                                            >
                                                Sell
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="select-trading-pair max-w-sm mx-auto">
                                        <div className="flex flex-col items-start ">
                                            {markets.length >= 1 && (
                                                <Dropdown
                                                    options={markets}
                                                    handleSelectChange={
                                                        handleMarketSelection
                                                    }
                                                    selectedOption={
                                                        selectedMarket
                                                    }
                                                    placeholder={`Select a market`}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="max-w-sm mx-auto">
                                        <div className="flex flex-col items-start my-3">
                                            <label className="text-sm text-left w-full mb-1">
                                                Select currency and amount
                                            </label>
                                            <div className="flex w-full items-start">
                                                <Dropdown
                                                    options={currencies}
                                                    handleSelectChange={
                                                        handleCurrencySelection
                                                    }
                                                    selectedOption={
                                                        selectedCurrency
                                                    }
                                                    compact
                                                    placeholder={"Currency"}
                                                />
                                                <Input
                                                    id="numeric-input"
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    value={value}
                                                    onChange={handleChange}
                                                    aria-invalid={
                                                        error ? "true" : "false"
                                                    }
                                                    aria-describedby={
                                                        error
                                                            ? "numeric-input-error"
                                                            : undefined
                                                    }
                                                    placeholder="Enter amount"
                                                    className=" w-full flex-grow"
                                                />
                                            </div>
                                            <div className="pt-4">
                                                <Button
                                                    onClick={handleRequestQuote}
                                                >
                                                    Request Quote
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Pop
                    data={displayData}
                    isOpen={isOpen}
                    togglePopup={togglePopup}
                />
            </main>
        </div>
    );
}
