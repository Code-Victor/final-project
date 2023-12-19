import React, { useState } from "react";
import { Navbar, Hero, SearchResults } from "../components";
import { ThemeToggle } from "@/components/ThemeToggle";
import Weather from "@/components/Weather";
export function Home() {
  const [placeId, setPlaceId] = useState("");

  return (
    <>
      <div className="fixed bottom-5 right-5">
        <ThemeToggle />
      </div>
      <Navbar />
      <Hero placeId={placeId} setPlaceId={(s) => setPlaceId(s)} />
      <Weather />
      <SearchResults placeId={placeId} />
    </>
  );
}
