export async function GET() {
  const res = await fetch('https://kasimov.repid.uz/api/v1/common/service_categories/', {
    headers: {
      accept: 'application/json',
    },
    cache: 'no-store', // опционально
  });

  const data = await res.json();
  return Response.json(data);
}
