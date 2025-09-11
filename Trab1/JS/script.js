// Add img

const inputImg = document.getElementById('img');
const previewImg = document.querySelector('.img-preview img');

inputImg.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      previewImg.src = e.target.result;
    };
  }
});

// Add manchete

let painel = document.querySelector("#painel");

function adicionarManchete(){
  const textoTitulo= document.querySelector("#titulo").value;
  const textoSubtitulo= document.querySelector("#subtitulo").value;
  const inputCorCard = document.querySelector("#card");
  const inputCorTexto = document.querySelector("#texto");

  const card = document.createElement('div');
  card.className = 'preview';
  card.style.backgroundColor = inputCorCard.value;
  card.style.color = inputCorTexto.value;
  card.style.border = `2px solid ${inputCorTexto.value}`
    
  card.innerHTML += `
	  <h2>${textoTitulo}</h2>
    <p>${textoSubtitulo}</p>
    `;

    painel.appendChild(card);
}


document.querySelector("#adicionar-manchete").addEventListener("click", adicionarManchete);
