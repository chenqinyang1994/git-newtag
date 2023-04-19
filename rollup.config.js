const typescript = require('@rollup/plugin-typescript');

module.exports = {
	input: 'src/index.ts',
	output: {
		file: 'dist/git-nt.js',
		format: 'cjs'
	},
    plugins: [typescript()]
};