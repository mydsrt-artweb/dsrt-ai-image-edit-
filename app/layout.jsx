import "../styles/globals.css"

export const metadata = {
  title: "DSRT — AI Image Edit",
  description: "Upload photo + prompt → AI-powered edit (Replicate)"
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
          <main className="max-w-4xl mx-auto p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
