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

  $savedEntries.prepend(renderEntry(formContent));

  viewSwap('entries');

  if (data.entries.length > 0) {
    toggleNoEntries();
  }
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

  $h1.textContent = entry.title;
  $p.textContent = entry.notes;

  $ulContainer.setAttribute('class', 'list-container');
  $liPic.setAttribute('class', 'column-full column-half');
  $liTitle.setAttribute('class', 'column-full column-half');
  $pic.setAttribute('src', entry.url);
  $pic.setAttribute('class', 'entry-pic');
  $pic.setAttribute('alt', 'Picture');
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

const $savedEntries = document.querySelector('.saved-entry');

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    $savedEntries.append(renderEntry(data.entries[i]));
  }

  viewSwap(data.view);

  if (data.entries.length > 0) {
    toggleNoEntries();
  }
});

const $noEntries = document.querySelector('.no-entries');

function toggleNoEntries() {
  $noEntries.setAttribute('class', 'no-entries hidden');
}

const $tabEntries = document.querySelector('.entries');
const $tabEntryForm = document.querySelector('.entry-form');
const $entries = document.querySelector('[data-view="entries"]');
const $entryForm = document.querySelector('[data-view="entry-form"]');

function viewSwap(viewName) {
  if (viewName === 'entries') {
    $entryForm.setAttribute('class', 'hidden');
    $entries.setAttribute('class', 'active');
    data.view = 'entries';
  }
  if (viewName === 'entry-form') {
    $entries.setAttribute('class', 'hidden');
    $entryForm.setAttribute('class', 'active');
    data.view = 'entry-form';
  }
}

$tabEntries.addEventListener('click', () => {
  viewSwap('entries');
  data.view = 'entries';
});

$tabEntryForm.addEventListener('click', () => {
  viewSwap('entry-form');
  data.view = 'entry-form';
});
