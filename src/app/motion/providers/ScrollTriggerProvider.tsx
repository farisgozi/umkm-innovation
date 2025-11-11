"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    useEffect(() => {
        const lenis = document.querySelector("html")?.lenis;
        if (!lenis) return;

        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value?: number) {
            if (typeof value === "number") {
                lenis.scrollTo(value);
            } else {
                return lenis.scroll.current;
            }
            },
            getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
            },
        });

        const update = () => {
            ScrollTrigger.update();
        };

        lenis.on("scroll", update);
        ScrollTrigger.addEventListener("refresh", update);
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.removeEventListener("refresh", update);
            lenis.off("scroll", update);
        };
    }, []);

  return <>{children}</>;
}
