const imageInput = document.getElementById('main-img');
const imagePreview = document.getElementById('main-image-preview');

function updateMainImageFromUrl() {
    imagePreview.src = imageInput.value;
}

imageInput.addEventListener('input', updateMainImageFromUrl);

let painel = document.querySelector("#painel");

function adicionarManchete() {
  let textoTitulo = document.querySelector("#titulo").value;
  let textoSubtitulo = document.querySelector("#subtitulo").value;
  let inputCorCard = document.querySelector("#card");
  let inputCorTexto = document.querySelector("#texto");

  if (textoTitulo.trim() === "" || textoSubtitulo.trim() === "") {
    alert("Por favor, preencha o Título e o Subtítulo da manchete.");
    return;
  }

  let card = document.createElement('div');
  card.className = 'preview';
  card.style.backgroundColor = inputCorCard.value;
  card.style.color = inputCorTexto.value;

  card.innerHTML = `
	  <h2>${textoTitulo}</h2>
    <p>${textoSubtitulo}</p>
    `;

  painel.appendChild(card);

  document.querySelector("#titulo").value = "";
  document.querySelector("#subtitulo").value = "";
}

document.querySelector("#adicionar-manchete").addEventListener("click", adicionarManchete);

const headerLogoUrl = document.getElementById('header-logo-url');
const headerText = document.getElementById('header-text');
const headerTextColor = document.getElementById('header-text-color');
const headerBgColor = document.getElementById('header-bg-color');
const footerText = document.getElementById('footer-text');
const footerTextColor = document.getElementById('footer-text-color');
const footerBgColor = document.getElementById('footer-bg-color');

const previewHeader = document.getElementById('preview-header');
const headerLogo = document.getElementById('header-logo');
const headerTitle = document.getElementById('header-title');
const previewFooter = document.getElementById('preview-footer');
const footerTextPreview = document.getElementById('footer-text-preview');


function updateHeaderFooter() {
    headerLogo.src = headerLogoUrl.value; 
    headerTitle.textContent = headerText.value;
    headerTitle.style.color = headerTextColor.value;
    previewHeader.style.backgroundColor = headerBgColor.value;

    footerTextPreview.textContent = footerText.value;
    footerTextPreview.style.color = footerTextColor.value;
    previewFooter.style.backgroundColor = footerBgColor.value;
}

headerLogoUrl.addEventListener('input', updateHeaderFooter);
headerText.addEventListener('input', updateHeaderFooter);
headerTextColor.addEventListener('input', updateHeaderFooter);
headerBgColor.addEventListener('input', updateHeaderFooter);
footerText.addEventListener('input', updateHeaderFooter);
footerTextColor.addEventListener('input', updateHeaderFooter);
footerBgColor.addEventListener('input', updateHeaderFooter);

updateHeaderFooter();
updateMainImageFromUrl(); 

const salvarBtn = document.getElementById('salvar-codigo');
const carregarBtn = document.getElementById('carregar-codigo');
const limparBtn = document.getElementById('limpar-storage');
const codigoGeradoDiv = document.getElementById('codigo-gerado');
const codigoLocalStoragePre = document.getElementById('codigo-localstorage');
const loadedCodeArea = document.getElementById('codigo-area');

function gerarHTMLFinal(divContent) {
    
    const mainContent = divContent.innerHTML;

    return `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Gerada</title>
    <style>
        body { font-family: "Segoe UI", Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f9; color: #333; }
        .main-content { padding: 20px; max-width: 860px; margin: 0 auto; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        h1 { text-align: center; margin-bottom: 15px; color: #222; }
        .img-preview { text-align: center; margin-bottom: 20px; }
        .img-preview img { max-width: 100%; max-height: 250px; border-radius: 10px; border: 2px solid #ddd; object-fit: cover; }
        .preview { 
            padding: 15px; 
            border-radius: 10px; 
            margin-bottom: 15px; 
            overflow-wrap: break-word; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
            transition: transform 0.2s;
        }
        .preview:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .preview h2 { margin-bottom: 8px; font-size: 1.2rem; }
        .preview p { font-size: 1rem; }
    </style>
</head>
<body>
${mainContent}
</body>
</html>`;
}

function extractBodyContent(fullHtml) {
    const bodyMatch = fullHtml.match(/<body>\s*([\s\S]*?)\s*<\/body>/i);
    return bodyMatch ? bodyMatch[1] : fullHtml;
}

salvarBtn.addEventListener('click', () => {
    updateHeaderFooter(); 
    updateMainImageFromUrl();
    
    const htmlParaSalvar = gerarHTMLFinal(codigoGeradoDiv);

    try {
        localStorage.setItem('paginaGeradaHTML', htmlParaSalvar);
    } catch (e) {
        console.error(e);
    }
});

carregarBtn.addEventListener('click', () => {
    const htmlSalvo = localStorage.getItem('paginaGeradaHTML');

    if (htmlSalvo) {
        const bodyContent = extractBodyContent(htmlSalvo);
        
        codigoGeradoDiv.innerHTML = bodyContent;

        codigoLocalStoragePre.textContent = htmlSalvo;
        loadedCodeArea.style.display = 'block';


    } else {
        loadedCodeArea.style.display = 'none';
        codigoLocalStoragePre.textContent = '';
    }
});

limparBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar o LocalStorage? O código salvo será perdido!')) {
        localStorage.removeItem('paginaGeradaHTML');
        loadedCodeArea.style.display = 'none';
        codigoLocalStoragePre.textContent = '';
    }
});