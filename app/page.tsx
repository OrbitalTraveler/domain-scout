"use client";

import Searchbar from "@/components/Searchbar";
import Globe from "@/components/globe/Globe";
import Image from "next/image";
import React from "react";

function Home() {
  return (
    <>
      <section className="px-6 md:px-20 pt-24 pb-2 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Your Domain Deal Finder
              <Image
                src="/assets/icons/arrow-right.svg"
                width={16}
                height={16}
                alt="arrow-right"
              />
            </p>
            <h1 className="head-text">
              Save Your Money with
              <span className="text-primary"> DomainScout</span>
            </h1>
            <p className="mt-6">
              Discover the best domain deals quickly. Compare prices,
              save money, and establish your online presence
              effortlessly.
            </p>
            <Searchbar />
          </div>
          <Globe />
        </div>
      </section>
    </>
  );
}

export default Home;
