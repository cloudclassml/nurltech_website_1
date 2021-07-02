import { getOptionFor, responsiveClassesFor } from './helpers'

const enabledKeysForPrefix = {
	blog: 'blog_page_title_enabled',
	woo: 'woo_categories_has_page_title'
}

export const getPrefixFor = () => {
	if (document.body.classList.contains('woocommerce')) {
		return 'woo'
	}

	return 'blog'
}

export const renderPagination = prefix => {
	if (prefix !== getPrefixFor()) {
		return
	}

	if (document.querySelector('.ct-load-more')) {
		document.querySelector('.ct-load-more').innerHTML = getOptionFor(
			'load_more_label',
			prefix
		)
	}

	;[...document.querySelectorAll('.ct-pagination')].map(el => {
		el.removeAttribute('data-divider')

		if (getOptionFor('paginationDivider', prefix).style === 'none') return
		if (
			getOptionFor('pagination_global_type', prefix) === 'infinite_scroll'
		) {
			return
		}

		el.dataset.divider = ''
	})
}

const getVariablesForPrefix = prefix => ({
	[`${prefix}_paginationSpacing`]: {
		selector: '.ct-pagination',
		variable: 'spacing',
		responsive: true,
		unit: 'px'
	},

	[`${prefix}_paginationDivider`]: {
		selector: '.ct-pagination[data-divider]',
		variable: 'border',
		type: 'border'
	},

	[`${prefix}_simplePaginationFontColor`]: [
		{
			selector:
				'.ct-pagination[data-type="simple"], .ct-pagination[data-type="next_prev"]',
			variable: 'color',
			type: 'color:default'
		},

		{
			selector: '.ct-pagination[data-type="simple"]',
			variable: 'colorActive',
			type: 'color:active'
		},

		{
			selector:
				'.ct-pagination[data-type="simple"], .ct-pagination[data-type="next_prev"]',
			variable: 'linkHoverColor',
			type: 'color:hover'
		}
	],

	[`${prefix}_paginationButtonText`]: [
		{
			selector: '.ct-pagination[data-type="load_more"]',
			variable: 'buttonTextInitialColor',
			type: 'color:default'
		},

		{
			selector: '.ct-pagination[data-type="load_more"]',
			variable: 'buttonTextHoverColor',
			type: 'color:hover'
		}
	],

	[`${prefix}_paginationButton`]: [
		{
			selector: '.ct-pagination[data-type="load_more"]',
			variable: 'buttonInitialColor',
			type: 'color:default'
		},

		{
			selector: '.ct-pagination[data-type="load_more"]',
			variable: 'buttonHoverColor',
			type: 'color:hover'
		}
	]
})

export const getPaginationVariables = () =>
	getVariablesForPrefix(getPrefixFor())

const watchOptionsFor = prefix =>
	[`${prefix}_load_more_label`, `${prefix}_paginationDivider`].map(id =>
		wp.customize(id, val => val.bind(to => renderPagination(prefix)))
	)

Object.keys(enabledKeysForPrefix).map(prefix => watchOptionsFor(prefix))
