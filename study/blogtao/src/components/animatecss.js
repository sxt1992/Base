import Vue from 'vue';
import 'animate.css';

const addEvent = (el, handler) => {
  // var
  el.addEventListener('webkitAnimationEnd', handler, false);
  el.addEventListener('mozAnimationEnd', handler, false);
  el.addEventListener('MSAnimationEnd', handler, false);
  el.addEventListener('oanimationend', handler, false);
  el.addEventListener('animationend', handler, false);
};
const removeEvent = (el, handler) => {
  // var this.className;
  el.removeEventListener('webkitAnimationEnd', handler, false);
  el.removeEventListener('mozAnimationEnd', handler, false);
  el.removeEventListener('MSAnimationEnd', handler, false);
  el.removeEventListener('oanimationend', handler, false);
  el.removeEventListener('animationend', handler, false);
};

const handler = (el, cn) => {
  const classArr = /^(.*)do-sth-start\{(.*)\}do-sth-end\d+$/.exec(cn);
  const afterCarr = classArr[2].split('*_*@split');
  const h = function $() {
    window.animateing = undefined;
    let className = this.className.replace(/\s/g, '  ');
    classArr[1].trim().replace(/\s{2,}/g, ' ').split(' ').forEach((item) => {
      className = className.replace(new RegExp(`(^|\\s)${item}(\\s|$)`, 'g'), ' ');
    });
    if (afterCarr[2]) {
      className += ` ${afterCarr[2]}`;
    }
    if (afterCarr[3]) {
      afterCarr[3].trim().replace(/\s{2,}/g, ' ').split(' ').forEach((item) => {
        className = className.replace(new RegExp(`(^|\\s)${item}(\\s|$)`, 'g'), ' ');
      });
    }
    if (this.className.replace(/\s/g, '  ') !== className) {
      this.className = className.trim().replace(/\s{2,}/g, ' ');
    }

    removeEvent(this, $);
  };
  addEvent(el, h);
  let className = el.className.replace(/\s/g, '  ');
  if (afterCarr[0]) {
    className += ` ${afterCarr[0]}`;
  }
  if (afterCarr[1]) {
    afterCarr[1].trim().replace(/\s{2,}/g, ' ').split(' ').forEach((item) => {
      className = className.replace(new RegExp(`(^|\\s)${item}(\\s|$)`, 'g'), ' ');
    });
  }
  if (classArr[1].trim() !== '') {
    window.animateing = true;
  }
  // eslint-disable-next-line
  el.className = `${className} ${classArr[1]}`.trim().replace(/\s{2,}/g, ' ');
};

Vue.directive('animate', {
  bind() {
  },
  inserted() {
  },
  update() {
  },
  componentUpdated(el, binding) {
    handler(el, binding.value);
  },
  unbind() {
  }
});
