"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/data";
import { Button } from "../shared/Button";

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [index]);

  return (
    <section className="relative h-[calc(100vh-88px)] min-h-[520px] overflow-hidden bg-black">
      {heroSlides.map((item, itemIndex) => {
        const active = itemIndex === index;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={itemIndex === 0}
              sizes="100vw"
              className={`object-cover transition-transform duration-[8000ms] ease-out ${
                active ? "scale-110" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        );
      })}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        {heroSlides.map((item, itemIndex) => {
          const active = itemIndex === index;
          return (
            <div
              key={item.id}
              className={`absolute inset-x-0 flex flex-col items-center px-6 transition-all duration-700 ease-out ${
                active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-4 opacity-0"
              }`}
            >
              <h1 className="text-4xl font-semibold tracking-wide md:text-6xl">{item.title}</h1>
              <p className="mt-3 text-lg font-light md:text-2xl">{item.subtitle}</p>
              <Button href={item.cta.href} variant="primary" className="mt-6 min-w-40">
                {item.cta.label}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-8 left-6 z-10 flex gap-2">
        {heroSlides.map((item, itemIndex) => {
          const active = itemIndex === index;
          return (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to ${item.title}`}
              onClick={() => goTo(itemIndex)}
              className="h-[3px] w-10 overflow-hidden bg-white/40"
            >
              <span
                className={`block h-full bg-accent ${
                  active ? "w-full duration-[7000ms] ease-linear" : "w-0 duration-200 ease-out"
                } transition-all`}
              />
            </button>
          );
        })}
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80">
        <ChevronDown size={22} className="animate-bounce" />
      </div>

      <div className="absolute right-6 bottom-8 z-10 flex gap-3 text-white">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
          className="transition-transform duration-300 ease-out hover:-translate-x-0.5"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
          className="transition-transform duration-300 ease-out hover:translate-x-0.5"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
