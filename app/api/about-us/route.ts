// app/api/about-us/route.ts (App Router API)
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch('https://kasimov.repid.uz/api/v1/common/about_us/', {
            headers: {
                Accept: 'application/json',
            },
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch data' }, { status: res.status });
        }

        const data = await res.json();

        // Обработка image-путей
        const fixedData = data.map((item: any) => ({
            ...item,
            image: item.image?.startsWith('http')
                ? item.image
                : `https://kasimov.repid.uz${item.image}`,

        }));

        return NextResponse.json(fixedData);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
