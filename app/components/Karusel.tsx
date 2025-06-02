import {
  FaReact,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaNodeJs,
} from "react-icons/fa";
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
    <section className="min-h-screen relative mt-[-200px] flex flex-col justify-center items-center text-white overflow-x-hidden">
      {/* Верхняя линия - бордер */}
      <div
        className="absolute top-0 mt-[300px] left-0 w-full border-t-2 border-gray-200"
        style={{ maxWidth: "100vw" }}
      ></div>

      <div className="text-center lg:mt-64 mt-20 px-4">
        <h1 className="text-white mt-4 text-4xl md:text-6xl font-extrabold uppercase tracking-wide">
          Bizning Hamkorlar
        </h1>
      </div>

      <div className="w-full py-12 bg-gradient-to-b from-[#D9D9D9] to-[#bcbcbc] mt-10 overflow-hidden">
        {/* Верхняя карусель */}
        <Marquee gradient={false} speed={80}>
          <div className="flex gap-6 px-2 md:px-6">
            {icons.map((icon, index) => (
              <div
                key={index}
                className="bg-gray-400 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-md shadow-md"
              >
                <div className="text-black text-2xl md:text-4xl">{icon}</div>
              </div>
            ))}
          </div>
        </Marquee>

        {/* Нижняя карусель — в обратную сторону */}
        <Marquee gradient={false} speed={80} direction="right">
          <div className="flex gap-6 px-2 md:px-6 mt-6">
            {icons.map((icon, index) => (
              <div
                key={index}
                className="bg-gray-400 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-md shadow-md"
              >
                <div className="text-black text-2xl md:text-4xl">{icon}</div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full hidden lg:block border-b-2 border-gray-200"
        style={{ maxWidth: "100vw" }}
      ></div>

      <div
        className="absolute bottom-0 left-0 w-full lg:hidden mb-48 border-b-2 border-gray-200"
        style={{ maxWidth: "100vw" }}
      ></div>
    </section>
  );
}
