import { EnterpriseAsCode } from '@semanticjs/common';

async function getComponent() {
  const element = document.createElement('div');

  const { default: _ } = await import('lodash');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack', 'again'], ' ');

  var ent = new EnterpriseAsCode();

  return element;
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
