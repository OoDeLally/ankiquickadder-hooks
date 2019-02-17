import * as siteSpecificFunctions from '__SITE_SPECIFIC_FUNCTIONS__'; // eslint-disable-line import/no-unresolved


export default (error) => {
  const productionExtraMessage = `
    Please report the following infos at:
    __PROJECT_GITHUB_ISSUES_URL__`;
  console.error(
    `AnkiAddHooks: Error during web page scraping. ${
      __IS_PRODUCTION__ ? productionExtraMessage : ''
    }

     Message: ${error.message}.

     Page: ${error.location}.

     Hook Template Version: __ANKI_ADD_HOOKS_VERSION__.

     Hook Userscript Name: ${siteSpecificFunctions.hookName}.

     Hook UserScript Version: __USERSCRIPT_VERSION__.

     Stack: ${error.stack}
    `
  );
  if (__IS_PRODUCTION__) {
    alert(`AnkiAddHooks Error
          There was an error in reading the web page.
          You can help us solve it:
          1- Open the console (F12 key => tab "Console").
          2- Copy the error message.
          3- Paste the error message in a github issue at the url mentioned in the error message.
          Thank you.
    `);
  }
};