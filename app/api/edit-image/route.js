export async function POST(req) {
  try {
    const { imageUrl, prompt } = await req.json()
    if (!imageUrl || !prompt) {
      return new Response(JSON.stringify({ error: "Missing params" }), { status: 400 })
    }

    const res = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "stability-ai/stable-diffusion:latest",
        input: { image: imageUrl, prompt },
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), { status: res.status })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
