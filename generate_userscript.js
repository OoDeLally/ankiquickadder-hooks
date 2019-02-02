const fs = require('fs');
const babelTemplate = require('babel-template');
const babelGenerate = require('babel-generator').default;
const babelTypes = require('babel-types')




const extractMetadata = (programPath, name) => {
  const file = programPath.parent;
  const comments = file.comments;
  const metadataNode = comments.find(node => new RegExp(`^\\s*@${name}\\b`).test(node.value));
  try {
    if (!metadataNode) {
      throw 'missing'
    }
    const commentValue = metadataNode.value;
    const match = commentValue.match(/^\s*@\w+\s+(.*)\s*$/);
    if (!match || !match[1]) {
      throw 'missing'
    }
    return match[1];
  } catch (error) {
    if (error == 'missing') {
      throw Error(`Missing @${name} metadata. Make sure your script contains it.`)
    } else {
      throw error
    }
  }
}


module.exports = function(babel, {styleFile}) {
  return {
    visitor: {
      Program(programPath, state) {
        // console.log('programPath.node.body:', programPath.node.body)
        const nameMetadataValue = extractMetadata(programPath, 'name');

        const templateFileContent = fs.readFileSync(templateFile, 'utf-8');
        const buildUserScript = babelTemplate(templateFileContent);
        const styleFileContent = fs.readFileSync(styleFile, 'utf-8');

        const ast = buildUserScript({
          PLACEHOLDER_HOOK_NAME: babelTypes.stringLiteral(nameMetadataValue),
          PLACEHOLDER_STYLE_TEXT: babelTypes.stringLiteral(styleFileContent),
        });

        const resultProgram = babelTypes.program(ast);

      },
    },
  };
}
