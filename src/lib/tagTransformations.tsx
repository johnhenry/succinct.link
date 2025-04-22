import { Code } from "lucide-react";
import { FaChrome as Chrome } from "react-icons/fa6";
import {
  SiOllama as Ollama,
  SiSurrealdb as Surreal,
  SiDeno as Deno,
} from "react-icons/si";
import { IoLogoJavascript as Javascript } from "react-icons/io5";
import { RiNextjsFill as NextJS } from "react-icons/ri";
import { FaServer } from "react-icons/fa";
import { IoSparklesOutline } from "react-icons/io5";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

const sizing = "w-4 h-4";

const tagTransformations = {
  "::javascript::": {
    icon: <Javascript className={sizing} />,
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    text: "JS",
  },
  "::chrome::": {
    icon: <Chrome className={sizing} />,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    text: "Chrome AI",
  },
  "::chrome.ai::": {
    icon: <Chrome className={sizing} />,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    text: "Chrome AI",
  },
  "::next.js::": {
    icon: <NextJS className={sizing} />,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    text: "Next.js",
  },
  "::ollama::": {
    icon: <Ollama className={sizing} />,
    color: "text-red-400",
    bg: "bg-red-400/10",
    text: "Ollama",
  },
  "::surrealdb::": {
    icon: <Surreal className={sizing} />,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    text: "SurrealDB",
  },
  "::supabase::": {
    icon: <Surreal className={sizing} />,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    text: "Supabase",
  },
  "::react::": {
    icon: <Code className={sizing} />,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    text: "React",
  },
  "::node::": {
    icon: <Code className={sizing} />,
    color: "text-green-400",
    bg: "bg-green-400/10",
    text: "Node.js",
  },
  "::postgresql::": {
    icon: <Code className={sizing} />,
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    text: "PostgreSQL",
  },
  "::deno::": {
    icon: <Deno className={sizing} />,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    text: "Deno",
  },
  "::extension::": {
    icon: <Deno className={sizing} />,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    text: "Deno",
  },
  "::mcp::": {
    icon: <FaServer className={sizing} />,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    text: "MCP",
  },
  "::ai::": {
    icon: <IoSparklesOutline className={sizing} />,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    text: "Deno",
  },
  "::extension::": {
    icon: <IoExtensionPuzzleOutline className={sizing} />,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    text: "Plugin",
  },
};
export default tagTransformations;
