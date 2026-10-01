import { permanentRedirect } from "next/navigation"

// Página de servicios consolidada en /servicios. Se conserva la ruta con un redirect permanente.
export default function ServicesRedirect() {
  permanentRedirect("/servicios")
}
