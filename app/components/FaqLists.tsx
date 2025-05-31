'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, CheckCircle, Circle } from 'lucide-react'

interface FaqItem {
    question: string
    answer: string
}

export default function FaqLists() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    const faqData: FaqItem[] = [
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        },
    ]

    const toggleItem = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <main className="min-h-screen px-12 text-white flex items-center justify-center p-6">
            <div className="max-w-[1750px] w-full border border-white/30 p-6 rounded-md">
                <h1 className="text-5xl font-extrabold text-center mb-10 tracking-wider">FAQ</h1>
                <div className="space-y-4 ">
                    {faqData.map((item, index) => {
                        const isActive = activeIndex === index
                        return (
                            <div
                                key={index}
                                className={`1rounded-md border ${isActive ? 'border-white/40 bg-white/10' : 'border-transparent'
                                    } px-4 lg:w-[1700px] lg:h-[80px] transition-all duration-300`}
                            >
                                <button
                                    onClick={() => toggleItem(index)}
                                    className="flex items-start w-full text-left gap-4"
                                >
                                    <div className="pt-1">
                                        {isActive ? (
                                            <CheckCircle className="w-5 h-5 text-yellow-300" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-white" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-semibold text-lg text-white ${isActive ? 'text-green-300' : ''}`}>
                                            {item.question}
                                        </p>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 mt-1 transition-transform duration-300 ${isActive ? 'rotate-180 text-yellow-300' : 'text-white'
                                            }`}
                                    />
                                </button>

                                {/* Smooth effects*/}
                                <div
                                    className={`grid transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                                        }`}
                                >
                                    <div className="overflow-hidden text-white/80 text-sm leading-relaxed">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
