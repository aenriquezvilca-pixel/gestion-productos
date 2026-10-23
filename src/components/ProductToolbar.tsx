import { LayoutGrid, List, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CATEGORIAS } from "@/lib/visual"
import type { Orden, Vista } from "@/types"

interface Props {
  busqueda: string
  onBusqueda: (valor: string) => void
  categoria: string
  onCategoria: (valor: string) => void
  orden: Orden
  onOrden: (valor: Orden) => void
  vista: Vista
  onVista: (valor: Vista) => void
}

export function ProductToolbar({
  busqueda,
  onBusqueda,
  categoria,
  onCategoria,
  orden,
  onOrden,
  vista,
  onVista,
}: Props) {
  return (
    <div className="space-y-3 rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={busqueda}
            onChange={(e) => onBusqueda(e.target.value)}
            placeholder="Buscar producto por nombre..."
            className="pl-9 pr-9"
            aria-label="Buscar producto"
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => onBusqueda("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              aria-label="Borrar búsqueda"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <Select value={orden} onValueChange={(v) => onOrden(v as Orden)}>
          <SelectTrigger className="w-full sm:w-52" aria-label="Ordenar productos">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="codigo">Orden de registro</SelectItem>
            <SelectItem value="precio-asc">Precio: menor a mayor</SelectItem>
            <SelectItem value="precio-desc">Precio: mayor a menor</SelectItem>
            <SelectItem value="nombre">Nombre (A-Z)</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-1">
          <Button
            type="button"
            variant={vista === "tabla" ? "default" : "outline"}
            size="icon"
            onClick={() => onVista("tabla")}
            aria-pressed={vista === "tabla"}
            aria-label="Ver como tabla"
          >
            <List />
          </Button>
          <Button
            type="button"
            variant={vista === "tarjetas" ? "default" : "outline"}
            size="icon"
            onClick={() => onVista("tarjetas")}
            aria-pressed={vista === "tarjetas"}
            aria-label="Ver como tarjetas"
          >
            <LayoutGrid />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {["Todas", ...CATEGORIAS].map((c) => {
          const activo = categoria === c
          return (
            <Button
              key={c}
              type="button"
              size="sm"
              variant={activo ? "default" : "outline"}
              onClick={() => onCategoria(c)}
              className={activo ? "bg-indigo-600 text-white hover:bg-indigo-700" : ""}
            >
              {c}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
