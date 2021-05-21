const fse = require('fs-extra');
const { editAsync } = require('external-editor');

module.exports = function edit(path) {
  return new Promise((resolve, reject) => {
    const content = fse.readFileSync(path);
    editAsync(content, (err, txt) => {
      if (err) reject(err);
      resolve(txt);
    });
  });
};
