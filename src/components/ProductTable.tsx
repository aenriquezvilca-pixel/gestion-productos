import { PackageSearch } from "lucide-react"
import { ProductThumb } from "@/components/ProductThumb"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { estiloDe, formatoSoles } from "@/lib/visual"
import type { Producto, Vista } from "@/types"

interface Props {
  productos: Producto[]
  total: number
  ultimoCodigo: number | null
  vista: Vista
}

const ENTRADA = "animate-in fade-in slide-in-from-bottom-2 duration-500"

export function ProductTable({ productos, total, ultimoCodigo, vista }: Props) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Productos registrados</CardTitle>
        <CardDescription>
          Mostrando {productos.length} de {total}{" "}
          {total === 1 ? "producto" : "productos"} del catálogo
        </CardDescription>
      </CardHeader>
      <CardContent>
        {productos.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-slate-400">
            <PackageSearch className="size-12" />
            <p className="text-sm">No hay productos que coincidan con tu búsqueda.</p>
          </div>
        ) : vista === "tabla" ? (
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-20">Código</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productos.map((p) => {
                  const esNuevo = p.codigo === ultimoCodigo
                  return (
                    <TableRow
                      key={p.codigo}
                      className={esNuevo ? `bg-emerald-50 ${ENTRADA}` : "transition-colors hover:bg-slate-50"}
                    >
                      <TableCell className="font-mono text-slate-500">
                        #{String(p.codigo).padStart(3, "0")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ProductThumb descripcion={p.descripcion} categoria={p.categoria} />
                          <span className="font-medium">{p.descripcion}</span>
                          {esNuevo && (
                            <Badge className="bg-emerald-600 text-white">Nuevo</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={estiloDe(p.categoria).badge}>
                          {p.categoria}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold tabular-nums">
                        {formatoSoles(p.precio)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {productos.map((p) => {
              const esNuevo = p.codigo === ultimoCodigo
              return (
                <article
                  key={p.codigo}
                  className={`group overflow-hidden rounded-xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    esNuevo ? `ring-2 ring-emerald-500 ${ENTRADA}` : ""
                  }`}
                >
                  <div className="relative">
                    <ProductThumb
                      descripcion={p.descripcion}
                      categoria={p.categoria}
                      className="h-40 w-full rounded-none transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2 py-0.5 font-mono text-xs text-slate-600">
                      #{String(p.codigo).padStart(3, "0")}
                    </span>
                    {esNuevo && (
                      <Badge className="absolute right-3 top-3 bg-emerald-600 text-white">
                        Nuevo
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2 p-4">
                    <h3 className="font-semibold leading-tight">{p.descripcion}</h3>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={estiloDe(p.categoria).badge}>
                        {p.categoria}
                      </Badge>
                      <span className="text-lg font-bold tabular-nums">
                        {formatoSoles(p.precio)}
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
