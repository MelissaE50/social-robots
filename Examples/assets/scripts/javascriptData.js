const HUB_DATA = {
  lastUpdatedISO: new Date().toISOString(),

  deliverables: [
  "A clear, plain-language explanation of the ethical challenges social robots raise in dementia palliative care.",
  "Evidence-based findings on consent, emotional influence, privacy, and cybersecurity risks.",
  "A practical “risk snapshot” highlighting the most important areas facilities must manage.",
  "Concrete safeguards and policy controls for responsible, patient-centered deployment.",
  "An implementation playbook showing how to apply these safeguards in real care settings."
],


  definitions: [
    "Assent/Dissent: nonverbal or behavioral willingness/refusal that still matters ethically.",
    "Dynamic consent: consent revisited over time as features and patient capacity change.",
    "Privacy-by-design: minimizing data and risk as a default, not as an add-on.",
    "Inference: when systems deduce sensitive traits (mood/cognition) from behavior data."
  ],

  coreClaim:
    "Therapeutic social robots can reduce loneliness and support routines in dementia palliative care, but they also introduce risks tied to vulnerability: consent is often fragile, emotional influence can become manipulative, and continuous data collection expands privacy and cybersecurity exposure. Safe deployment requires consent safeguards, privacy-by-design defaults, and auditable security controls.",

  topRecommendations: [
    "Use proxy consent plus ongoing checks—and treat patient dissent as a stop signal.",
    "Minimize data by default: avoid always-on recording and limit retention.",
    "Require security basics: strong authentication, patching, network segmentation, and logging.",
    "Control vendor access and cloud dependencies through contracts and monitoring."
  ],

  researchQuestion:
    "How can healthcare facilities deploy social robots in dementia palliative care in ways that preserve dignity, autonomy, and privacy while maintaining robust cybersecurity safeguards across the robotic data lifecycle?",

  scope: [
    "Focus: therapeutic/companion robots used with dementia patients in palliative care settings.",
    "Includes both on-device and cloud-enabled robots (vendor platforms matter).",
    "Ethical lens: dignity, autonomy, consent validity, deception, and relational vulnerability.",
    "Security/privacy lens: endpoints + sensors + data lifecycle + vendor/supply chain risk.",
    "Not a clinical efficacy trial; this site synthesizes literature and proposes safeguards."
  ],

  // Public-facing findings: each includes meaning/implication
  findings: [
    {
      category: "Ethics",
      title: "Dementia vulnerability changes what “ethical design” means",
      claim:
        "Because dementia impacts autonomy and understanding, ethical deployment requires stronger safeguards than typical consumer AI products.",
      meaning:
        "Facilities should treat robots as care-influencing systems with dignity and vulnerability constraints—not as novelty tech.",
      tags: ["dignity", "vulnerability", "care ethics"]
    },
    {
      category: "Consent",
      title: "One-time consent is not enough for adaptive social robots",
      claim:
        "Robots that learn preferences and store “memories” change over time, so consent must be revisited and scoped by feature.",
      meaning:
        "Use tiered permissions (memory, biometrics, cloud sharing) and periodic re-authorization. Combine proxy consent with assent/dissent monitoring.",
      tags: ["dynamic consent", "tiered consent", "assent/dissent"]
    },
    {
      category: "Emotional Influence",
      title: "Emotional bonding can blur persuasion and manipulation",
      claim:
        "Robots designed to build trust and attachment can create undue influence, especially in cognitively impaired patients.",
      meaning:
        "Facilities should restrict deception-like design, document intended emotional techniques, and monitor for dependency or distress.",
      tags: ["deception", "manipulation", "relational ethics"]
    },
    {
      category: "Privacy",
      title: "Privacy harms can happen without a breach",
      claim:
        "Behavioral and emotional data can enable sensitive inference (mood, cognition, routines), even if nobody “steals” the data.",
      meaning:
        "Limit what is collected and inferred, set retention limits, and avoid secondary uses (training/marketing) without explicit permission.",
      tags: ["inference", "retention", "purpose limitation"]
    },
    {
      category: "Security",
      title: "Robots expand the attack surface as sensor-rich endpoints",
      claim:
        "Microphones/cameras + connectivity + cloud platforms make robots attractive targets and hard to secure if governance is weak.",
      meaning:
        "Require baseline controls: hardening, strong authentication, segmentation, patch SLAs, and centralized audit logs.",
      tags: ["authentication", "patching", "segmentation", "audit logs"]
    },
    {
      category: "Governance",
      title: "Legal compliance is necessary—but not sufficient",
      claim:
        "HIPAA/GDPR-style compliance alone may not address dignity, manipulation, and relational vulnerability.",
      meaning:
        "Policies must explicitly cover assent/dissent, transparency to families, least-intrusive operation, and vendor accountability.",
      tags: ["HIPAA", "GDPR", "policy"]
    }
  ],

  // Simple risk snapshot (what you called “risk matrix” but friendly)
  risks: [
    { title: "Always-on sensors & over-collection", severity: "High", note: "Continuous monitoring can become normalized surveillance; minimize by default." },
    { title: "Cloud dependency & vendor access", severity: "High", note: "Offsite processing expands exposure; require strict access controls and audit rights." },
    { title: "Weak authentication / insecure defaults", severity: "Medium", note: "Robots are endpoints; enforce strong auth, least privilege, and hardening." },
    { title: "Emotional influence & deception-like interactions", severity: "High", note: "Design can shape patient behavior; monitor distress/dependency and restrict deceptive framing." }
  ],

  // Safeguards: concrete, public-readable, still rigorous
  safeguards: [
    {
      title: "Consent Safeguards",
      items: [
        "Tiered permissions: separate approvals for memory storage, biometrics, cloud sharing, and research use.",
        "Dynamic review: re-authorize after feature changes or on a scheduled cadence.",
        "Assent/dissent policy: repeated distress or refusal triggers pause + clinical review.",
        "Transparency: clear explanations to families/caregivers about what the robot does and stores."
      ],
      tags: ["consent", "assent/dissent", "transparency"]
    },
    {
      title: "Privacy-by-Design Defaults",
      items: [
        "Minimize collection: disable always-on recording; collect only what supports care goals.",
        "Retention limits: avoid indefinite conversation logs; set auto-delete policies.",
        "Purpose limitation: prohibit secondary use (marketing/training) without explicit permission.",
        "Access control: limit who can view sensitive interaction logs and why."
      ],
      tags: ["minimization", "retention", "purpose limitation"]
    },
    {
      title: "Security Requirements",
      items: [
        "Strong authentication: unique accounts; no shared admin credentials.",
        "Network segmentation: separate robot network from general facility devices.",
        "Patch management: signed updates and vendor SLAs for critical fixes.",
        "Audit logging: access, configuration changes, and vendor sessions logged and reviewed."
      ],
      tags: ["authentication", "segmentation", "patching", "audit logs"]
    },
    {
      title: "Vendor & Contract Controls",
      items: [
        "Audit rights: facility can assess security posture and data practices.",
        "Breach notification timelines and clear incident-response responsibilities.",
        "Limit vendor access: least privilege, approvals, monitored sessions.",
        "Exit plan: data export + deletion verification if vendor changes or service ends."
      ],
      tags: ["supply chain", "contracts", "accountability"]
    }
  ],

  playbook: [
    "Procurement: define care goals, require consent/privacy/security safeguards, demand data-flow documentation and patch SLAs.",
    "Configuration: disable unnecessary sensors/features, set retention limits, configure access controls before go-live.",
    "Deployment: segment network, verify encryption and logging, train staff on assent/dissent escalation.",
    "Operations: review logs, monitor vendor access, reassess consent and patient responses, periodically re-evaluate features.",
    "Incident response: isolate device, preserve logs, notify per policy, assess patient impact and remediate.",
    "Retirement: revoke access, securely wipe/decommission, verify deletion, document lessons learned."
  ],

  limitations: [
    "This site synthesizes literature and policy frameworks rather than reporting new clinical trial data.",
    "Robot vendor implementations vary; some claims depend on what vendors disclose or allow auditors to verify.",
    "“Emotional influence” can be hard to measure consistently and requires careful definitions."
  ],

  futureWork: [
    "Better empirical measures of assent/dissent over long-term robot use in dementia care.",
    "Standardized baseline certification for robot logging, patching, and privacy controls in care settings.",
    "Techniques to limit sensitive inference while preserving therapeutic personalization."
  ],

  coreSources: [
    {
      title: "Social Robots for People with Dementia: A Literature Review on Deception from Design to Perception",
      href: "https://www.researchgate.net/publication/393261676_Social_Robots_for_People_with_Dementia_A_Literature_Review_on_Deception_from_Design_to_Perception",
      note: "Useful for deception, perception, and ethical tensions."
    },
    {
      title: "Does Humanness Matter? An Ethical Evaluation of Sharing Care Work with Social Robots",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12304055/",
      note: "Good for care ethics, dignity, and role-sharing arguments."
    },
    {
      title: "Socially Assistive Robots for patients with Alzheimer's Disease: A scoping review",
      href: "https://www.sciencedirect.com/science/article/pii/S0167494324000852",
      note: "Good for scope, outcomes, and gaps."
    },
    {
      title: "The Alignment Problem (Brian Christian)",
      href: "#",
      note: "Conceptual framing for alignment and incentives."
    }
  ],

  bibliography: [
    // Add APA-style entries as you go:
    // { cite: "Author, A. A. (Year). Title. Journal, volume(issue), pages. https://doi.org/...", href: "https://..." }
  ]
};
