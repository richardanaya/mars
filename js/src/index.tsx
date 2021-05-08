import "./TextTypography";
import "./LoadingScreen";
import "./CodeCell";
import "./CpuInfo";

document.querySelector(".add-cell")?.addEventListener("click", () => {
  document
    .querySelector(".notebook")
    ?.appendChild(document.createElement("code-cell"));
});

document.querySelector("#add-cell")?.addEventListener("click", () => {
  document
    .querySelector(".notebook")
    ?.appendChild(document.createElement("code-cell"));
});

