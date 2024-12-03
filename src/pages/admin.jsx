import { Link, Route, Routes, useParams } from "react-router-dom";

export default function AdminPage() {
  const {"*":spalate} = useParams()
  console.log("🚀 ~ AdminPage ~ params:", spalate)
  const pathnames = spalate.split("/")
  console.log("🚀 ~ AdminPage ~ pathnames:", pathnames)
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6">
      <h1>welcome to AdminPage { JSON.stringify(pathnames)}</h1>
      <div className="space-x-6">
        <Link to=".">Home</Link>
        <Link to="./blog">Blog</Link>
      </div>
      <Routes>
        <Route path="/" element={<h1>Home admin page</h1>} />
        <Route path="/blog" element={<h1>Blog admin page</h1>} />
        <Route path="*" element={<h1>NotFound admin page</h1>} />
      </Routes>
    </div>
  );
}
