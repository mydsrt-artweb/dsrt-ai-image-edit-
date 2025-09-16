import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-cyan-500 via-purple-700 to-orange-500 text-white">
      <div className="text-center p-10 rounded-2xl bg-black/40 backdrop-blur-md shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4">🚀 DSRT Form</h1>
        <form className="flex flex-col gap-4">
          <Input label="Email Address" type="email" placeholder="your@email.com" />
          <Input label="Name" type="text" placeholder="Enter your name" />
          <Textarea label="Message" placeholder="Write your message..." rows={4} />
          <Select label="Choose Model">
            <option value="sdxl">Stable Diffusion XL</option>
            <option value="flux">FLUX 1.1</option>
            <option value="custom">Custom Model</option>
          </Select>
          <Button type="submit" variant="primary" className="mt-2">
            Submit
          </Button>
        </form>
      </div>
    </main>
  );
}
