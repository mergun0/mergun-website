import Image from "next/image";
import Link from "next/link";

export function Brand({ href = "/" }: { href?: string }) {
  return (
    <Link className="brand" href={href} aria-label="Mergun ana sayfa">
      <Image src="/brand/logo-mark.svg" alt="" width={34} height={34} priority />
      <span>Mergun</span>
    </Link>
  );
}

