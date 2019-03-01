'use strict';

// Init gulp
const gulp = require('gulp');

// Utilities
const watch = require('gulp-watch');
const rimraf = require('rimraf');
const notify = require( 'gulp-notify' );
const fs = require('fs');

// HTML build
const pug = require('gulp-pug');
const rename = require('gulp-rename');

// CSS Build
const postcss = require('gulp-postcss');
const dest = require('gulp-dest');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const cssmin = require('gulp-clean-css');

// JS Build
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Image preparing
const pngquant = require('imagemin-pngquant');
const imagemin = require('gulp-imagemin');

// SVG Sprite Build
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');

// WebServer
const browserSync = require("browser-sync");
const reload = browserSync.reload;


// Paths
const path = {
        build: { 
            html: 'dist/',
            js: 'dist/js/',
            css: 'dist/css/',
            img: 'dist/img/',
            fonts: 'dist/fonts/'
        },
        src: { 
            html: ['src/pages/**/*.pug', '!src/pages/layout.pug'], 
            js: 'src/pages/**/*.js',
            css: 'src/styles/style.scss',
            img: 'src/assets/images/**/*.*', 
            fonts: 'src/assets/fonts/**/*.*'
        },
        watch: {
            html: 'src/**/*.pug',
            js: 'src/**/*.js',
            style: 'src/**/*.scss',
            img: 'src/assets/images/**/*.*',
            fonts: 'src/assets/fonts/**/*.*'
        },
        clean: './dist'
    };

// Server Config
const config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "KindOfHeaven"
};


// HTML Build task

gulp.task('html', function () {
    return gulp.src(path.src.html)
        .pipe(pug({pretty: true}))
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

// ------------------------------------------------------------------------------------------------------------------------

// CSS Build task

gulp.task('css', function () {
   const processors = [autoprefixer({browsers: ['>1%']})];
   return gulp.src(path.src.css)
       .pipe(sass().on( 'error', notify.onError(
            {
                message: "<%= error.message %>",
                title  : "Sass Error!"
            }))
        )
        .pipe(cssmin())
        .pipe(postcss(processors))
        .pipe(gulp.dest(path.build.css, {ext: '.css'}))
        .pipe(reload({stream: true}));
});


// ------------------------------------------------------------------------------------------------------------------------

// JS Build task

gulp.task('js', function () {
    return gulp.src(path.src.js)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
});

// ------------------------------------------------------------------------------------------------------------------------

// Image preparing task

gulp.task('image', function () {
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

// ------------------------------------------------------------------------------------------------------------------------

// Moving fonts 

gulp.task('fonts', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// ------------------------------------------------------------------------------------------------------------------------

// SVG Sprite build

gulp.task('svgSprite', function () {
    return gulp.src('src/img/*/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../src/img/sprite.svg",
                    render: {
                        scss: {
                            dest:'./../src/pcss/partials/_sprite.pcss',
                            template: "./src/pcss/partials/_sprite_template.pcss"
                        }
                    }
                }
            }
        }))
        .pipe(gulp.dest('./'));
});

// ------------------------------------------------------------------------------------------------------------------------

// Auxiliary tasks

gulp.task('webserver', async function (cb) {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('createDir', (cb) => {
    const folders = [
        'dist',
        'dist/js'
    ];

    folders.forEach(dir => {
        if(!fs.existsSync(dir))     
            fs.mkdirSync(dir), 
            console.log('📁  folder created:', dir);        
    });
    return cb();
})

// ------------------------------------------------------------------------------------------------------------------------

// Watch task

gulp.task('watch', function(){
    watch([path.watch.html], (cb) => {
        gulp.task('html')();
    })
    watch([path.watch.style], (cb) => {
        gulp.task('css')();
    })
    watch([path.watch.js], (cb) => {
        gulp.task('js')();
    })
    watch([path.watch.img], (cb) => {
        gulp.task('image')();
    })
    watch([path.watch.fonts], (cb) => {
        gulp.task('fonts')();
    })
});

// ------------------------------------------------------------------------------------------------------------------------

gulp.task('build', gulp.series('clean', 'createDir', gulp.parallel('css', 'js', 'html','image', 'fonts')));
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'webserver')))