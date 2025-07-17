export default function Footer() {
  return (
    <footer className="bg-background text-secondary mt-auto flex w-full items-center justify-end pr-8 pb-8 text-sm sm:pr-24">
      <span>
        site by:{" "}
        <a
          href="https://dylanrt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:italic"
        >
          Dylan RT
        </a>
      </span>
    </footer>
  );
}
