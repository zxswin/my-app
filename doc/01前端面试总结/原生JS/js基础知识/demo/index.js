let oInput = document.querySelector('input');

oInput.onkeyup = throttle(check, 1000);

function check() {
  let val = this.value;
  console.log('val', val);
}

function throttle(fn, delay) {
  let t = null;

  return function () {
    let _self = this;
    let args = arguments;

    if (!t) {
      t = setTimeout(function () {
        fn.apply(_self, args);
        clearTimeout(t);
        t = null;
      }, delay);
    }
  };
}
