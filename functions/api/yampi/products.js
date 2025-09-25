export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const include = url.searchParams.get('include') || 'skus,images';
    const limit = url.searchParams.get('limit') || '50';
    const page = url.searchParams.get('page') || '1';
    const skipCache = url.searchParams.get('skipCache') === 'true';

    const baseURL = `https://api.dooki.com.br/v2/${env.YAMPI_ALIAS}`;
    const params = new URLSearchParams({ include, limit, page });
    if (skipCache) params.append('skipCache', 'true');

    const resp = await fetch(`${baseURL}/catalog/products?${params}`, {
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
    return new Response(JSON.stringify({ error: 'Failed to fetch products', details: String(err) }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}