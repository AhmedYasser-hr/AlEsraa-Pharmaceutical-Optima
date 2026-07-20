// Psychometric assessment data — derived from Pharma Psychometric Test Battery
const DEPARTMENTS = [
  {
    id: "qc-ipc",
    name: "Quality Control — In-Process Control (IPC)",
    summary: "IPC analysts perform real-time checks on the production floor (weight variation, hardness, disintegration, visual defects, fill volume, etc.) while the line is running. The role demands strict, uncompromising adherence to procedure, sustained vigilance under time pressure, and the integrity to report unfavorable results even when it slows the line.",
    traits: [
      {
        name: "Conscientiousness / Attention to Detail",
        definition: "Notices small deviations from specification; is thorough rather than approximate.",
        items: [
          { text: "I double-check a measurement even when I feel confident it is correct.", reverse: false },
          { text: "I notice small deviations from specification that others might miss.", reverse: false },
          { text: "I sometimes skip a checklist step when I am fairly sure the result will be fine.", reverse: true },
          { text: "I keep my inspection records complete and legible even when the line is busy.", reverse: false }
        ]
      },
      {
        name: "Rule Adherence (Strictness)",
        definition: "Follows SOPs exactly, resists shortcuts, treats procedure as non-negotiable.",
        items: [
          { text: "I follow the written procedure exactly, even when I believe a shortcut would work just as well.", reverse: false },
          { text: "If a procedure feels outdated, I would rather use my own method than follow it.", reverse: true },
          { text: "I feel uneasy when someone asks me to skip a documented step.", reverse: false },
          { text: "Clear rules and checklists make me feel more confident in my work, not restricted.", reverse: false }
        ]
      },
      {
        name: "Integrity & Honesty",
        definition: "Reports results accurately even when inconvenient or under social pressure.",
        items: [
          { text: "I would report a failing result honestly even if it delays the production schedule.", reverse: false },
          { text: "I would consider rounding a borderline reading to avoid extra paperwork.", reverse: true },
          { text: "I tell my supervisor immediately if I realize I made a measurement error.", reverse: false },
          { text: "Accurate reporting matters more to me than keeping the line moving.", reverse: false }
        ]
      },
      {
        name: "Vigilance Under Time Pressure",
        definition: "Sustains accuracy and focus despite line speed, repetition, and noise.",
        items: [
          { text: "I stay just as careful in the last hour of a shift as in the first.", reverse: false },
          { text: "When the production line speeds up, my accuracy tends to drop.", reverse: true },
          { text: "I can maintain focused attention on repetitive checks for long stretches.", reverse: false },
          { text: "Noise and time pressure on the floor rarely cause me to miss a defect.", reverse: false }
        ]
      },
      {
        name: "Emotional Stability",
        definition: "Stays composed when a deviation is found or when challenged about a result.",
        items: [
          { text: "When I find an out-of-specification result, I stay calm and follow the deviation procedure.", reverse: false },
          { text: "Being questioned about a result I reported makes me anxious or defensive.", reverse: true },
          { text: "I handle unexpected line stoppages without becoming flustered.", reverse: false },
          { text: "I recover quickly after a stressful or high-pressure shift.", reverse: false }
        ]
      }
    ],
    sjt: {
      question: "It is 2 a.m. on a night shift. You find that a batch parameter is borderline out-of-specification. The line supervisor, worried about the schedule, asks you to record it as a 'pass' so the line does not stop. What do you do?",
      options: [
        "Record it as a pass since the supervisor asked, to avoid conflict.",
        "Record the true result, follow the deviation/escalation procedure, and notify QA regardless of the pressure.",
        "Re-test repeatedly until a passing result appears.",
        "Ignore the reading and move on to the next unit."
      ],
      bestIndex: 1
    }
  },
  {
    id: "qc-stability",
    name: "Quality Control — Stability & Methodology",
    summary: "This team runs long-term and accelerated stability studies and develops/validates analytical methods. Studies unfold over months, so the role rewards patience, meticulous documentation, and calm, systematic thinking over long time horizons rather than quick action.",
    traits: [
      {
        name: "Attention to Detail",
        definition: "Tracks subtle trends across many data points and time intervals without error.",
        items: [
          { text: "I can spot a small upward or downward trend across many data points.", reverse: false },
          { text: "I review my own calculations before submitting a report.", reverse: false },
          { text: "Minor inconsistencies between batches catch my attention right away.", reverse: false },
          { text: "I sometimes overlook small formatting or transcription errors when I'm confident about the main result.", reverse: true }
        ]
      },
      {
        name: "Patience & Long-Term Focus",
        definition: "Stays engaged and motivated on studies that take months to conclude.",
        items: [
          { text: "I stay just as motivated on month 18 of a stability study as on month one.", reverse: false },
          { text: "Long timelines without a clear result frustrate me.", reverse: true },
          { text: "I am comfortable working on tasks whose outcome will only be known much later.", reverse: false },
          { text: "I keep careful track of studies that run for a long time without losing focus.", reverse: false }
        ]
      },
      {
        name: "Emotional Stability / Calmness",
        definition: "Works steadily without being rattled by unexpected results or delays.",
        items: [
          { text: "An unexpected or out-of-trend result makes me curious rather than anxious.", reverse: false },
          { text: "Delays in a study schedule make me noticeably tense or irritable.", reverse: true },
          { text: "I stay composed when a method does not perform as expected on the first attempt.", reverse: false },
          { text: "I approach problems calmly rather than reacting emotionally.", reverse: false }
        ]
      },
      {
        name: "Systematic / Analytical Thinking",
        definition: "Designs and troubleshoots methods logically, step by step.",
        items: [
          { text: "I prefer to troubleshoot a method failure step by step rather than by trial and error.", reverse: false },
          { text: "I can design an experiment plan that isolates one variable at a time.", reverse: false },
          { text: "I sometimes jump to conclusions before checking all the data.", reverse: true },
          { text: "I enjoy work that requires structured, logical reasoning.", reverse: false }
        ]
      },
      {
        name: "Documentation Discipline",
        definition: "Maintains precise, audit-ready records and protocols.",
        items: [
          { text: "My protocols and raw data are always ready to withstand an audit.", reverse: false },
          { text: "I sometimes leave documentation for later and rely on memory in the meantime.", reverse: true },
          { text: "I make sure every deviation, however small, is written down.", reverse: false },
          { text: "I find satisfaction in keeping thorough, well-organized records.", reverse: false }
        ]
      }
    ],
    sjt: {
      question: "A stability sample at the 12-month interval shows a result trending toward the specification limit, though still within range. The study is not due for formal review for another two months. What do you do?",
      options: [
        "Wait until the scheduled review since the result is technically still in range.",
        "Flag the trend now, document it, and inform your supervisor/QA so it can be evaluated proactively.",
        "Re-test the sample repeatedly until the trend disappears.",
        "Adjust the specification limit slightly so the trend looks less concerning."
      ],
      bestIndex: 1
    }
  },
  {
    id: "qc-micro",
    name: "Quality Control — Microbiology",
    summary: "Microbiology analysts perform sterility testing, environmental monitoring, and bioburden analysis. The work requires extreme discipline around aseptic technique and cleanliness, patience during incubation periods, and constant awareness of contamination risk.",
    traits: [
      {
        name: "Attention to Detail",
        definition: "Notices subtle signs of contamination or procedural drift.",
        items: [
          { text: "I notice small changes in colony appearance that others might overlook.", reverse: false },
          { text: "I double-check incubation times and temperatures rather than assuming they are correct.", reverse: false },
          { text: "I sometimes skip a minor visual check when I'm in a hurry.", reverse: true },
          { text: "I carefully compare current results with historical trends before concluding.", reverse: false }
        ]
      },
      {
        name: "Aseptic Discipline & Orderliness",
        definition: "Maintains rigorous cleanliness and technique without exception.",
        items: [
          { text: "I follow gowning and aseptic procedures exactly, every time, without exception.", reverse: false },
          { text: "I occasionally cut a corner in technique when no one is watching.", reverse: true },
          { text: "I keep my bench and equipment meticulously organized and clean.", reverse: false },
          { text: "I feel uncomfortable if I'm not sure a surface or tool has been properly sanitized.", reverse: false }
        ]
      },
      {
        name: "Patience",
        definition: "Manages multi-day incubation and waiting periods without losing rigor.",
        items: [
          { text: "I don't mind waiting several days for incubation results before drawing conclusions.", reverse: false },
          { text: "Long waiting periods without a result make me want to rush the next step.", reverse: true },
          { text: "I stay just as careful on day five of monitoring as on day one.", reverse: false },
          { text: "I am comfortable with work that unfolds slowly rather than instantly.", reverse: false }
        ]
      },
      {
        name: "Calmness",
        definition: "Remains composed and methodical, especially when results suggest contamination.",
        items: [
          { text: "If I suspect contamination, I investigate calmly and methodically rather than panicking.", reverse: false },
          { text: "An unexpected positive result makes me anxious and quick to react.", reverse: true },
          { text: "I stay steady and focused even when the stakes of a result are high.", reverse: false },
          { text: "I handle ambiguous or borderline results without becoming stressed.", reverse: false }
        ]
      },
      {
        name: "Contamination Risk Awareness",
        definition: "Actively anticipates and prevents sources of cross-contamination.",
        items: [
          { text: "I actively think about how contamination could occur before it happens.", reverse: false },
          { text: "I sometimes assume a sample is fine without checking for cross-contamination risk.", reverse: true },
          { text: "I flag potential contamination sources even if they seem minor.", reverse: false },
          { text: "I treat every sample as if contamination risk is real, not just theoretical.", reverse: false }
        ]
      }
    ],
    sjt: {
      question: "During a routine environmental monitoring round, you notice a colleague did not fully follow the gowning procedure before entering the clean area, but no obvious problem resulted. What do you do?",
      options: [
        "Say nothing since nothing bad happened this time.",
        "Raise it with the colleague and, per protocol, report it so the deviation is documented and addressed.",
        "Mention it informally to a friend but not to the colleague or supervisor.",
        "Wait to see if it happens again before doing anything."
      ],
      bestIndex: 1
    }
  },
  {
    id: "production",
    name: "Production Department",
    summary: "Production operators and line staff run the manufacturing equipment on a daily basis. The role requires teamwork, physical and mental stamina across shifts, unwavering adherence to SOPs and safety rules, and the ability to adapt when the line encounters problems.",
    traits: [
      {
        name: "Teamwork & Cooperation",
        definition: "Works smoothly with shift colleagues and hands off information clearly.",
        items: [
          { text: "I make sure my shift handover notes are clear so the next team isn't caught off guard.", reverse: false },
          { text: "I'm willing to help a teammate finish a task even if it isn't strictly my job.", reverse: false },
          { text: "I sometimes prefer to work alone rather than coordinate with the team.", reverse: true },
          { text: "I speak up early if I see a teammate struggling, rather than letting it become a bigger problem.", reverse: false }
        ]
      },
      {
        name: "Stamina & Resilience",
        definition: "Sustains performance and mood across long or physically demanding shifts.",
        items: [
          { text: "I maintain the same energy and focus near the end of a long shift as at the start.", reverse: false },
          { text: "Physically demanding tasks wear me down faster than most people.", reverse: true },
          { text: "I recover quickly after a physically or mentally tiring day.", reverse: false },
          { text: "I can stay productive through repetitive, physically active work.", reverse: false }
        ]
      },
      {
        name: "SOP / Rule Adherence",
        definition: "Follows manufacturing and hygiene procedures consistently.",
        items: [
          { text: "I follow the standard operating procedure precisely, even under time pressure.", reverse: false },
          { text: "I sometimes adjust a procedure on my own if I think it will save time.", reverse: true },
          { text: "I feel that following documented steps protects both quality and safety.", reverse: false },
          { text: "I complete required checks and sign-offs even when supervisors are not watching.", reverse: false }
        ]
      },
      {
        name: "Safety Consciousness",
        definition: "Prioritizes safe behavior for self and colleagues, even under deadline pressure.",
        items: [
          { text: "I always wear required protective equipment, even for a 'quick' task.", reverse: false },
          { text: "I have sometimes skipped a safety step to save a few minutes.", reverse: true },
          { text: "I speak up immediately if I notice an unsafe condition on the floor.", reverse: false },
          { text: "I think about safety risks before starting an unfamiliar task.", reverse: false }
        ]
      },
      {
        name: "Adaptability Under Pressure",
        definition: "Adjusts calmly when equipment issues or schedule changes occur.",
        items: [
          { text: "When equipment breaks down mid-shift, I adjust my approach without panicking.", reverse: false },
          { text: "Sudden schedule changes throw me off more than they should.", reverse: true },
          { text: "I stay productive even when priorities shift during a shift.", reverse: false },
          { text: "I can switch between tasks smoothly when the line requires it.", reverse: false }
        ]
      }
    ],
    sjt: {
      question: "Midway through a shift, a machine starts producing units that look slightly different from the standard, but stopping the line will hurt the day's output target. What do you do?",
      options: [
        "Keep running the line since the difference looks minor and the target matters.",
        "Stop or flag the line per procedure and alert your supervisor/QC so the issue is properly assessed.",
        "Quietly separate the odd units yourself without telling anyone.",
        "Speed up the line to make up for time you expect to lose later."
      ],
      bestIndex: 1
    }
  },
  {
    id: "process-optimization",
    name: "Process Optimization",
    summary: "This role analyzes manufacturing data to identify inefficiencies and redesign processes for better yield, speed, or cost. It calls for analytical and systems thinking, genuine creativity, and the persistence to test and refine ideas that don't work the first time.",
    traits: [
      {
        name: "Analytical / Systems Thinking",
        definition: "Sees how changes in one part of a process ripple through the whole system.",
        items: [
          { text: "I naturally think about how a change in one step will affect the steps downstream.", reverse: false },
          { text: "I enjoy breaking a complex process into its component parts.", reverse: false },
          { text: "I sometimes focus on one part of a process without considering the whole system.", reverse: true },
          { text: "I can identify the root cause of a recurring problem rather than just the symptom.", reverse: false }
        ]
      },
      {
        name: "Innovation & Creativity",
        definition: "Generates genuinely new approaches rather than only incremental tweaks.",
        items: [
          { text: "I regularly propose new ways of doing things rather than sticking to 'how it's always been done.'", reverse: false },
          { text: "I enjoy experimenting with unconventional solutions to a problem.", reverse: false },
          { text: "I tend to prefer the safest, most familiar option even when a better one might exist.", reverse: true },
          { text: "Colleagues would describe me as someone who comes up with original ideas.", reverse: false }
        ]
      },
      {
        name: "Persistence in Problem-Solving",
        definition: "Keeps iterating on a problem despite early failures or dead ends.",
        items: [
          { text: "I keep testing alternatives even after my first few attempts fail.", reverse: false },
          { text: "I tend to give up on a difficult improvement project if it doesn't work quickly.", reverse: true },
          { text: "Setbacks make me more determined rather than discouraged.", reverse: false },
          { text: "I see a failed pilot test as useful information rather than a dead end.", reverse: false }
        ]
      },
      {
        name: "Data Orientation",
        definition: "Bases conclusions on data and evidence rather than intuition alone.",
        items: [
          { text: "I prefer to base a recommendation on data rather than a hunch.", reverse: false },
          { text: "I sometimes trust my gut over the numbers when they conflict.", reverse: true },
          { text: "I look for the data before forming an opinion about a process problem.", reverse: false },
          { text: "I feel uncomfortable presenting a conclusion that isn't backed by evidence.", reverse: false }
        ]
      },
      {
        name: "Initiative / Proactivity",
        definition: "Identifies opportunities for improvement without being asked.",
        items: [
          { text: "I look for opportunities to improve a process even when no one has asked me to.", reverse: false },
          { text: "I usually wait for instructions rather than raising ideas on my own.", reverse: true },
          { text: "I follow up on my suggestions until they are actually tried out.", reverse: false },
          { text: "I take the first step on a project rather than waiting for someone else to start.", reverse: false }
        ]
      }
    ],
    sjt: {
      question: "You identify a change that could improve line throughput by 8%, but it would require convincing production staff to alter a habit they are comfortable with. What do you do?",
      options: [
        "Drop the idea since getting buy-in seems like too much effort.",
        "Run a small pilot, share the data with the team, and work with them to adjust the process gradually.",
        "Implement the change without telling the production team in advance.",
        "Wait for someone senior to propose the same idea before acting."
      ],
      bestIndex: 1
    }
  },
  {
    id: "qa",
    name: "Quality Assurance",
    summary: "QA is responsible for overseeing compliance, approving or rejecting batches and documentation, and upholding quality standards even against internal pressure. This role requires uncompromising integrity, the assertiveness to say 'no,' strong attention to detail, and the diplomacy to enforce standards without alienating other departments.",
    traits: [
      {
        name: "Integrity & Ethical Judgment",
        definition: "Makes the compliant decision even when it is costly or unpopular.",
        items: [
          { text: "I would reject a batch that fails to meet requirements, even if it creates a major schedule problem.", reverse: false },
          { text: "I sometimes feel tempted to overlook a small violation to keep things moving.", reverse: true },
          { text: "I believe following the rules matters more than being popular with other departments.", reverse: false },
          { text: "I report issues honestly even when I know the answer will be unwelcome.", reverse: false }
        ]
      },
      {
        name: "Assertiveness",
        definition: "Is comfortable saying no or halting a process when standards aren't met.",
        items: [
          { text: "I am comfortable telling a senior colleague that something does not meet requirements.", reverse: false },
          { text: "I tend to avoid conflict even when I disagree with a decision.", reverse: true },
          { text: "I speak up clearly when I believe a process should be stopped.", reverse: false },
          { text: "I hold my position under pushback if I believe I am right.", reverse: false }
        ]
      },
      {
        name: "Attention to Detail",
        definition: "Reviews documentation and records thoroughly enough to catch real issues.",
        items: [
          { text: "I read documentation closely enough to catch inconsistencies others might miss.", reverse: false },
          { text: "I sometimes approve records quickly without checking every detail.", reverse: true },
          { text: "I compare data across multiple documents to make sure they are consistent.", reverse: false },
          { text: "Small formatting or data errors in a batch record catch my attention.", reverse: false }
        ]
      },
      {
        name: "Communication & Diplomacy",
        definition: "Enforces standards while keeping working relationships constructive.",
        items: [
          { text: "I can explain why something failed review in a way that doesn't feel like an attack.", reverse: false },
          { text: "I sometimes come across as harsh when I deliver critical feedback.", reverse: true },
          { text: "I try to understand the other department's perspective even while enforcing a standard.", reverse: false },
          { text: "I can disagree with someone and still maintain a good working relationship afterward.", reverse: false }
        ]
      },
      {
        name: "Objectivity / Independent Judgment",
        definition: "Evaluates evidence on its merits, resisting pressure to conform.",
        items: [
          { text: "I base my decisions on the evidence in front of me rather than on who is asking.", reverse: false },
          { text: "I sometimes let a relationship with a colleague influence my professional judgment.", reverse: true },
          { text: "I would reach the same conclusion whether the request came from a junior or a senior colleague.", reverse: false },
          { text: "I try to set aside personal opinions when evaluating compliance.", reverse: false }
        ]
      }
    ],
    sjt: {
      question: "A production manager under deadline pressure asks you to release a batch while a minor documentation discrepancy is still being resolved, promising to 'fix the paperwork later.' What do you do?",
      options: [
        "Release the batch as a favor, since the manager promised to fix it later.",
        "Hold the release until the discrepancy is properly investigated and documented, per procedure.",
        "Release it but ask a colleague to sign instead of you.",
        "Avoid the manager until the deadline passes."
      ],
      bestIndex: 1
    }
  },
  {
    id: "rnd",
    name: "Research & Development (R&D)",
    summary: "R&D scientists develop new formulations and processes. The work is exploratory by nature, so it rewards intellectual curiosity, genuine creativity, tolerance for ambiguity and repeated failed experiments, and the analytical rigor to turn ideas into validated results.",
    traits: [
      {
        name: "Intellectual Curiosity",
        definition: "Is genuinely driven to understand why something works, not just that it works.",
        items: [
          { text: "I want to understand the underlying mechanism, not just whether an experiment worked.", reverse: false },
          { text: "I regularly read up on new research relevant to my projects, beyond what's required.", reverse: false },
          { text: "Once something works, I rarely feel the need to understand why.", reverse: true },
          { text: "I enjoy asking 'what if' questions about a formulation or process.", reverse: false }
        ]
      },
      {
        name: "Creativity",
        definition: "Generates novel formulations or approaches rather than only replicating known ones.",
        items: [
          { text: "I enjoy proposing formulation approaches that haven't been tried before.", reverse: false },
          { text: "I tend to combine ideas from different fields to solve a problem.", reverse: false },
          { text: "I prefer to stick with proven approaches rather than experiment with new ones.", reverse: true },
          { text: "Colleagues would describe me as someone with original scientific ideas.", reverse: false }
        ]
      },
      {
        name: "Tolerance for Ambiguity & Failure",
        definition: "Stays motivated when experiments fail or the path forward is unclear.",
        items: [
          { text: "A failed experiment feels like useful data to me, not a personal setback.", reverse: false },
          { text: "I stay motivated even when a project's direction is unclear for weeks at a time.", reverse: false },
          { text: "Repeated failed experiments make me want to give up on a project.", reverse: true },
          { text: "I am comfortable making decisions with incomplete information.", reverse: false }
        ]
      },
      {
        name: "Analytical Rigor",
        definition: "Designs and interprets experiments with methodological care.",
        items: [
          { text: "I design experiments so that I can isolate the effect of a single variable.", reverse: false },
          { text: "I double-check my statistical or analytical methods before drawing conclusions.", reverse: false },
          { text: "I sometimes accept a promising result without fully verifying it.", reverse: true },
          { text: "I document my experimental reasoning so someone else could reproduce it.", reverse: false }
        ]
      },
      {
        name: "Persistence & Collaboration",
        definition: "Keeps working a problem over time while integrating input from others.",
        items: [
          { text: "I keep pushing on a difficult formulation problem over weeks or months.", reverse: false },
          { text: "I actively seek input from colleagues rather than working in isolation.", reverse: false },
          { text: "I tend to lose interest in a project once the initial excitement fades.", reverse: true },
          { text: "I integrate feedback from others even when it means reworking my approach.", reverse: false }
        ]
      }
    ],
    sjt: {
      question: "After several months, your lead formulation approach for a new product keeps failing a key stability test, while a promising but unconventional alternative has emerged from a side experiment. What do you do?",
      options: [
        "Keep pushing the original approach since it was the agreed plan.",
        "Present both the failure data and the promising alternative to the team, and propose a data-driven path forward.",
        "Quietly switch to the alternative without informing the team.",
        "Abandon the project rather than choose between the two paths."
      ],
      bestIndex: 1
    }
  }
];
