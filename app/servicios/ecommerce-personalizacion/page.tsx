import { redirect } from "next/navigation"

// Contenido antiguo retirado en la limpieza de servicios (métricas sin validar + voseo).
// Puede volver como página de detalle del servicio de personalización tras revisión.
export default function EcommercePersonalizacionRedirect() {
  redirect("/servicios")
}
