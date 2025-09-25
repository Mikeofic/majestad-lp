export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const productId = url.searchParams.get('productId');
    const include = url.searchParams.get('include') || 'skus,images';
    if (!productId) {
      return new Response(JSON.stringify({ error: 'Missing productId' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    const baseURL = `https://api.dooki.com.br/v2/${env.YAMPI_ALIAS}`;

    const resp = await fetch(`${baseURL}/catalog/products/${productId}?include=${include}`, {
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
    return new Response(JSON.stringify({ error: 'Failed to fetch product', details: String(err) }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}