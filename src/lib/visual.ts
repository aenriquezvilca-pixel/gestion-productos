export const CATEGORIAS = ["Bebidas", "Snacks", "Lácteos", "Limpieza", "Abarrotes"]

// Cambia a true si colocas fotos reales en public/productos/<nombre>.jpg
// (ej. public/productos/coca-cola-500ml.jpg). Si una foto no existe, se usa la ilustración.
export const USAR_FOTOS = false

interface Estilo {
  gradiente: string
  badge: string
  principal: string
  oscuro: string
}

const ESTILOS: Record<string, Estilo> = {
  Bebidas: {
    gradiente: "from-sky-300 to-cyan-500",
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    principal: "#0ea5e9",
    oscuro: "#0369a1",
  },
  Snacks: {
    gradiente: "from-amber-300 to-orange-500",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    principal: "#f59e0b",
    oscuro: "#b45309",
  },
  Lácteos: {
    gradiente: "from-indigo-300 to-violet-500",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    principal: "#8b5cf6",
    oscuro: "#5b21b6",
  },
  Limpieza: {
    gradiente: "from-emerald-300 to-teal-500",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    principal: "#10b981",
    oscuro: "#047857",
  },
  Abarrotes: {
    gradiente: "from-rose-300 to-pink-500",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    principal: "#f43f5e",
    oscuro: "#be123c",
  },
}

const ESTILO_POR_DEFECTO: Estilo = {
  gradiente: "from-slate-300 to-slate-500",
  badge: "bg-slate-100 text-slate-700 border-slate-200",
  principal: "#64748b",
  oscuro: "#334155",
}

export function estiloDe(categoria: string): Estilo {
  return ESTILOS[categoria] ?? ESTILO_POR_DEFECTO
}

export function formatoSoles(valor: number): string {
  return `S/ ${valor.toFixed(2)}`
}

// "Coca Cola 500ml" -> "/productos/coca-cola-500ml.jpg"
export function urlFoto(descripcion: string): string {
  const slug = descripcion
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  return `/productos/${slug}.jpg`
}
