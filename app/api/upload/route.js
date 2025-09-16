import { createClient } from "@supabase/supabase-js"

export async function POST(req) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const formData = await req.formData()
    const file = formData.get("file")
    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), { status: 400 })
    }

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`uploads/${Date.now()}-${file.name}`, file)

    if (error) throw error

    return new Response(JSON.stringify({ path: data.path }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
