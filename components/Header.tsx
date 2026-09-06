"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";
import { PhoneIcon } from "@/components/icons";
import CallButton from "@/components/CallButton";
import Wordmark from "@/components/Wordmark";
import StatusPill from "@/components/StatusPill";
import SmoothLink from "@/components/SmoothLink";

const nav = [
  { href: "#carte", label: "La carte" },
  { href: "#panneaux", label: "Les panneaux" },
  { href: "#avis", label: "Avis" },
  { href: "#infos", label: "Horaires & accès" },
];

export default function Header() {
  // Transparent au-dessus du hero, opaque dès qu'on défile : la barre ne
  // masque pas le visuel d'entrée mais reste lisible ensuite.
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <SmoothLink href="#haut" ariaLabel={`${site.name}, haut de page`}>
          <Wordmark size="sm" />
        </SmoothLink>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navigation principale"
        >
          {nav.map((l) => (
            <SmoothLink
              key={l.href}
              href={l.href}
              className="text-sm text-bone/65 transition-colors hover:text-bone"
            >
              {l.label}
            </SmoothLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <StatusPill className="hidden md:inline-flex" />
          <CallButton className="btn-brand !px-5 !py-2.5 !text-sm">
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{site.phoneDisplay}</span>
            <span className="sm:hidden">Appeler</span>
          </CallButton>
        </div>
      </div>
    </header>
  );
}
