const $url = document.querySelector('#photo-url');
const $img = document.querySelector('#photo');

$url.addEventListener('input', () => {
  $img.src = $url.value;
});

const $form = document.querySelector('#form');

function submitContent(event) {
  event.preventDefault();
  const $titleValue = $form.elements.title.value;
  const $urlValue = $form.elements.url.value;
  const $notesValue = $form.elements.notes.value;
  const $formContent = {
    entryId: data.nextEntryId,
    title: $titleValue,
    url: $urlValue,
    notes: $notesValue
  };
  // console.log(data.nextEntryId);
  // console.log(data.entries);
  // console.log($formContent.entryId);
  data.entries.push($formContent);
  data.nextEntryId++;
  // console.log(data.nextEntryId);
  // console.log(data.entries);
  // console.log($formContent.entryId);
  $form.reset();
  $img.src = 'images/placeholder-image-square.jpg';
}

$form.addEventListener('submit', submitContent);

// https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png
