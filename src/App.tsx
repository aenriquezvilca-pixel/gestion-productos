import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { Info, Layers, Package, Wallet } from "lucide-react"
import { ProductArt } from "@/components/ProductArt"
import { ProductForm } from "@/components/ProductForm"
import { ProductTable } from "@/components/ProductTable"
import { ProductToolbar } from "@/components/ProductToolbar"
import { Card, CardContent } from "@/components/ui/card"
import { formatoSoles } from "@/lib/visual"
import type { Orden, Producto, Vista } from "@/types"

// Datos simulados en memoria (se pierden al recargar la página)
const PRODUCTOS_INICIALES: Producto[] = [
  { codigo: 1, descripcion: "Coca Cola 500ml", precio: 2.5, categoria: "Bebidas" },
  { codigo: 2, descripcion: "Fanta 500ml", precio: 2.3, categoria: "Bebidas" },
  { codigo: 3, descripcion: "Papas Lays", precio: 1.8, categoria: "Snacks" },
  { codigo: 4, descripcion: "Leche Gloria 1L", precio: 4.9, categoria: "Lácteos" },
  { codigo: 5, descripcion: "Detergente Ariel", precio: 12.5, categoria: "Limpieza" },
]

const CATEGORIAS_HERO = ["Bebidas", "Snacks", "Lácteos", "Limpieza", "Abarrotes", "Otros"]

// Anima el número desde su valor anterior hasta el nuevo
function useContador(objetivo: number, duracion = 600) {
  const [valor, setValor] = useState(objetivo)
  const anterior = useRef(objetivo)

  useEffect(() => {
    const inicio = anterior.current
    const t0 = performance.now()
    let frame = 0
    const paso = (ahora: number) => {
      const progreso = Math.min((ahora - t0) / duracion, 1)
      setValor(inicio + (objetivo - inicio) * progreso)
      if (progreso < 1) frame = requestAnimationFrame(paso)
      else anterior.current = objetivo
    }
    frame = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(frame)
  }, [objetivo, duracion])

  return valor
}

interface StatProps {
  titulo: string
  objetivo: number
  formato: (n: number) => string
  icono: LucideIcon
  color: string
}

function TarjetaStat({ titulo, objetivo, formato, icono: Icono, color }: StatProps) {
  const valor = useContador(objetivo)
  return (
    <Card className="shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex items-center gap-4">
        <div className={`rounded-xl p-3 ${color}`}>
          <Icono className="size-6" />
        </div>
        <div>
          <p className="text-sm text-slate-500">{titulo}</p>
          <p className="text-2xl font-bold tabular-nums">{formato(valor)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function App() {
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS_INICIALES)
  const [ultimoCodigo, setUltimoCodigo] = useState<number | null>(null)
  const [busqueda, setBusqueda] = useState("")
  const [categoria, setCategoria] = useState("Todas")
  const [orden, setOrden] = useState<Orden>("codigo")
  const [vista, setVista] = useState<Vista>("tabla")

  // Contador que solo avanza: garantiza códigos únicos
  const siguienteCodigo = useRef(
    Math.max(...PRODUCTOS_INICIALES.map((p) => p.codigo)) + 1,
  )

  const registrarProducto = (datos: Omit<Producto, "codigo">) => {
    const codigo = siguienteCodigo.current++
    setProductos((actuales) => [...actuales, { codigo, ...datos }])
    setUltimoCodigo(codigo)
    // Se limpian los filtros para que el nuevo producto sea visible al instante
    setBusqueda("")
    setCategoria("Todas")
  }

  const texto = busqueda.trim().toLowerCase()
  const visibles = productos
    .filter((p) => categoria === "Todas" || p.categoria === categoria)
    .filter((p) => p.descripcion.toLowerCase().includes(texto))
    .sort((a, b) => {
      if (orden === "precio-asc") return a.precio - b.precio
      if (orden === "precio-desc") return b.precio - a.precio
      if (orden === "nombre") return a.descripcion.localeCompare(b.descripcion)
      return a.codigo - b.codigo
    })

  const promedio =
    productos.reduce((suma, p) => suma + p.precio, 0) / (productos.length || 1)
  const categorias = new Set(productos.map((p) => p.categoria)).size

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(circle,rgba(99,102,241,0.10)_1px,transparent_1px)] bg-[size:24px_24px]">
      <style>{`
        @keyframes flotar {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <header className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.22)_1.5px,transparent_1.5px)] bg-[size:26px_26px]" />
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 size-64 rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 pb-16 pt-10">
          <div className="max-w-xl animate-in fade-in slide-in-from-left-4 duration-700">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
              Vitrina
            </p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight">Gestión de productos</h1>
            <p className="mt-3 text-indigo-100">
              Consulta el catálogo, busca por nombre y registra nuevos productos en segundos.
            </p>
            <p className="mt-4 flex items-start gap-2 rounded-lg bg-white/10 p-3 text-sm text-indigo-50 backdrop-blur">
              <Info className="mt-0.5 size-4 shrink-0" />
              Prototipo con datos simulados: los cambios son temporales y se pierden al
              recargar la página.
            </p>
          </div>

          <div className="hidden grid-cols-3 gap-3 md:grid" aria-hidden="true">
            {CATEGORIAS_HERO.map((cat, i) => (
              <div
                key={cat}
                className="flex size-24 items-center justify-center rounded-2xl bg-white/20 p-2 shadow-xl ring-1 ring-white/40 backdrop-blur"
                style={{
                  animation: `flotar 4s ease-in-out ${i * 0.4}s infinite`,
                  marginTop: i % 3 === 1 ? "1.5rem" : undefined,
                }}
              >
                <ProductArt categoria={cat} className="size-full drop-shadow-md" />
              </div>
            ))}
          </div>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full text-slate-50"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0 48V24c240 32 480 32 720 8s480-24 720-8v24H0Z"
          />
        </svg>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 pb-10">
        <div className="-mt-6 grid gap-4 sm:grid-cols-3">
          <TarjetaStat
            titulo="Total de productos"
            objetivo={productos.length}
            formato={(n) => String(Math.round(n))}
            icono={Package}
            color="bg-indigo-100 text-indigo-600"
          />
          <TarjetaStat
            titulo="Precio promedio"
            objetivo={promedio}
            formato={formatoSoles}
            icono={Wallet}
            color="bg-emerald-100 text-emerald-600"
          />
          <TarjetaStat
            titulo="Categorías"
            objetivo={categorias}
            formato={(n) => String(Math.round(n))}
            icono={Layers}
            color="bg-amber-100 text-amber-600"
          />
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-3">
          <section className="lg:col-span-1">
            <ProductForm onRegistrar={registrarProducto} />
          </section>
          <section className="space-y-4 lg:col-span-2">
            <ProductToolbar
              busqueda={busqueda}
              onBusqueda={setBusqueda}
              categoria={categoria}
              onCategoria={setCategoria}
              orden={orden}
              onOrden={setOrden}
              vista={vista}
              onVista={setVista}
            />
            <ProductTable
              productos={visibles}
              total={productos.length}
              ultimoCodigo={ultimoCodigo}
              vista={vista}
            />
          </section>
        </div>
      </main>
    </div>
  )
}
