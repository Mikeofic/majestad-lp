export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const include = url.searchParams.get('include') || 'prices,stocks';
    const limit = url.searchParams.get('limit') || '50';
    const page = url.searchParams.get('page') || '1';

    const baseURL = `https://api.dooki.com.br/v2/${env.YAMPI_ALIAS}`;
    const params = new URLSearchParams({ include, limit, page });

    const resp = await fetch(`${baseURL}/catalog/skus?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Token': env.YAMPI_USER_TOKEN,
        'User-Secret-Key': env.YAMPI_USER_SECRET_KEY
      }
    });

    if (!resp.ok) {
      return new Response(JSON.stringify({ error: `Yampi API error: ${resp.status} - ${resp.statusText}` }), {
        status: resp.status,
        headers: { 'content-type': 'application/json' }
      });
    }

    const data = await resp.json();
    return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch skus', details: String(err) }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}