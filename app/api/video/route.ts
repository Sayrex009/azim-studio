// app/api/videos/route.ts
export async function GET() {
  try {
    const res = await fetch('https://kasimov.repid.uz/api/v1/common/videos/', {
      headers: {
        accept: 'application/json',
      },
      cache: 'no-store', // чтобы всегда получать актуальные данные
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Upstream error' }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal proxy error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
