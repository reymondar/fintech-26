export function LoginBrand() {
  return <header className="cms-login-heading"><h1>Iniciar sesión</h1></header>
}
// Payload's supported graphic slot keeps its native login and password recovery flow.
export function LoginLogo() {
  return <a className="cms-login-logo" href="/es" aria-label="Ir a The Stack House"><svg width="32" height="34" viewBox="0 0 29 30" fill="none" aria-hidden="true"><path d="m14.5 2 13 7-13 7-13-7 13-7Z" stroke="currentColor" strokeWidth="1.7"/><path d="m1.5 15 13 7 13-7M1.5 21l13 7 13-7" stroke="currentColor" strokeWidth="1.7"/></svg><span>THE STACK HOUSE</span></a>
}
