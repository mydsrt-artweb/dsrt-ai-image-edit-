export async function callReplicateImageEdit(base64Image, prompt) {
  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "a9758cbf...your-model-version...", // ganti dengan ID model SD / inpainting
      input: {
        image: `data:image/png;base64,${base64Image}`,
        prompt
      }
    })
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Replicate API error: ${errText}`)
  }

  return await res.json()
}
