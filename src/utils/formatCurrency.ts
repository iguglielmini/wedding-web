export function formatCurrency(value: number | string): string {
    const number = typeof value === "string" ? Number(value) : value;
  
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(isNaN(number) ? 0 : number);
  }
  
  export function parseCurrency(value: string): number {
    if (!value) return 0;
  
    const cleaned = value
      .replace(/[^\d,-]/g, "") // remove tudo que não é número, vírgula ou hífen
      .replace(/\./g, "")       // remove separadores de milhar
      .replace(",", ".");       // converte vírgula para ponto decimal
  
    return parseFloat(cleaned) || 0;
  }
  