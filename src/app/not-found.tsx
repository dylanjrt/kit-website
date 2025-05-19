import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-red-500">
      <h1 className="text-8xl font-black">404</h1>
      <h1 className="font-bold italic">Page Not Found</h1>
      <Link
        className="m-2 rounded-md border border-red-400 px-2 py-1 text-sm text-red-400 hover:bg-[#f4eed0]"
        href="/"
      >
        take me home
      </Link>
    </div>
  );
}
