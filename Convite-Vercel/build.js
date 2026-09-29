// Roda na Vercel: copia site/ para public/ trocando __BASE__ pelo endereço real do projeto.
const fs=require('fs'),path=require('path');
const dom=process.env.BASE_URL||(process.env.VERCEL_PROJECT_PRODUCTION_URL&&'https://'+process.env.VERCEL_PROJECT_PRODUCTION_URL)||(process.env.VERCEL_URL&&'https://'+process.env.VERCEL_URL)||'';
const base=dom.replace(/\/+$/,'');
function walk(s,d){fs.mkdirSync(d,{recursive:true});for(const e of fs.readdirSync(s,{withFileTypes:true})){const a=path.join(s,e.name),b=path.join(d,e.name);
 if(e.isDirectory())walk(a,b);else if(e.name.endsWith('.html'))fs.writeFileSync(b,fs.readFileSync(a,'utf8').split('__BASE__').join(base));else fs.copyFileSync(a,b)}}
fs.rmSync('public',{recursive:true,force:true});walk('site','public');
console.log(base?'Endereço usado nas prévias: '+base:'ATENÇÃO: sem endereço, as prévias (og:image) não vão funcionar.');
