"use client";

import { ValidateDomain } from "@/lib/helpers/ValidateDomain";
import { scrapeDomainPrices } from "@/lib/scraper";
import { FormEvent, useState } from "react";

function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = ValidateDomain(searchQuery);

    if (!isValidLink)
      return alert("Please enter a valid domain name");

    try {
      setIsLoading(true);

      const domain = await scrapeDomainPrices(searchQuery);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-wrap gap-4 mt-12"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter domain name here..."
        className="searchbar-input"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
      />

      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchQuery === ""}
      >
        {isLoading ? "Searching" : "Search"}
      </button>
    </form>
  );
}

export default Searchbar;
