import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
	js.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		files: ['**/*.{js,jsx,ts,tsx,vue}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				document: 'readonly',
				modules: false,
			},
		},
	},
	reactRecommended,
	{
		plugins: {
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
			prettier: prettier,
		},
		rules: {
			'prettier/prettier': 'error',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'react/prop-types': 'off', // Отключите, если используете TypeScript
			'no-unused-vars': 'off',
			'react/react-in-jsx-scope': 'off',
			'no-undef': 'warn',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	eslintConfigPrettier, // Отключает правила ESLint, которые конфликтуют с Prettier
];
