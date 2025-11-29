async function safeFetchJson(url){
try{
const res = await fetch(url);
if(!res.ok){
const text = await res.text();
throw new Error(`HTTP ${res.status} - ${res.statusText}: ${text}`);
}
return await res.json();
}catch(err){
throw new Error(`Falha ao acessar ${url} — ${err.message}`);
}
}


export async function fetchAgify(name){
if(!name) throw new Error('Nome não fornecido');
const url = `https://api.agify.io?name=${encodeURIComponent(name)}`;
return await safeFetchJson(url);
}


export async function fetchGenderize(name){
const url = `https://api.genderize.io?name=${encodeURIComponent(name)}`;
return await safeFetchJson(url);
}


export async function fetchNationalize(name){
const url = `https://api.nationalize.io?name=${encodeURIComponent(name)}`;
return await safeFetchJson(url);
}


export async function fetchQuotable(){
const url = `https://api.quotable.io/random`;
return await safeFetchJson(url);
}