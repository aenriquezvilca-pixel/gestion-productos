import { useState } from "react"
import { ProductArt } from "@/components/ProductArt"
import { cn } from "@/lib/utils"
import { USAR_FOTOS, estiloDe, urlFoto } from "@/lib/visual"

interface Props {
  descripcion: string
  categoria: string
  className?: string
}

// Imagen del producto: foto real (si está activada y existe) o ilustración sobre degradado
export function ProductThumb({ descripcion, categoria, className = "size-11" }: Props) {
  const estilo = estiloDe(categoria)
  const [fallo, setFallo] = useState(false)
  const mostrarFoto = USAR_FOTOS && !fallo && descripcion.trim() !== ""

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br shadow-inner",
        estilo.gradiente,
        className,
      )}
    >
      {mostrarFoto ? (
        <img
          src={urlFoto(descripcion)}
          alt={descripcion}
          onError={() => setFallo(true)}
          className="size-full object-cover"
        />
      ) : (
        <ProductArt categoria={categoria} className="size-4/5" />
      )}
    </div>
  )
}
