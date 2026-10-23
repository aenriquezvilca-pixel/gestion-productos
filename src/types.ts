export interface Producto {
  codigo: number
  descripcion: string
  precio: number
  categoria: string
}

export type Orden = "codigo" | "precio-asc" | "precio-desc" | "nombre"
export type Vista = "tabla" | "tarjetas"
