import { estiloDe } from "@/lib/visual"

interface Props {
  categoria: string
  className?: string
}

// Ilustración vectorial del producto según su categoría
export function ProductArt({ categoria, className }: Props) {
  const { principal: c1, oscuro: c2 } = estiloDe(categoria)
  const sombra = <ellipse cx="50" cy="94" rx="24" ry="4" fill="#000" opacity="0.18" />

  switch (categoria) {
    case "Bebidas": // botella
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          {sombra}
          <rect x="42" y="5" width="16" height="10" rx="2" fill={c2} />
          <path
            d="M44 15h12v12c0 5 10 9 10 20v37a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V47c0-11 10-15 10-20Z"
            fill={c1}
          />
          <rect x="34" y="52" width="32" height="22" fill="#fff" opacity="0.92" />
          <circle cx="50" cy="63" r="6" fill={c2} />
          <path
            d="M40 36c-3 6-4 14-4 26"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.45"
            fill="none"
          />
        </svg>
      )
    case "Snacks": // bolsa de snacks
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          {sombra}
          <path d="M26 14h48l-4 74H30Z" fill={c1} />
          <rect x="24" y="8" width="52" height="9" rx="2" fill={c2} />
          <rect x="28" y="84" width="44" height="7" rx="2" fill={c2} />
          <ellipse cx="50" cy="50" rx="18" ry="15" fill="#fff" opacity="0.94" />
          <circle cx="50" cy="50" r="8" fill={c2} />
          <path
            d="M33 22l-2 54"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      )
    case "Lácteos": // caja de leche
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          {sombra}
          <polygon points="28,30 50,10 72,30" fill={c2} />
          <rect x="28" y="30" width="44" height="60" fill={c1} />
          <rect x="60" y="30" width="12" height="60" fill={c2} opacity="0.25" />
          <rect x="33" y="46" width="34" height="28" rx="3" fill="#fff" opacity="0.94" />
          <path
            d="M50 50c-5 7-7 9-7 12a7 7 0 0 0 14 0c0-3-2-5-7-12Z"
            fill={c1}
          />
        </svg>
      )
    case "Limpieza": // botella con atomizador
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          {sombra}
          <rect x="30" y="44" width="40" height="46" rx="9" fill={c1} />
          <rect x="42" y="34" width="16" height="12" fill={c2} />
          <rect x="38" y="22" width="28" height="12" rx="3" fill={c2} />
          <rect x="66" y="25" width="10" height="6" rx="2" fill={c2} />
          <rect x="35" y="56" width="30" height="22" rx="3" fill="#fff" opacity="0.94" />
          <circle cx="45" cy="67" r="4" fill={c1} />
          <circle cx="56" cy="64" r="3" fill={c1} opacity="0.7" />
          <circle cx="57" cy="72" r="2" fill={c1} opacity="0.5" />
        </svg>
      )
    case "Abarrotes": // bolsa de compras
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          {sombra}
          <path
            d="M38 38V28a12 12 0 0 1 24 0v10"
            stroke={c2}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="22" y="36" width="56" height="54" rx="5" fill={c1} />
          <rect x="22" y="36" width="56" height="10" rx="3" fill={c2} opacity="0.35" />
          <circle cx="50" cy="66" r="14" fill="#fff" opacity="0.94" />
          <path
            d="M43 66l5 5 9-10"
            stroke={c2}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      )
    default: // caja genérica
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          {sombra}
          <rect x="26" y="36" width="48" height="52" fill={c1} />
          <rect x="22" y="26" width="56" height="12" rx="2" fill={c2} />
          <rect x="46" y="26" width="8" height="62" fill="#fff" opacity="0.6" />
        </svg>
      )
  }
}
