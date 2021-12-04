const { task, src, dest } = require('gulp');
const { paths } = require('../../utils');
const { join } = require('path');

const copyCss = () =>
	src(join(paths._assets, 'css', '**', '*')).pipe(
		dest(paths.taskTarget('css'))
	);
copyCss.displayName = 'copy:css';
copyCss.description = 'copy global files';

task(copyCss);
