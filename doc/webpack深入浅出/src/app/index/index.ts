/** index.ts文件  */
/* global $ _*/
import './index.less';
import * as Data from '../../asset/data/data.json';

console.log(`json数据${JSON.stringify(Data)}`);
console.log('ddd8880000111', $('body'));
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log(_);
$('.img-svg').html('<p>88888888888888</p>');
let ccc = 1;
if (ccc === 0) {
  let ac = 0;
  console.log(ac);
}
const person = { a: 1, b: 2 };

if (person) true;

function aaaac(a) {
  console.log(a);
}

aaaac(1);

/** 1  */

function component() {
  const element = document.createElement('div');

  const button = document.createElement('button');
  const br = document.createElement('br');

  button.innerHTML = 'Click me and look at the console!';
  element.innerHTML = 'aaa';
  element.appendChild(br);
  element.appendChild(button);

  button.onclick = () =>
    import(/* webpackChunkName: "b" */ './b').then(module => {
      const print = module.default;

      print();
    });

  return element;
}

document.body.appendChild(component());
