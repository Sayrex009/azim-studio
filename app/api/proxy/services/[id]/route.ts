import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    context: { params: { id: string } },
) {
    const { id } = context.params;
    try {
        const res = await fetch(
            `https://kasimov.repid.uz/api/v1/common/services/${id}/`,
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to fetch from external API" },
                { status: res.status },
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
