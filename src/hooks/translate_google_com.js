// @name         Anki Add Hooks for Google Translate
// @version      0.1
// @description  Generate a hook for AnkiConnect on Google Translate
// @author       Pascal Heitz
// @include      /translate\.google\.com\//


const getSourceLangage = () => document.querySelector('.sl-sugg .jfk-button-checked').innerText.split(/ *- */)[0];


const getTargetLangage = () => document.querySelector('.tl-sugg .jfk-button-checked').innerText;


export const hookName = 'translate.google.com';


export const extractFrontText = () => {
  // source language could be written as "ENGLISH - DETECTED" and we only want "ENGLISH"
  const sourceLanguage = getSourceLangage();
  const sourceSentence = document.querySelector('textarea#source').value;
  return `${sourceLanguage}\n${sourceSentence}`;
};

export const extractBackText = () => {
  const targetLanguage = getTargetLangage();
  const translatedSentence = document.querySelector('.translation').innerText;
  return `${targetLanguage}\n${translatedSentence}`;
};

export const extractDirection = () => `${getSourceLangage()} -> ${getTargetLangage()}`;


export const run = (createHook) => {
  setInterval(() => {
    const parentNode = document.querySelector('.result-footer');
    if (!parentNode) {
      return; // Container not found
    }
    const existingHook = parentNode.querySelector('.-anki-quick-adder-hook');
    if (existingHook) {
      return; // Hook already exists
    }
    const children = Array.from(parentNode.childNodes);
    const firstFloatLeftNode = children.find(node => node.style.float === 'left');
    const hook = createHook();
    hook.style.float = 'right';
    hook.style.top = '15px';
    hook.style.right = '10px';
    parentNode.insertBefore(hook, firstFloatLeftNode);
  }, 500);
};
