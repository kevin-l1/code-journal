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
  const $list = document.createElement('li');
  const $pic = document.createElement('img');
  const $textDiv = document.createElement('div');
  const $headerDiv = document.createElement('div');
  const $h1 = document.createElement('h1');
  const $p = document.createElement('p');
  const $edit = document.createElement('i');

  $h1.textContent = entry.title;
  $p.textContent = entry.notes;

  $list.setAttribute('class', 'list-container');
  $list.setAttribute('dataset', 'entry-id');
  $list.dataset.entryId = entry.entryId;

  $textDiv.setAttribute('class', 'column-full column-half');
  $pic.setAttribute('class', 'picture column-full column-half');
  $pic.setAttribute('src', entry.url);
  $pic.setAttribute('alt', 'Picture');
  $headerDiv.setAttribute('class', 'text-header');
  $h1.setAttribute('class', 'entry-name');
  $p.setAttribute('class', 'entry-notes');
  $edit.setAttribute('class', 'fa fa-pencil');
  $edit.setAttribute('alt', 'Pencil');

  $list.appendChild($pic);
  $list.appendChild($textDiv);
  $textDiv.appendChild($headerDiv);
  $textDiv.appendChild($p);
  $headerDiv.appendChild($h1);
  $headerDiv.appendChild($edit);

  return $list;
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
});

$tabEntryForm.addEventListener('click', () => {
  viewSwap('entry-form');
});

$savedEntries.addEventListener('click', () => {
  if (event.target.className === 'fa fa-pencil') {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(event.target.closest('li').dataset.entryId)) {
        viewSwap('entry-form');
        data.editing = data.entries[i];

        $form.elements.title.value = data.editing.title;
        $form.elements.url.value = data.editing.url;
        $form.elements.notes.value = data.editing.notes;
        const $newEntry = document.querySelector('.newEntry');
        $newEntry.textContent = 'New Entry';
        return;
      }
    }
  }
});
