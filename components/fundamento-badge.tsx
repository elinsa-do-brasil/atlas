import { Badge } from "@/components/ui/badge";

const FUNDAMENTO_LABELS = {
  legal: "Legal",
  regulatorio: "Regulatório",
  referencia: "Referência",
  interno: "Interno",
} as const;

type FundamentoType = keyof typeof FUNDAMENTO_LABELS;

export function FundamentoBadge({ type }: { type: FundamentoType }) {
  return <Badge variant={type}>{FUNDAMENTO_LABELS[type]}</Badge>;
}
