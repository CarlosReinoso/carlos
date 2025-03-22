import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <nav className="flex flex-col h-full space-y-1 items-center justify-center">
        <Link href="/web-dev">web dev</Link>
        <Link href="/property">property</Link>
        <Link href="/music">music</Link>
      </nav>
    </>
  );
}
