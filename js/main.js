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
  const formContent = {
    entryId: data.nextEntryId,
    title: $titleValue,
    url: $urlValue,
    notes: $notesValue
  };
  data.entries.unshift(formContent);
  data.nextEntryId++;
  $form.reset();
  $img.src = 'images/placeholder-image-square.jpg';
}

$form.addEventListener('submit', submitContent);

function renderEntry(entry) {
  const $ulContainer = document.createElement('ul');
  const $liPic = document.createElement('li');
  const $liTitle = document.createElement('li');
  const $liNotes = document.createElement('li');
  const $liUl = document.createElement('ul');
  const $pic = document.createElement('img');
  const $h1 = document.createElement('h1');
  const $p = document.createElement('p');

  $h1.innerHTML = entry.title;
  $p.innerHTML = entry.notes;

  $ulContainer.setAttribute('class', 'list-container');
  $liPic.setAttribute('class', 'column-full column-half');
  $liTitle.setAttribute('class', 'column-full column-half');
  $pic.setAttribute('src', entry.url);
  $pic.setAttribute('class', 'entry-pic');
  $h1.setAttribute('class', 'entry-name');
  $p.setAttribute('class', 'entry-notes');

  $ulContainer.appendChild($liPic);
  $ulContainer.appendChild($liTitle);
  $liPic.appendChild($pic);
  $liTitle.appendChild($h1);
  $liTitle.appendChild($liUl);
  $liUl.appendChild($liNotes);
  $liNotes.appendChild($p);

  return $ulContainer;
}

const $ul = document.querySelector('.saved-entry');

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.append(renderEntry(data.entries[i]));
    toggleNoEntries();
  }
});

function toggleNoEntries() {
  const $noEntries = document.querySelector('.no-entries');
  if (data.entries.length > 1) {
    $noEntries.setAttribute('class', 'no-entries hidden');
  } else {
    $noEntries.setAttribute('class', 'no-entries');
  }
}

// https://static1.srcdn.com/wordpress/wp-content/uploads/2023/03/honkai-star-rail-kafka-how-to-get.jpg
// http://localhost:5500/index.html
