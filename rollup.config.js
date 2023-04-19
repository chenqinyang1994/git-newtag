import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/git-nt.js',
		format: 'cjs'
	},
    plugins: [typescript()]
};