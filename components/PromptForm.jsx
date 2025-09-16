"use client"
import { useCallback } from "react"

export default function PromptForm({ prompt, setPrompt, onSubmit, loading }) {
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!loading) {
      onSubmit()
    }
  }, [onSubmit, loading])

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full border rounded-lg p-3 mb-2 focus:outline-none focus:ring focus:ring-sky-300"
        rows={3}
        placeholder="Describe how you want to edit the image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Generate"}
      </button>
    </form>
  )
}
