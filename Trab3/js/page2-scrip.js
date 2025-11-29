import registerComponents from './components.js';
import { fetchGenderize, fetchNationalize, fetchQuotable } from './api.js';

registerComponents();

const nameInput = document.getElementById('name2');
const runBtn = document.getElementById('run-apis');
const out = document.getElementById('page2-result');

function show(html, isError = false) {
  out.innerHTML = html;
  out.className = isError ? 'error' : '';
}

function block(title, content) {
  return `<div class="code-block"><strong>${title}</strong>: ${content}</div>`;
}

runBtn.addEventListener('click', async () => {
  const name = String(nameInput.value || '').trim();

  if (name.length < 2) {
    show('Informe um nome com ao menos 2 caracteres.', true);
    return;
  }

  runBtn.disabled = true;
  nameInput.disabled = true;
  show('Executando chamadas em paralelo (Promise.all)...');

  try {
    const safe = (p) =>
      p
        .then((data) => ({ ok: true, data }))
        .catch((err) => ({ ok: false, error: String(err.message ?? err) }));

    const pGender = safe(fetchGenderize(name));
    const pNational = safe(fetchNationalize(name));
    const pQuote = safe(fetchQuotable());

    const [genderRes, natRes, quoteRes] = await Promise.all([pGender, pNational, pQuote]);

    let html = '<h3>Resultados</h3>';

    if (genderRes.ok) {
      const gd = genderRes.data;
      html += block(
        'genderize',
        `nome=${gd.name} — gênero provável: ${gd.gender ?? 'indefinido'} (prob: ${gd.probability ?? '—'})`
      );
    } else {
      html += block('genderize', `<span style="color:#900">Erro: ${genderRes.error}</span>`);
    }

    if (natRes.ok) {
      const nd = natRes.data;
      const countries =
        (nd.country || [])
          .slice(0, 3)
          .map((c) => `${c.country_id} (${Math.round((c.probability || 0) * 100)}%)`)
          .join(', ') || 'Nenhum país provável encontrado';
      html += block('nationalize', `país(es) provável(is): ${countries}`);
    } else {
      html += block('nationalize', `<span style="color:#900">Erro: ${natRes.error}</span>`);
    }

    if (quoteRes.ok) {
      const qd = quoteRes.data;
      html += block('quotable', `"${qd.content}" — <em>${qd.author}</em>`);
    } else {
      html += block('quotable', `<span style="color:#900">Erro: ${quoteRes.error}</span>`);
    }


    show(html);
  } catch (fatal) {
    show(`<strong>Erro inesperado:</strong> ${String(fatal.message ?? fatal)}`, true);
    console.error(fatal);
  } finally {
    runBtn.disabled = false;
    nameInput.disabled = false;
  }
});
