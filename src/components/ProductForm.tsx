import { useState } from "react"
import type { FormEvent } from "react"
import { CircleCheck, Eraser, PackagePlus } from "lucide-react"
import { ProductThumb } from "@/components/ProductThumb"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CATEGORIAS, estiloDe, formatoSoles } from "@/lib/visual"
import type { Producto } from "@/types"

interface Props {
  onRegistrar: (datos: Omit<Producto, "codigo">) => void
}

interface Errores {
  descripcion?: string
  precio?: string
  categoria?: string
}

export function ProductForm({ onRegistrar }: Props) {
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState("")
  const [categoria, setCategoria] = useState("")
  const [errores, setErrores] = useState<Errores>({})
  const [mensaje, setMensaje] = useState("")

  const validar = (): Errores => {
    const e: Errores = {}
    if (descripcion.trim().length < 3)
      e.descripcion = "La descripción es obligatoria y debe tener al menos 3 caracteres."
    const num = Number(precio)
    if (precio.trim() === "" || isNaN(num) || num <= 0)
      e.precio = "El precio es obligatorio y debe ser un número mayor que cero."
    if (!categoria) e.categoria = "Debes seleccionar una categoría."
    return e
  }

  const limpiar = () => {
    setDescripcion("")
    setPrecio("")
    setCategoria("")
    setErrores({})
    setMensaje("")
  }

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validar()
    setErrores(e)
    if (Object.keys(e).length > 0) {
      setMensaje("")
      return
    }
    onRegistrar({ descripcion: descripcion.trim(), precio: Number(precio), categoria })
    limpiar()
    setMensaje("Producto registrado correctamente.")
  }

  const precioNumerico = Number(precio)
  const hayVistaPrevia = descripcion.trim() !== "" || precio !== "" || categoria !== ""

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Registrar producto</CardTitle>
        <CardDescription>Completa los datos para añadirlo al catálogo.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value)
                setMensaje("")
              }}
              placeholder="Ej. Inca Kola 500ml"
              aria-invalid={!!errores.descripcion}
            />
            {errores.descripcion && (
              <p className="text-sm text-red-600">{errores.descripcion}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="precio">Precio de venta (S/)</Label>
            <Input
              id="precio"
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => {
                setPrecio(e.target.value)
                setMensaje("")
              }}
              placeholder="0.00"
              aria-invalid={!!errores.precio}
            />
            {errores.precio && <p className="text-sm text-red-600">{errores.precio}</p>}
          </div>

          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select
              value={categoria}
              onValueChange={(v) => {
                setCategoria(v)
                setMensaje("")
              }}
            >
              <SelectTrigger className="w-full" aria-invalid={!!errores.categoria}>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIAS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errores.categoria && (
              <p className="text-sm text-red-600">{errores.categoria}</p>
            )}
          </div>

          {hayVistaPrevia && (
            <div className="animate-in fade-in rounded-xl border border-dashed bg-slate-50 p-3 duration-300">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Vista previa
              </p>
              <div className="flex items-center gap-3">
                <ProductThumb
                  descripcion={descripcion}
                  categoria={categoria}
                  className="size-14 text-3xl"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {descripcion.trim() || "Nombre del producto"}
                  </p>
                  {categoria ? (
                    <Badge variant="outline" className={estiloDe(categoria).badge}>
                      {categoria}
                    </Badge>
                  ) : (
                    <span className="text-xs text-slate-400">Sin categoría</span>
                  )}
                </div>
                <p className="font-bold tabular-nums">
                  {precioNumerico > 0 ? formatoSoles(precioNumerico) : "S/ --"}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
              <PackagePlus /> Registrar producto
            </Button>
            <Button type="button" variant="outline" onClick={limpiar}>
              <Eraser /> Limpiar
            </Button>
          </div>

          {mensaje && (
            <Alert className="animate-in fade-in slide-in-from-top-2 border-emerald-200 bg-emerald-50 text-emerald-800">
              <CircleCheck />
              <AlertDescription className="text-emerald-800">{mensaje}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
