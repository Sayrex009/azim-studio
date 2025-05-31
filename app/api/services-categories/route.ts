import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://kasimov.repid.uz/api/v1/common/service_categories/', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Ошибка при получении категорий' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка сервера:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
