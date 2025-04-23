export function formatCurrency(value?: number | string): string {
  const number = typeof value === "string" ? parseFloat(value.replace(",", ".")) : value;

  if (typeof number !== "number" || isNaN(number)) return "R$ 0,00";

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function parseCurrency(value: string): number {
  if (!value) return 0;

  const cleaned = value
    .replace(/[^\d,-]/g, "") // remove tudo que não é número, vírgula ou hífen
    .replace(/\./g, "") // remove separadores de milhar
    .replace(",", "."); // converte vírgula para ponto decimal

  return parseFloat(cleaned) || 0;
}
