'use client'
import { useState } from 'react'
export function MailingLogin(){
 const [email,setEmail]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState('')
 return <form onSubmit={async e=>{e.preventDefault();if(busy)return;setBusy(true);try{const res=await fetch('/api/mailing/access',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});const data=await res.json();setMessage(res.ok?'Revisa tu correo y abre el enlace de acceso.':data.error)}catch{setMessage('No se pudo enviar el enlace.')}finally{setBusy(false)}}}><label className="block text-sm">Tu email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="my-3 block w-full rounded-xl border border-zinc-200 px-4 py-3"/></label><button disabled={busy} className="rounded-full bg-zinc-900 px-6 py-3 text-white disabled:opacity-50">{busy?'Enviando…':'Recibir enlace de acceso'}</button>{message&&<p role="status" className="mt-4 text-sm">{message}</p>}</form>
}
