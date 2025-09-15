// Add img

let inputImg = document.getElementById('img');
let previewImg = document.querySelector('.img-preview img');

inputImg.addEventListener('change', function (event) {
  let file = event.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      previewImg.src = e.target.result;
    };
  }
});

// Add manchete

let painel = document.querySelector("#painel");

function adicionarManchete() {
  let textoTitulo = document.querySelector("#titulo").value;
  let textoSubtitulo = document.querySelector("#subtitulo").value;
  let inputCorCard = document.querySelector("#card");
  let inputCorTexto = document.querySelector("#texto");

  let card = document.createElement('div');
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
