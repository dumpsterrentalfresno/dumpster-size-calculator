// Dumpster Size Calculator — all logic runs locally. No network, no storage.
// Sizes, dimensions and pickup-load figures match the site's own size guide:
// dumpsterrentalsfresno.com/dumpster-sizes-fresno/ (checked 2026-10-14).
// No prices anywhere in the extension (site pricing rule: ranges only, never exact).

const SIZES = [
  { yards: 10, dims: "12′ L × 8′ W × 3.5′ H", loads: 3,  bestFor: "Small cleanouts, single-room remodels, tight-access driveways." },
  { yards: 12, dims: "14′ L × 7.5′ W × 3.5′ H", loads: 4,  bestFor: "Mid-size cleanouts, moving jobs bigger than one room." },
  { yards: 15, dims: "16′ L × 7.5′ W × 4′ H", loads: 5,  bestFor: "Kitchen / bath remodels, multi-room renovations." },
  { yards: 20, dims: "22′ L × 8′ W × 4.5′ H", loads: 6,  bestFor: "Garage cleanouts, kitchen / bath remodels, moving, roofing." },
  { yards: 30, dims: "22′ L × 8′ W × 6′ H", loads: 9,  bestFor: "Whole-house cleanouts, large renovations, active construction." },
  { yards: 40, dims: "22′ L × 8′ W × 8′ H", loads: 12, bestFor: "Major construction, commercial demolition." }
];

// Base size index per project type (index into SIZES above).
const BASE_BY_PROJECT = {
  "small-cleanout": 0,   // 10-yard
  "single-room": 0,      // 10-yard
  "moving": 1,           // 12-yard
  "kitchen-bath": 2,     // 15-yard
  "multi-room": 3,       // 20-yard
  "garage-cleanout": 3,  // 20-yard — most-rented size, fits a standard driveway
  "roofing": 3,          // 20-yard
  "yard": 3,             // 20-yard
  "whole-house": 4,      // 30-yard
  "construction": 4,     // 30-yard
  "demolition": 5        // 40-yard
};

const form = document.getElementById("calc");
const resultEl = document.getElementById("result");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = document.getElementById("project").value;
  const loads = Number(document.getElementById("loads").value);
  const material = document.getElementById("material").value;
  const access = document.getElementById("access").value;

  // Start from the project-type base size, then size up until the
  // container's pickup-load capacity covers the estimated debris.
  let idx = BASE_BY_PROJECT[project] ?? 3;
  while (idx < SIZES.length - 1 && SIZES[idx].loads < loads) idx += 1;

  const size = SIZES[idx];
  const notes = [];

  if (material === "heavy") {
    notes.push("Heavy material (concrete, dirt, brick, shingles) fills weight limits fast — keep the load level, never overfill, and confirm weight guidance on your booking call.");
  }
  if (access === "tight" && size.yards > 10) {
    notes.push("Tight / gated access: ask about the 10-yard container with compact delivery for tight driveways, or confirm access on your booking call before choosing this size.");
  } else if (access === "tight") {
    notes.push("Good news: the 10-yard fits tight driveways and gated communities.");
  }

  document.getElementById("result-size").textContent = size.yards + "-yard dumpster";
  document.getElementById("result-dims").textContent =
    size.dims + " · about " + size.loads + " pickup-truck loads";
  document.getElementById("result-bestfor").textContent = "Best for: " + size.bestFor;
  document.getElementById("result-why").textContent =
    "Why: your project + about " + loads + " pickup loads of debris point to this size.";
  document.getElementById("result-notes").innerHTML =
    notes.map((n) => "<p>⚠ " + n + "</p>").join("");
  document.getElementById("result-runnerup").textContent =
    idx < SIZES.length - 1
      ? "Between sizes? The " + SIZES[idx + 1].yards + "-yard is the safe step up — a second rental costs more than unused space."
      : "This is the largest standard size. For anything bigger, call to plan staged swaps.";

  resultEl.hidden = false;
});
