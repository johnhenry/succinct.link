import { Code, Palette, PanelsTopLeft } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

const sizing = "w-6 h-6";
const typeTransformations = {
    "::design::" : <Palette className={`${sizing} text-rose-400`} />,
    "::code::" : <Github className={`${sizing} text-blue-400`} />,
    "::library::" : <Code className={`${sizing} text-blue-400`} />,
    "::website::" : <PanelsTopLeft className={`${sizing} text-blue-400`} />,
  }
export default typeTransformations;