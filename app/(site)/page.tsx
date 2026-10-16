import { LandingPage } from "@/components/landing-page"

// Middleware selects a language on entry; this fallback keeps the root renderable.
export default function Home() { return <LandingPage locale="es" /> }
