import "./style.css";
import viteLogo from "/vite.svg";
import "../packages/raw/dialog/index";
import { dialogExample } from "../packages/raw/dialog/example";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="max-w-4xl mx-auto flex flex-col bg-gray-100 rounded-xl mt-8 gap-4 p-8">
    <img src="${viteLogo}" class="h-24 p-6" alt="Vite logo" />
    <h1 class="text-3xl font-bold text-center">Vite + TypeScript + Web Components</h1>
    ${dialogExample}
  </div>
`;
