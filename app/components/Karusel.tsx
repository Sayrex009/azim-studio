import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaJsSquare, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import Marquee from "react-fast-marquee";

export default function AboutPage() {
    const icons = [
        <SiNextdotjs key="next" />,
        <FaReact key="react" />,
        <SiTailwindcss key="tailwind" />,
        <FaHtml5 key="html" />,
        <FaCss3Alt key="css" />,
        <FaJsSquare key="js" />,
        <FaNodeJs key="node" />,
        <FaPython key="python" />,
    ];

    return (
        <section className="min-h-screen mt-[-200px] flex flex-col justify-center items-center text-white relative overflow-hidden">
            <div className="text-center lg:mt-64">
                <h1 className="text-white text-4xl md:text-6xl font-extrabold uppercase mt-12 tracking-wide">
                    Bizning Hamkorlar
                </h1>
            </div>
            <div className="w-full py-16 bg-gradient-to-b from-[#D9D9D9] to-[#bcbcbc] mt-10">
                {/* Верхняя карусель */}
                <Marquee gradient={false} speed={40}>
                    <div className="flex gap-10 px-4">
                        {icons.map((icon, index) => (
                            <div
                                key={index}
                                className="bg-gray-400 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-md shadow-md"
                            >
                                <div className="text-black text-3xl md:text-5xl">{icon}</div>
                            </div>
                        ))}
                    </div>
                </Marquee>

                {/* Нижняя карусель — в обратную сторону */}
                <Marquee gradient={false} speed={40} direction="right">
                    <div className="flex gap-10 px-4 mt-8">
                        {icons.map((icon, index) => (
                            <div
                                key={index}
                                className="bg-gray-400 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-md shadow-md"
                            >
                                <div className="text-black text-3xl md:text-5xl">{icon}</div>
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </section>
    );
}
