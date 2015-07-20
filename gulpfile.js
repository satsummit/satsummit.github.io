var fs = require('fs'); 
var gulp = require('gulp');
var cp = require('child_process');
var path = require('path');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglifyjs');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var notifier = require('node-notifier');

var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');


////////////////////////////////////////////////////////////////////////////////
//--------------------------- Variables --------------------------------------//
//----------------------------------------------------------------------------//

// The package.json
var pkg;

////////////////////////////////////////////////////////////////////////////////
//------------------------- Helper functions ---------------------------------//
//----------------------------------------------------------------------------//

function readPackage () {
  pkg = JSON.parse(fs.readFileSync('package.json'));
}
readPackage();

////////////////////////////////////////////////////////////////////////////////
//-------------------------- Copy tasks --------------------------------------//
//----------------------------------------------------------------------------//

// Copy from the .tmp to _site directory.
// To reduce build times the assets are compiles at the same time as jekyll
// renders the site. Once the rendering has finished the assets are copied.
gulp.task('copy:assets', function(done) {
  return gulp.src('.tmp/assets/**')
    .pipe(gulp.dest('_site/assets'));
});

////////////////////////////////////////////////////////////////////////////////
//------------------------- Browserify tasks ---------------------------------//
//------------------- (Not to be called directly) ----------------------------//
//----------------------------------------------------------------------------//

// Compiles the user's script files to bundle.js.
// When including the file in the index.html we need to refer to bundle.js not
// main.js
gulp.task('javascript', function () {

  var watcher = watchify(browserify({
    entries: ['./src/assets/scripts/main.js'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  function bundler () {
    if (pkg.dependencies) {
      watcher.external(Object.keys(pkg.dependencies));
    }
    return watcher.bundle()
      .on('error', function (e) {
        notifier.notify({
          title: 'Oops! Browserify errored:',
          message: e.message
        });
        console.log('Sass error:', e);
        // Allows the watch to continue.
        this.emit('end');
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      // Source maps.
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('.tmp/assets/scripts'))
      .pipe(reload({stream: true}));
  }

  watcher
  .on('log', gutil.log)
  .on('update', bundler);

  return bundler();
});

// Vendor scripts. Basically all the dependencies in the package.js.
// Therefore be careful and keep the dependencies clean.
gulp.task('vendorScripts', function() {
  // Ensure package is updated.
  readPackage();
  var vb = browserify({
    debug: true,
    require: pkg.dependencies ? Object.keys(pkg.dependencies) : []
  });
  return vb.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('.tmp/assets/scripts/'))
    .pipe(reload({stream: true}));
});

////////////////////////////////////////////////////////////////////////////////
//--------------------------- Assets tasks -----------------------------------//
//----------------------------------------------------------------------------//

gulp.task('styles', function() {
  return gulp.src('src/assets/styles/main.scss')
    .pipe(plumber(function (e) {
      notifier.notify({
        title: 'Oops! Sass errored:',
        message: e.message
      });
        console.log('Sass error:', e.toString());
        // Allows the watch to continue.
        this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: require('node-neat').includePaths,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.tmp/assets/styles'))
    .pipe(browserSync.reload({stream: true}));
});

// Build the jekyll website.
gulp.task('jekyll', function (done) {
  var args = ['exec', 'jekyll', 'build'];

  switch (environment) {
    case 'development':
      args.push('--config=_config.yml,_config-dev.yml');
    break;
    case 'stage':
      args.push('--config=_config.yml,_config-stage.yml');
    break;
    case 'production':
      args.push('--config=_config.yml');
    break;
  }
 

  if (jekyllLimit) {
    args.push('--limit_posts=5');
  }

  return cp.spawn('bundle', args, {stdio: 'inherit'})
    .on('close', done);
});

// Build the jekyll website.
// Reload all the browsers.
gulp.task('jekyll:rebuild', ['jekyll'], function () {
  browserSync.reload();
});


// Setup browserSync.
gulp.task('browser-sync', function() {
  browserSync({
    port: 3000,
    server: {
      baseDir: ['.tmp', '_site'],
      routes: {
        '/node_modules': './node_modules'
      }
    }
  });
});

// Main build task
// Builds the site. Destination --> _site
gulp.task('build', function(done) {
  runSequence(['jekyll', 'vendorScripts', 'javascript', 'styles'], ['copy:assets'], done);
});

gulp.task('watch', function() {
  gulp.watch('src/assets/styles/**/*.scss', function() {
    runSequence('styles');
  });

  gulp.watch(['src/**/*.html', 'src/**/*.md', 'src/**/*.json', 'src/**/*.geojson'], function() {
    runSequence('jekyll', ['copy:assets'], browserReload);
  });

  gulp.watch('package.json', ['vendorScripts']);
});

// Builds the website, watches for changes and starts browserSync.
gulp.task('serve', function(done) {
  runSequence('build', 'watch', 'browser-sync', done);
});

// Default task.
// Builds the website, watches for changes and starts browserSync.
gulp.task('default', function(done) {
  runSequence('build', function() {
    process.exit(0);
    done();
  });
});


var shouldReload = true;
gulp.task('no-reload', function(done) {
  shouldReload = false;
  runSequence('build', 'watch', 'browser-sync', done);
});

var jekyllLimit = false;
gulp.task('limit', function(done) {
  jekyllLimit = true;
  runSequence('build', 'watch', 'browser-sync', done);
});

var environment = 'development';
gulp.task('prod', function(done) {
  environment = 'production';
  runSequence('build', done);
});
gulp.task('stage', function(done) {
  environment = 'stage';
  runSequence('build', done);
});

// Removes jekyll's _site folder
gulp.task('clean', function() {
  return gulp.src(['_site', '.tmp/'], {read: false})
    .pipe(clean());
});

////////////////////////////////////////////////////////////////////////////////
//------------------------- Helper functions ---------------------------------//
//----------------------------------------------------------------------------//

function browserReload() {
  if (shouldReload) {
    browserSync.reload();
  }
}