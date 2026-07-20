// ============================================================
// Scoring — turns raw answers into the result object used by
// both the candidate-facing results screen and the recruiter
// results viewer.
//
// The per-trait Low/Moderate/High bands (4–9 / 10–15 / 16–20)
// come directly from the assessment battery's scoring guide.
// The overall "match %" and fit verdict are NOT specified in
// that document (it only defines per-trait bands) — this is a
// straightforward, documented composite built on top of it:
// overall % = total points earned / total points possible
// across the role's 5 traits. Adjust OVERALL_BANDS below if
// you want different thresholds or labels.
// ============================================================

const OVERALL_BANDS = [
  { min: 75, level: "strong", label: "Strong Fit" },
  { min: 55, level: "moderate", label: "Moderate Fit" },
  { min: 0, level: "below", label: "Below Target Fit" }
];

const TRAIT_BAND_NOTES = {
  low: "Below the typical range for this role — worth probing directly in interview.",
  moderate: "Acceptable range for most roles. May need to probe specific concerns.",
  high: "Strong fit for the demands of this trait in this role."
};

function traitBand(score) {
  if (score <= 9) return { key: "low", label: "Low", note: TRAIT_BAND_NOTES.low };
  if (score <= 15) return { key: "moderate", label: "Moderate", note: TRAIT_BAND_NOTES.moderate };
  return { key: "high", label: "High", note: TRAIT_BAND_NOTES.high };
}

function overallBand(pct) {
  return OVERALL_BANDS.find(b => pct >= b.min);
}

function buildRecommendation(deptName, verdict, keyStrengths, developmentAreas, sjtOk) {
  let text;
  if (verdict.level === "strong") {
    text = `This candidate's personality profile aligns well with the demands of the ${deptName} role.` +
      (keyStrengths.length ? ` Particular strengths in ${listJoin(keyStrengths)} stand out.` : "") +
      ` Proceed with confidence to interview to validate these strengths.`;
  } else if (verdict.level === "moderate") {
    text = `This candidate shows a reasonable match for the ${deptName} role.` +
      (developmentAreas.length ? ` Consider probing ${listJoin(developmentAreas)} further in interview.` : " Consider probing specific concerns further in interview.");
  } else {
    text = `This candidate's personality profile suggests potential challenges in the ${deptName} role.` +
      ` Consider alternative positions or discuss development areas in interview.` +
      (developmentAreas.length ? ` Particular attention to ${listJoin(developmentAreas)} is recommended.` : "");
  }
  if (!sjtOk) {
    text += ` Note: situational judgment indicates a potential gap in role-specific decision-making — discuss the scenario response directly in interview.`;
  }
  return text;
}

function listJoin(arr) {
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return arr[0] + " and " + arr[1];
  return arr.slice(0, -1).join(", ") + ", and " + arr[arr.length - 1];
}

/**
 * Builds the full result object from a completed queue + answers.
 * `queue` and `answers` follow the shape produced in app.js.
 */
function buildResult(dept, candidate, answers, queue) {
  const traitSums = dept.traits.map(t => 0);
  queue.forEach(q => {
    if (q.type !== "likert") return;
    const raw = answers[q.key];
    if (raw === undefined) return;
    traitSums[q.traitIndex] += q.reverse ? (6 - raw) : raw;
  });

  const traits = dept.traits.map((trait, i) => {
    const score = traitSums[i];
    const band = traitBand(score);
    return { name: trait.name, score, maxScore: 20, band: band.key, bandLabel: band.label, bandNote: band.note };
  });

  const totalScore = traitSums.reduce((a, b) => a + b, 0);
  const maxTotal = dept.traits.length * 20;
  const overallPercent = Math.round((totalScore / maxTotal) * 100);
  const verdict = overallBand(overallPercent);

  const keyStrengths = traits.filter(t => t.band === "high").map(t => t.name);
  const developmentAreas = traits.filter(t => t.band === "low").map(t => t.name);

  const sjt = dept.sjt;
  const chosenIndex = answers["sjt"];
  const sjtResult = {
    question: sjt.question,
    chosenText: sjt.options[chosenIndex],
    isBestPractice: chosenIndex === sjt.bestIndex
  };

  const recommendation = buildRecommendation(dept.name, verdict, keyStrengths, developmentAreas, sjtResult.isBestPractice);

  const rawResponses = queue.map(q => {
    if (q.type === "likert") {
      return { trait: dept.traits[q.traitIndex].name, statement: q.text, reverseScored: q.reverse, response: answers[q.key] };
    }
    return { trait: "Situational Judgment", statement: sjt.question, response: sjt.options[answers[q.key]] };
  });

  return {
    id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2),
    timestamp: new Date().toISOString(),
    candidate,
    department: dept.name,
    departmentId: dept.id,
    overallPercent,
    verdictLevel: verdict.level,
    verdictLabel: verdict.label,
    traits,
    keyStrengths,
    developmentAreas,
    sjt: sjtResult,
    recommendation,
    rawResponses
  };
}
