/** index.ts文件  */

/* global $ _*/

import './index.less';
import * as Data from '../../asset/data/data.json';

console.log(`json数据${JSON.stringify(Data)}`);
console.log('ddd8880000111', $('body'));
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log(_);
$('.img-svg').html('<p>88888888888888</p>');

/** 1  */
// 111
// 111
/** 11*/

// function getComponent() {
//   return import(/* webpackChunkName: "show" */ './show')
//     .then(moudle => {
//       const innerHTML = moudle.default;
//       return innerHTML;
//     })
//     .catch(error => 'An error occurred while loading the component');
// }
// console.log('index');
// import(/* webpackChunkName: 'show'*/ './show').then(function(subPageA) {
//   console.log(subPageA);
// });

// $('.btn').click(() => {
//   getComponent().then(innerHTML => {
//     $('body').append(innerHTML);
//   });
// });

/** 1  */

function component() {
  const element = document.createElement('div');

  const button = document.createElement('button');
  const br = document.createElement('br');

  button.innerHTML = 'Click me and look at the console!';
  element.innerHTML = 'aaa';
  element.appendChild(br);
  element.appendChild(button);

  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  button.onclick = () =>
    import(/* webpackChunkName: "b" */ './b').then(module => {
      const print = module.default;

      print();
    });

  return element;
}

document.body.appendChild(component());
