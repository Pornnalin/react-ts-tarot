const SPECIAL_CARD_NAMES: Record<
  string,
  {
    slug: string;
    displayName: string;
    meaningKey: string;
    imageNames: string[];
  }
> = {
  strength: {
    slug: "strength",
    displayName: "Strength",
    meaningKey: "strength",
    imageNames: ["Strength", "Fortitude"],
  },
  fortitude: {
    slug: "strength",
    displayName: "Strength",
    meaningKey: "strength",
    imageNames: ["Strength", "Fortitude"],
  },
  "the last judgment": {
    slug: "the-last-judgment",
    displayName: "The Last Judgment",
    meaningKey: "judgement",
    imageNames: ["The Last Judgment", "Judgment", "Judgement"],
  },
  judgment: {
    slug: "the-last-judgment",
    displayName: "The Last Judgment",
    meaningKey: "judgement",
    imageNames: ["The Last Judgment", "Judgment", "Judgement"],
  },
  judgement: {
    slug: "the-last-judgment",
    displayName: "The Last Judgment",
    meaningKey: "judgement",
    imageNames: ["The Last Judgment", "Judgment", "Judgement"],
  },
};

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function titleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function toTarotSlug(value: string): string {
  const normalized = normalizeText(value);
  const special = SPECIAL_CARD_NAMES[normalized];
  if (special) return special.slug;

  return normalized
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function slugToTarotName(slug: string): string {
  const normalized = normalizeText(slug);
  const special = SPECIAL_CARD_NAMES[normalized];
  if (special) return special.displayName;

  return titleCase(normalized);
}

export function getTarotMeaningKey(value: string): string {
  const normalized = normalizeText(value);
  const special = SPECIAL_CARD_NAMES[normalized];
  if (special) return special.meaningKey;

  return normalized;
}

export function getTarotImageCandidates(value: string): string[] {
  const normalized = normalizeText(value);
  const special = SPECIAL_CARD_NAMES[normalized];
  if (special) return special.imageNames;

  const titleCased = titleCase(normalized);
  return [titleCased, value.trim()];
}
