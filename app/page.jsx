"use client"
import { useState } from "react"
import UploadDropzone from "../components/UploadDropzone"
import PromptForm from "../components/PromptForm"
import ImagePreview from "../components/ImagePreview"
import { supabase } from "../lib/supabaseClient"

export default function Page() {
  const [file, setFile] = useState(null)
  const [prompt, setPrompt] = useState("")
  const [processing, setProcessing] = useState(false)
  const [resultUrl, setResultUrl] = useState(null)
  const [originalUrl, setOriginalUrl] = useState(null)

  async function handleUploadAndEdit() {
    if (!file) return alert("Pilih file terlebih dahulu")
    if (!prompt) return alert("Tulis prompt yang jelas")
    setProcessing(true)

    try {
      // Upload original ke Supabase
      const fileName = `originals/orig_${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, { upsert: false })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(fileName)
      setOriginalUrl(publicUrl)

      // Panggil API edit-image
      const res = await fetch("/api/edit-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: publicUrl, prompt })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Gagal mengedit")
      setResultUrl(data.outputUrl)
    } catch (err) {
      alert(err.message)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">DSRT — AI Image Edit</h1>
      <p className="mb-6 text-sm text-gray-600">
        Upload foto, ketik prompt, dan biarkan AI mengedit fotomu.
      </p>

      <UploadDropzone onFile={setFile} />
      <PromptForm
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={handleUploadAndEdit}
        loading={processing}
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ImagePreview title="Original" url={originalUrl} />
        <ImagePreview title="Result" url={resultUrl} />
      </div>
    </div>
  )
}
