import { handleResponsiveSwitch, withKeys } from '../helpers'

export const getWooVariablesFor = () => ({
	// Woocommerce archive
	shopCardsGap: {
		selector: '[data-products]',
		variable: 'cardsGap',
		responsive: true,
		unit: 'px'
	},

	...withKeys(['woocommerce_catalog_columns', 'blocksy_woo_columns'], {
		selector: '[data-products]',
		variable: 'shopColumns',
		responsive: true,
		unit: '',
		extractValue: () => {
			const value = wp.customize('blocksy_woo_columns')()

			return {
				desktop: `repeat(${wp.customize(
					'woocommerce_catalog_columns'
				)()}, 1fr)`,
				tablet: `repeat(${value.tablet}, 1fr)`,
				mobile: `repeat(${value.mobile}, 1fr)`
			}
		}
	}),

	cardProductTitleColor: [
		{
			selector:
				'[data-products] .woocommerce-loop-product__title, [data-products] .woocommerce-loop-category__title',
			variable: 'color',
			type: 'color:default'
		},

		{
			selector:
				'[data-products] .woocommerce-loop-product__title, [data-products] .woocommerce-loop-category__title',
			variable: 'colorHover',
			type: 'color:hover'
		}
	],

	cardProductPriceColor: {
		selector: '[data-products] .price',
		variable: 'color',
		type: 'color'
	},

	starRatingColor: [
		{
			selector: ':root',
			variable: 'starRatingInitialColor',
			type: 'color:default'
		},

		{
			selector: ':root',
			variable: 'starRatingInactiveColor',
			type: 'color:inactive'
		}
	],

	saleBadgeColor: [
		{
			selector: ':root',
			variable: 'saleBadgeTextColor',
			type: 'color:text'
		},

		{
			selector: ':root',
			variable: 'saleBadgeBackgroundColor',
			type: 'color:background'
		}
	],

	cardProductCategoriesColor: [
		{
			selector: '[data-products] .entry-meta a',
			variable: 'linkInitialColor',
			type: 'color:default'
		},

		{
			selector: '[data-products] .entry-meta a',
			variable: 'linkHoverColor',
			type: 'color:hover'
		}
	],

	cardProductButton1Text: [
		{
			selector: '[data-products="type-1"]',
			variable: 'buttonTextInitialColor',
			type: 'color:default'
		},

		{
			selector: '[data-products="type-1"]',
			variable: 'buttonTextHoverColor',
			type: 'color:hover'
		}
	],

	cardProductButton2Text: [
		{
			selector: '[data-products="type-2"]',
			variable: 'buttonTextInitialColor',
			type: 'color:default'
		},

		{
			selector: '[data-products="type-2"]',
			variable: 'buttonTextHoverColor',
			type: 'color:hover'
		}
	],

	cardProductButtonBackground: [
		{
			selector: '[data-products]',
			variable: 'buttonInitialColor',
			type: 'color:default'
		},

		{
			selector: '[data-products]',
			variable: 'buttonHoverColor',
			type: 'color:hover'
		}
	],

	cardProductBackground: {
		selector: '[data-products="type-2"]',
		variable: 'backgroundColor',
		type: 'color'
	},

	cardProductRadius: {
		selector: '[data-products] .product',
		type: 'spacing',
		variable: 'borderRadius',
		responsive: true
	},

	cardProductShadow: {
		selector: '[data-products="type-2"]',
		type: 'box-shadow',
		variable: 'boxShadow',
		responsive: true
	},

	// Woocommerce single
	productGalleryWidth: {
		selector: '.product-entry-wrapper',
		variable: 'productGalleryWidth',
		unit: '%'
	},

	singleProductTitleColor: {
		selector: '.entry-summary .product_title',
		variable: 'headingColor',
		type: 'color'
	},

	singleProductPriceColor: {
		selector: '.entry-summary .price',
		variable: 'color',
		type: 'color'
	},

	productContentBoxedShadow: {
		selector: '.product[data-structure*="boxed"]',
		type: 'box-shadow',
		variable: 'boxShadow',
		responsive: true
	},

	productContentBoxedSpacing: {
		selector: '.product[data-structure*="boxed"]',
		variable: 'contentBoxedSpacing',
		responsive: true,
		unit: ''
	},

	upsell_products_visibility: handleResponsiveSwitch({
		selector: '.single-product .up-sells'
	}),

	related_products_visibility: handleResponsiveSwitch({
		selector: '.single-product .related'
	}),

	// Store notice
	wooNoticeContent: {
		selector: '.demo_store',
		variable: 'color',
		type: 'color'
	},

	wooNoticeBackground: {
		selector: '.demo_store',
		variable: 'backgroundColor',
		type: 'color'
	},

	// messages
	infoMessageColor: [
		{
			selector: '.woocommerce-info, .woocommerce-message',
			variable: 'color',
			type: 'color:text'
		},

		{
			selector: '.woocommerce-info, .woocommerce-message',
			variable: 'backgroundColor',
			type: 'color:background'
		}
	],

	errorMessageColor: [
		{
			selector: '.woocommerce-error',
			variable: 'color',
			type: 'color:text'
		},

		{
			selector: '.woocommerce-error',
			variable: 'backgroundColor',
			type: 'color:background'
		}
	]
})
