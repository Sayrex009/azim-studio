"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle, Circle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqLists() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqData: FaqItem[] = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
  ];

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen lg:mt-[-120px] lg:mb-[-120px] px-12 text-white flex items-center justify-center p-6">
      <div className="max-w-[1750px] w-full border border-white/30 p-6 rounded-md bg-black/10">
        <h1 className="text-5xl font-extrabold text-center mb-10 tracking-wider">
          FAQ
        </h1>
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <section
                key={index}
                className={`rounded-md border transition-all duration-300 ${
                  isActive
                    ? "border-white/40 bg-white/10 shadow-lg"
                    : "border-transparent hover:border-white/20"
                } px-4 lg:w-[1700px] lg:h-auto`}
                aria-expanded={isActive}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="flex items-center w-full text-left gap-4 py-4"
                  aria-controls={`faq-panel-${index}`}
                  aria-expanded={isActive}
                  id={`faq-header-${index}`}
                >
                  <div className="pt-1">
                    {isActive ? (
                      <CheckCircle className="w-5 h-5 text-yellow-300" />
                    ) : (
                      <Circle className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <p
                    className={`flex-1 font-semibold text-lg transition-colors duration-300 ${
                      isActive ? "text-green-300" : "text-white"
                    }`}
                  >
                    {item.question}
                  </p>
                  <ChevronDown
                    className={`w-5 h-5 mt-1 transition-transform duration-300 ${
                      isActive ? "rotate-180 text-yellow-300" : "text-white"
                    }`}
                  />
                </button>

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
                  className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
                    isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-white/80 text-sm leading-relaxed pb-4">
                    {item.answer}
                  </p>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
