import pkg from 'gulp'

const {gulp, src, dest, parallel, series, watch} = pkg

import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin'
import createWebp from 'gulp-webp';

function webp() {
    return src(`public/img/**/*.{png,jpg,jpeg}`)
        .pipe(createWebp({
            quality: 90
        }))
        .pipe(dest(`public/img/`));
}

function compress() {
    return src(`public/img/**/*.{png,jpg,jpeg,gif}`)
        .pipe(imagemin([
            gifsicle({interlaced: true}),
            mozjpeg({quality: 75, progressive: true}),
            optipng({optimizationLevel: 5})
        ]))
        .pipe(dest('public/img/'))
}

export {webp, compress}
