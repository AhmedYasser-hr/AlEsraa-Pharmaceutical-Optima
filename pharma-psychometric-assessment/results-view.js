// ============================================================
// renderResults(resultData, opts) -> DOM node
// Shared by app.js (candidate, right after submitting) and
// results.html (recruiter, opened from the notification email).
// opts.audience: "candidate" | "recruiter"
// opts.note: optional string shown in a banner above everything
//            (e.g. "Previously recorded result" / "Admin view")
// ============================================================
function renderResults(resultData, opts = {}) {
  const r = resultData;
  const audience = opts.audience || "candidate";
  const wrap = el("div", { class: "wrap" });

  wrap.appendChild(brandMasthead((r.departmentId || "").toUpperCase() + "-RESULTS"));

  if (opts.note) {
    wrap.appendChild(el("div", { class: "warn-banner" }, opts.note));
  }

  const card = el("div", { class: "card" });

  card.appendChild(el("p", { class: "eyebrow" }, r.department));
  card.appendChild(el("h1", { class: "title" }, "Assessment Results"));
  if (audience === "recruiter") {
    card.appendChild(el("p", { class: "lede" },
      `${r.candidate.name} · ${r.candidate.email}${r.candidate.phone ? " · " + r.candidate.phone : ""} · submitted ${formatDate(r.timestamp)}`));
  }

  // ---- Overall match header ----
  const matchHead = el("div", { class: `match-head match-${r.verdictLevel}` }, [
    el("div", {}, [
      el("div", { class: `match-badge match-${r.verdictLevel}` }, verdictIcon(r.verdictLevel) + " " + r.verdictLabel),
      el("div", { class: "match-sub" }, `${r.overallPercent}% of required traits at target level`)
    ]),
    el("div", { class: "match-pct" }, r.overallPercent + "%")
  ]);
  card.appendChild(matchHead);

  const matchBar = el("div", { class: "match-bar" }, [
    el("div", { class: `match-bar-fill match-${r.verdictLevel}`, style: `width:${r.overallPercent}%` })
  ]);
  card.appendChild(matchBar);

  // ---- Recommendation ----
  card.appendChild(el("div", { class: `callout callout-${r.verdictLevel}` }, [
    el("div", { class: "callout-title" }, "Recommendation"),
    el("p", { class: "callout-text" }, r.recommendation)
  ]));

  wrap.appendChild(card);

  // ---- Trait breakdown ----
  const traitSection = el("div", { class: "card" });
  traitSection.appendChild(el("h2", { class: "subtitle" }, "Personality Trait Assessment"));
  r.traits.forEach(t => {
    traitSection.appendChild(renderTraitCard(t));
  });
  wrap.appendChild(traitSection);

  // ---- Strengths / development two-col ----
  const twoCol = el("div", { class: "two-col" }, [
    el("div", { class: "callout callout-strength" }, [
      el("div", { class: "callout-title" }, "✓ Key Strengths"),
      r.keyStrengths.length
        ? el("ul", { class: "callout-list" }, r.keyStrengths.map(s => el("li", {}, s)))
        : el("p", { class: "callout-text" }, "No traits scored in the high range. Focus on development areas.")
    ]),
    el("div", { class: "callout callout-dev" }, [
      el("div", { class: "callout-title" }, "△ Areas for Development"),
      r.developmentAreas.length
        ? el("ul", { class: "callout-list" }, r.developmentAreas.map(s => el("li", {}, s)))
        : el("p", { class: "callout-text" }, "All traits are at acceptable levels for this role.")
    ])
  ]);
  wrap.appendChild(twoCol);

  // ---- SJT note (only if not best-practice) ----
  if (!r.sjt.isBestPractice) {
    const sjtCard = el("div", { class: "callout callout-dev", style: "margin-top:20px;" }, [
      el("div", { class: "callout-title" }, "◐ Situational Judgment: Alternative Response"),
      el("p", { class: "callout-text" },
        "This candidate selected an alternative response to the situational judgment scenario. This may indicate an area to discuss further in interview.")
    ]);
    if (audience === "recruiter") {
      sjtCard.appendChild(el("p", { class: "hint", style: "margin-top:8px;" }, `Response given: "${r.sjt.chosenText}"`));
    }
    wrap.appendChild(sjtCard);
  }

  wrap.appendChild(el("div", { class: "foot" },
    audience === "candidate"
      ? "Thank you for completing this assessment. The hiring team will follow up with next steps."
      : "Confidential — for internal hiring use only."));

  return wrap;
}

function renderTraitCard(t) {
  const pct = Math.round((t.score / t.maxScore) * 100);
  return el("div", { class: "trait-card" }, [
    el("div", { class: "trait-top" }, [
      el("div", {}, [
        el("div", { class: "trait-name" }, t.name),
        el("div", { class: "trait-note" }, t.bandNote)
      ]),
      el("div", { class: `trait-badge trait-${t.band}` }, t.bandLabel)
    ]),
    el("div", { class: "trait-score-row" }, [
      el("span", { class: "hint" }, "Score"),
      el("span", { class: "trait-score-num" }, `${t.score}/${t.maxScore}`)
    ]),
    el("div", { class: "trait-bar" }, [
      el("div", { class: "trait-zones" }, [
        el("span", { class: "zone zone-low" }), el("span", { class: "zone zone-mod" }), el("span", { class: "zone zone-high" })
      ]),
      el("div", { class: "trait-marker", style: `left:${pct}%` })
    ]),
    el("div", { class: "trait-scale-labels" }, [
      el("span", {}, "Low (4–9)"), el("span", {}, "Moderate (10–15)"), el("span", {}, "High (16–20)")
    ])
  ]);
}

function verdictIcon(level) {
  return level === "strong" ? "●" : level === "moderate" ? "◐" : "○";
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch (e) {
    return iso;
  }
}
