const { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');

/** 对图片进行无损压缩处理  */
function imgmin() {
  return src('src/images/*')
    .pipe(imagemin())
    .pipe(dest('dist/images'));
}

exports.default = imgmin;
