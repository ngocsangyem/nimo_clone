const { task, src, dest, lastRun } = require('gulp');

const Fiber = require('fibers');
const cssDeclarationSorter = require('css-declaration-sorter');
const autoprefixer = require('autoprefixer');
const sortMedia = require('postcss-sort-media-queries');
const cssnano = require('cssnano');
const aliasImporter = require('node-sass-alias-importer');
const dependents = require('../../plugins/dependents');
const sass = require('gulp-sass')(require('sass'));
const {
	paths,
	plugins,
	isDev,
	pluginErrorHandle,
	dirs,
	browserSync,
	colors,
	config,
	mainBundle,
} = require('../../utils');
const { pipe } = require('../../core');

const postCssPlugins = [
	sortMedia(),
	autoprefixer({
		grid: true,
	}),
	cssDeclarationSorter({
		order: 'concentric-css',
	}),
	cssnano(),
];

const inputs = () => paths.app('styles', 'all.scss');

const sourcemapsInit = () =>
	isDev ? plugins.sourcemaps.init({ largeFile: true }) : pipe();

const sassAlias = () =>
	aliasImporter({
		...config.alias,
	});

const sassOpts = {
	fiber: Fiber,
	outputStyle: 'expanded',
	precision: 10,
	importer: [sassAlias()],
};

const compileSass = () => sass(sassOpts);

const sourcemapsWrite = () => (isDev ? plugins.sourcemaps.write() : pipe());

const postCss = () => (!isDev ? plugins.postcss(postCssPlugins) : pipe());

const rename = () =>
	plugins.rename({
		dirname: '',
		// suffix: !isDev ? '.min' : '',
	});

const output = () => dest(paths.taskTarget(dirs.styles));

const reload = () =>
	browserSync.reload({
		stream: true,
	});

const filter = () => plugins.filter((file) => file.path.includes(paths._pages));

const dependentsPlugin = () =>
	dependents({}, {
		logDependents: true,
		logDependencyMap: false,
	});

const compileStyles = () => {
	return src(inputs(), {
		cwd: paths.app(dirs.styles),
	})
		.pipe(pluginErrorHandle())
		// .pipe(dependentsPlugin())
		// .pipe(filter())
		.pipe(sourcemapsInit())
		.pipe(compileSass())
		.pipe(postCss())
		.pipe(rename())
		.pipe(sourcemapsWrite())
		.pipe(output())
		.pipe(reload());
};

compileStyles.displayName = 'compile:styles:all';
compileStyles.description = `compile styles source(${colors.cyan(
	paths._pages
)}) using sass before autoprefixing and minifying`;
compileStyles.flags = {
	'--development': 'create source maps for styles',
	'--production': `only create minified output in the deployment directory ${colors.cyan(
		paths.taskTarget(dirs.styles)
	)}`,
};

task(compileStyles);
