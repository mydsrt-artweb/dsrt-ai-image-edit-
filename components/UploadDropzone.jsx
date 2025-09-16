"use client"
import { useCallback } from "react"

export default function UploadDropzone({ onFile }) {
  const handleChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      onFile(e.target.files[0])
    }
  }, [onFile])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFile(e.dataTransfer.files[0])
    }
  }, [onFile])

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="fileInput"
        onChange={handleChange}
      />
      <label htmlFor="fileInput" className="block cursor-pointer">
        <p className="text-gray-600">Drag & Drop your image here or click to browse</p>
      </label>
    </div>
  )
}
