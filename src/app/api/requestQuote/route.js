import { NextResponse } from "next/server";

export async function POST(Request) {
    const requestBody = await Request.json();
    const market = requestBody.market;
    const fromAmount = requestBody.fromAmount;
    const side = requestBody.side;
    const toAmount = requestBody.toAmount;
    try {
        // Replace this URL with the actual third-party API you want to call
        const apiUrl = `${process.env.API_URL}/rfq/get_quote?market=${market}&from_amount=${fromAmount}&side=${side}
`;

        const response = await fetch(apiUrl, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Return the data with appropriate headers
        return NextResponse.json(data, {
            status: 200,
            headers: {
                "Cache-Control": "no-store, max-age=0",
            },
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
}
