import saveAs from 'file-saver';
import * as Comlink from './comlink';

const $input = document.querySelector('[data-js="input"]');
const $list = document.querySelector('[data-js="list"]');
const $template = document.querySelector('[data-js="list-item-template"]');

$input.addEventListener('change', loadZip);

/**
 * @param {File} file
 */
async function readFile(file) {
  const ab = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', () => resolve(reader.result));
    reader.addEventListener('error', reject);
    reader.readAsArrayBuffer(file);
  });
  return new Uint8Array(ab);
}

/** @typedef {typeof import('./crate/pkg') & typeof import('./worker').wasmModule} WorkerModuleType */
/** @type {Comlink.Remote<WorkerModuleType>} */
const wasm = Comlink.wrap(new Worker('./worker.js', { type: 'module' }));

/**
 * @param {Comlink.Remote<import('./crate/pkg').ZipReader>} zipReader
 * @param {string} filename
 */
async function extractFile(zipReader, filename) {
  const buffer = await zipReader.getBinary(filename);
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  const basename = filename.split('/').pop();
  saveAs(blob, basename);
}

/**
 * @param {MouseEvent} ev
 */
async function loadZip(ev) {
  await wasm.initialize();

  const file = ev.target.files[0];
  if (!file) {
    return false;
  }
  ev.target.toggleAttribute('disabled', true);

  const buffer = await readFile(file);
  const zipReader = await new wasm.ZipReader(buffer);
  const filenameList = await zipReader.getFilenameList();

  for (const filename of filenameList) {
    const $item = document.importNode($template.content, true);
    const $filename = $item.querySelector('[data-js="filename"]');
    const $extract = $item.querySelector('[data-js="extract-button"]');

    $filename.textContent = filename;
    $extract.addEventListener('click', async () => {
      $extract.toggleAttribute('disabled', true);
      await extractFile(zipReader, filename);
      $extract.toggleAttribute('disabled', false);
    });

    $list.appendChild($item);
  }
}
