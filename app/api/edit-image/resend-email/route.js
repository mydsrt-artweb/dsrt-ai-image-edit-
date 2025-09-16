export async function POST(req) {
  try {
    const { to, subject, html } = await req.json()
    if (!to) {
      return new Response(JSON.stringify({ error: "Missing `to`" }), { status: 400 })
    }

    const siteDomain = process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, "")
      : "example.com"

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `noreply@${siteDomain}`,
        to: [to],
        subject,
        html,
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), { status: res.status })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
