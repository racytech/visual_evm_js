import path from 'path';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

const PATH = './dev'
const FORMAT = 'umd'

function _makeout(path) {
    return {
        file: `${PATH}/index.js`,
        format: FORMAT,
        globals: {
            react: 'React',
            ['react-dom']: 'ReactDOM',
        }
    }
}

const reactOptions = {
    tsconfig: path.resolve(__dirname, 'react.tsconfig.json')
};

const plugin_1 = [
    typescript(reactOptions),
    // nodeResolve({
    //     browser: true,
    //     extenstions: ['.js', '.jsx', '.ts', '.tsx'],
    // }),

    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
    }),
];

export default [
    {
        input: 'src/index.tsx',
        output: [
            _makeout()
        ],
        plugins: plugin_1,
        external: ['react', 'react-dom'],
        watch: {
            include: [
                'src/**/*.[tj]s?(x)',
            ],
            exclude: [
                'node_modules/**'
            ]
        }
    }
]