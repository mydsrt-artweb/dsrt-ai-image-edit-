export default function ImagePreview({ title, url }) {
  return (
    <div className="border rounded-lg p-3 bg-white shadow-sm">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      {url ? (
        <img
          src={url}
          alt={title}
          className="w-full rounded-lg object-contain max-h-96"
        />
      ) : (
        <div className="text-gray-400 text-sm italic">No image</div>
      )}
    </div>
  )
}
