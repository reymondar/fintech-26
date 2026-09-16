import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import ts from 'typescript'
const dir = mkdtempSync(join(tmpdir(),'sh-audit-test-'))
for(const name of ['audit','audit-emails','audit-handler']) {
 const source=readFileSync(new URL(`../lib/${name}.ts`,import.meta.url),'utf8')
 writeFileSync(join(dir,`${name}.js`),ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)
}
const require=createRequire(import.meta.url)
const { normalizeStoreUrl,parseAudit }=require(join(dir,'audit.js'))
const { buildConfirmationEmail,buildTeamEmail }=require(join(dir,'audit-emails.js'))
const { handleAudit }=require(join(dir,'audit-handler.js'))
process.on('exit',()=>rmSync(dir,{recursive:true,force:true}))
const valid={url:'shop.com',name:'Alex',email:'alex@example.com',category:'Hogar y mobiliario',categoryOther:'',regions:['España'],locale:'es',requestId:'00000000-0000-4000-8000-000000000001'}
const request=(data=valid)=>new Request('http://localhost/api/audit',{method:'POST',body:JSON.stringify(data)})
const accepted=()=>Response.json({id:'email-test'})
test('simple .com check accepts bare domains and paths without visiting the store',()=>{
 assert.equal(normalizeStoreUrl('shop.com'),'https://shop.com/')
 assert.equal(normalizeStoreUrl('https://www.shop.com/products'),'https://www.shop.com/products')
 for(const url of ['bad','shop.io','https://evil.org/?shop.com','javascript:shop.com','https://user@shop.com','shop.com.evil.org']) assert.equal(normalizeStoreUrl(url),null,url)
})
test('validates field types and required store context',()=>{
 assert.ok(parseAudit(valid));assert.equal(parseAudit({...valid,regions:'España'}),null);assert.equal(parseAudit({...valid,name:12}),null)
 assert.equal(parseAudit({...valid,category:'Otra'}),null);assert.equal(parseAudit({...valid,regions:[]}),null)
})
test('malformed JSON returns 400 rather than throwing',async()=>{
 const res=await handleAudit(new Request('http://localhost/api/audit',{method:'POST',body:'{' }),{})
 assert.equal(res.status,400)
})
test('missing email configuration does not claim success or send anything',async()=>{
 let called=false;const res=await handleAudit(request(),{fetcher:async()=>{called=true;return accepted()}})
 assert.equal(res.status,503);assert.equal(called,false);assert.notEqual((await res.json()).ok,true)
})
test('team notification failure blocks success and the customer email',async()=>{
 let calls=0;const res=await handleAudit(request(),{apiKey:'test',fetcher:async()=>{calls++;return new Response(null,{status:503})}})
 assert.equal(res.status,503);assert.equal(calls,1)
})
test('receipt failure preserves accepted request and reports the failure',async()=>{
 let calls=0;const res=await handleAudit(request(),{apiKey:'test',fetcher:async()=>++calls===1?accepted():new Response(null,{status:500})})
 const data=await res.json();assert.equal(res.status,200);assert.equal(data.ok,true);assert.equal(data.confirmation,false);assert.equal(data.bookingStatus,'pending')
})
test('success sends two messages with stable separate idempotency keys on retry',async()=>{
 const attempts=[];const fetcher=async(url,options)=>{attempts.push(options);return accepted()}
 for(let i=0;i<2;i++)assert.equal((await handleAudit(request(),{apiKey:'test',fetcher})).status,200)
 assert.equal(attempts[0].headers['Idempotency-Key'],attempts[2].headers['Idempotency-Key'])
 assert.notEqual(attempts[0].headers['Idempotency-Key'],attempts[1].headers['Idempotency-Key'])
 const team=JSON.parse(attempts[0].body);assert.equal(team.reply_to,valid.email);assert.match(team.html,/RESERVA PENDIENTE/)
})
test('receipts have booking links, no premature confirmation, and escape names once',()=>{
 for(const locale of ['es','en']){
 const message=buildConfirmationEmail('A&B <img>',locale)
 assert.match(message.html,/A&amp;B/);assert.doesNotMatch(message.html,/amp;amp/);assert.match(message.text,/A&B/)
 assert.match(message.html,/https:\/\/calendar.app.google\//)
 assert.doesNotMatch(message.subject,/confirmed|confirmada/i)
 }
 const team=buildTeamEmail({...valid,url:'https://shop.com/',name:'<script>'})
 assert.doesNotMatch(team.html,/<script>/)
})
