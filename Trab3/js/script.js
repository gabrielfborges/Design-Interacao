import registerComponents from './components.js';
import { fetchAgify } from './api.js';


registerComponents();


const form = document.getElementById('name-form');
const input = document.getElementById('name');
const result = document.getElementById('result');


function showMessage(html, isError=false){
result.innerHTML = html;
result.className = isError ? 'error' : '';
}


form.addEventListener('submit', async (e)=>{
e.preventDefault();
const name = (input.value || '').trim();
if(name.length < 2){
showMessage('Por favor insira um nome com ao menos 2 caracteres.', true);
return;
}


showMessage('Consultando API...');


try{
const data = await fetchAgify(name);
let html = `<h3>Resultado</h3>`;
html += `<div class="code-block">Nome: ${data.name}<br>Idade estimada: ${data.age ?? '—'}<br>Ocorrências na base: ${data.count ?? '—'}</div>`;
showMessage(html);
}catch(err){
showMessage(`<strong>Erro:</strong> ${err.message}`, true);
console.error(err);
}
});