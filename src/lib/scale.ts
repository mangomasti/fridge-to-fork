const FRACTIONS: Record<string, number> = {
  "1/8": 0.125,
  "1/4": 0.25,
  "1/3": 1 / 3,
  "1/2": 0.5,
  "2/3": 2 / 3,
  "3/4": 0.75,
};

function formatNumber(value: number): string {
  if (value >= 10) return String(Math.round(value));
  if (value >= 1) {
    const rounded = Math.round(value * 4) / 4;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/0$/, "");
  }
  // small amounts: snap to nearest quarter, then eighth
  const quarter = Math.round(value * 4) / 4;
  if (quarter >= 0.25) {
    const label = Object.entries(FRACTIONS).find(([, v]) => Math.abs(v - quarter) < 0.01);
    return label ? label[0] : quarter.toFixed(2);
  }
  const eighth = Math.round(value * 8) / 8;
  if (eighth >= 0.125) return "1/8";
  return value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

/**
 * Scale an ingredient amount string like "600g", "2 tbsp", "1/2 cup",
 * "2 cans (480g)" by a factor. Non-numeric amounts ("to taste") pass through.
 */
export function scaleAmount(amount: string, factor: number): string {
  if (!amount || factor === 1) return amount;

  const numberPattern = /(\d+\s+\d\/\d|\d+\/\d|\d+(?:\.\d+)?)/g;
  if (!numberPattern.test(amount)) return amount;
  numberPattern.lastIndex = 0;

  return amount.replace(numberPattern, (match) => {
    let value: number;
    if (match.includes("/")) {
      const parts = match.trim().split(/\s+/);
      value = parts.reduce((sum, part) => {
        if (part.includes("/")) {
          const [n, d] = part.split("/");
          return sum + Number(n) / Number(d);
        }
        return sum + Number(part);
      }, 0);
    } else {
      value = Number(match);
    }
    if (!Number.isFinite(value)) return match;
    return formatNumber(value * factor);
  });
}
