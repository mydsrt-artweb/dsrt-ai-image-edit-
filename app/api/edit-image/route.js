import { supabaseAdmin } from "../../../lib/supabaseClient"
import { callReplicateImageEdit } from "../../../lib/replicateClient"

export async function POST(req) {
  try {
    const { imageUrl, prompt, userId, email } = await req.json()
    if (!imageUrl || !prompt) {
      return new Response(JSON.stringify({ error: "Missing imageUrl or prompt" }), { status: 400 })
    }

    // Download image
    const r = await fetch(imageUrl)
    if (!r.ok) throw new Error("Failed to fetch image from storage")
    const arrayBuffer = await r.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const b64 = buffer.toString("base64")

    // Call Replicate
    const prediction = await callReplicateImageEdit(b64, prompt)

    // Ambil output dari Replicate
    let outputBase64
    if (Array.isArray(prediction.output) && prediction.output[0]) {
      outputBase64 = prediction.output[0]
    } else if (prediction.output && typeof prediction.output === "string") {
      outputBase64 = prediction.output
    }

    if (!outputBase64) throw new Error("No output from Replicate")

    // Pastikan base64 tanpa prefix data URI
    const commaIndex = outputBase64.indexOf(",")
    const b64data = commaIndex >= 0 ? outputBase64.slice(commaIndex + 1) : outputBase64
    const outBuffer = Buffer.from(b64data, "base64")

    // Upload hasil ke Supabase
    const outFileName = `outputs/output_${Date.now()}.png`
    const { error: uploadErr } = await supabaseAdmin.storage
      .from("images")
      .upload(outFileName, outBuffer, { contentType: "image/png" })

    if (uploadErr) throw uploadErr

    const { data: { publicUrl } } = supabaseAdmin.storage.from("images").getPublicUrl(outFileName)

    // Simpan record di DB
    await supabaseAdmin.from("images").insert({
      original_url: imageUrl,
      output_url: publicUrl,
      prompt,
      status: "done"
    })

    return new Response(JSON.stringify({ outputUrl: publicUrl }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
