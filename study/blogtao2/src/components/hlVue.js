import hljs from 'highlight.js';
// import 'highlight.js/styles/monokai-sublime.css';
import 'highlight.js/styles/atelier-forest-light.css';
// import 'highlight.js/styles/googlecode.css';
// import 'highlight.js/styles/qtcreator_light.css';
import './row.css';

export default {
  install: Vue => Vue.directive('highlight', el => el.querySelectorAll('pre code').forEach((block) => {
    const code = block;
    hljs.highlightBlock(code);
    code.innerHTML = `<ul><li>${code.innerHTML.replace(/\n/g, '\n</li><li>')}\n</li></ul>`;
  })),
};
