import nextEnv from '@next/env'
nextEnv.loadEnvConfig(process.cwd())
import assert from 'node:assert/strict'
import {mkdtemp,rm} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import path from 'node:path'
import {renderToStaticMarkup} from 'react-dom/server'
import {createElement} from 'react'
import {seoIssues,validateSchema,videoURL} from '../cms/seo'
import {editorialSchema} from '../cms/schema'
import {content,block,paragraph,editorialFixture} from './editorial-fixture'
const directory=await mkdtemp(path.join(tmpdir(),'stackhouse-editorial-check-'))
process.env.DATABASE_URL=`file:${directory}/test.db`
process.env.BLOB_READ_WRITE_TOKEN=''
process.env.RESEND_API_KEY=''
const {getPayload}=await import('payload')
const {default:config}=await import('../payload.config')
const payload=await getPayload({config})
try {
 const password=crypto.randomUUID()
 const user=await payload.create({collection:'users',data:{email:'editorial-test@example.com',password}})
 const base={title:'Prueba editorial',description:'Descripción de prueba',date:'2026-10-16T00:00:00Z',author:'Test',category:'GEO',content:content([paragraph('Contenido de prueba.')]) as any}
 const draft=await payload.create({collection:'posts',draft:true,data:{slug:'incomplete',_status:'draft'}})
 await assert.rejects(()=>payload.update({collection:'posts',id:draft.id,data:{_status:'published'}}),'Incomplete draft cannot publish')
 const target=await payload.create({collection:'posts',user,data:{...base,slug:'target',_status:'published'}})
 const section=await payload.create({collection:'sections',data:{title:'Información consistente',body:'Versión original.',changeNote:'Creación de prueba'}})
 const article=await payload.create({collection:'posts',user,data:{...base,slug:'editorial-test',content:editorialFixture(section.id,target.id) as any,_status:'published'}})
 const invalid=content([block('comparison',{caption:'Inválida',columns:[{label:'A'},{label:'B'}],rows:[{cells:[{value:'Solo una'}]}]})])
 assert.ok(seoIssues({...base,slug:'x',content:invalid}).some(x=>x.level==='error'))
 await assert.rejects(()=>payload.update({collection:'posts',id:article.id,data:{content:invalid as any,_status:'published'}}),'Invalid comparison must not publish')
 const duplicateH1=content([{type:'heading',tag:'h1',version:1,format:'',indent:0,direction:null,children:paragraph('Otro H1').children}])
 await assert.rejects(()=>payload.update({collection:'posts',id:article.id,data:{content:duplicateH1 as any,_status:'published'}}),'Duplicate H1 must not publish')
 assert.notEqual(validateSchema({'@type':'BlogPosting'}),true)
 assert.notEqual(validateSchema({'@type':'FAQPage',mainEntity:[]}),true)
 assert.equal(videoURL('javascript:alert(1)'),null)
 await payload.update({collection:'posts',id:target.id,data:{slug:'target-renamed',_status:'published'}})
 const populated=await payload.findByID({collection:'posts',id:article.id,depth:2,overrideAccess:false})
 const {lexicalMarkdown}=await import('../lib/posts')
 const markdown=lexicalMarkdown(populated.content)
 assert.match(markdown,/\/blog\/target-renamed/)
 assert.match(markdown,/Información consistente/)
 assert.match(markdown,/\| Criterio \| Opción A \| Opción B \|/)
 const schema=editorialSchema(populated.content,null,'https://example.com/blog/test')
 assert.ok(schema.some(x=>x['@type']==='FAQPage'&&x.mainEntity.length===2))
 assert.ok(schema.some(x=>x['@type']==='DefinedTerm'))
 assert.ok(schema.some(x=>x['@type']==='Service'))
 const {CMSRichText}=await import('../components/cms-rich-text')
 const html=renderToStaticMarkup(createElement(CMSRichText,{data:populated.content}))
 assert.match(html,/<th scope="col"/);assert.match(html,/<th scope="row"/);assert.match(html,/<dl/);assert.match(html,/youtube-nocookie/);assert.match(html,/target-renamed/)
 await payload.update({collection:'sections',id:section.id,user,data:{body:'Versión actualizada.',changeNote:'Actualización compartida de prueba'}})
 const changed=await payload.findByID({collection:'posts',id:article.id,depth:2,overrideAccess:false})
 assert.match(lexicalMarkdown(changed.content),/Versión actualizada/)
 const history=await payload.find({collection:'changes',where:{kind:{equals:'shared-section'}}})
 assert.equal(history.totalDocs,1);assert.equal(history.docs[0].url,'/blog/editorial-test')
 await payload.update({collection:'sections',id:section.id,data:{active:false,changeNote:'Desactivar prueba'}})
 assert.equal((await payload.find({collection:'sections',overrideAccess:false})).totalDocs,0)
 await payload.update({collection:'posts',id:target.id,data:{_status:'draft'}})
 await assert.rejects(()=>payload.update({collection:'posts',id:article.id,data:{_status:'published'}}),'Unpublished target or disabled shared section must block publication')
 const {GET:exportChanges}=await import('../app/api/cms/changes/route')
 assert.equal((await exportChanges(new Request('http://localhost/api/cms/changes'))).status,401)
 const login=await payload.login({collection:'users',data:{email:user.email,password}})
 const csv=await exportChanges(new Request('http://localhost/api/cms/changes?format=csv&kind=shared-section',{headers:{authorization:`JWT ${login.token}`}}))
 assert.equal(csv.status,200);assert.match(csv.headers.get('content-type')||'',/text\/csv/);assert.match(await csv.text(),/Actualización compartida/)
 const filtered=await exportChanges(new Request('http://localhost/api/cms/changes?url=/blog/does-not-exist',{headers:{authorization:`JWT ${login.token}`}}))
 assert.deepEqual(await filtered.json(),[])
 const version=await payload.findVersions({collection:'posts',where:{parent:{equals:target.id}},sort:'createdAt',limit:10})
 const publishedVersion=version.docs.find(v=>v.version._status==='published')!
 await payload.restoreVersion({collection:'posts',id:publishedVersion.id,user})
 assert.equal((await payload.findByID({collection:'posts',id:target.id}))._status,'published')
 console.log('PASS: incomplete drafts, publication gates, malformed tables, duplicate H1, Schema validation, dynamic internal links, block HTML/Markdown, shared section propagation/history/access.')
}catch(error){console.error(error);console.error(JSON.stringify((error as any).data));process.exitCode=1}finally{await payload.destroy();await rm(directory,{recursive:true,force:true});process.exit(process.exitCode||0)}
