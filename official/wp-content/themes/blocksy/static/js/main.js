import './public-path.js'
import './frontend/lazy-load'
import './frontend/comments'
import { watchLayoutContainerForReveal } from './frontend/animated-element'
import { onDocumentLoaded, handleEntryPoints } from './helpers'
import { mountRenderHeaderLoop } from './frontend/header/render-loop'
import ctEvents from 'ct-events'
import $ from 'jquery'
import { getAllRegularSelects } from './frontend/choices-entry'

import { mount as mountSocialButtons } from './frontend/social-buttons'
import { mount as mountBackToTop } from './frontend/back-to-top-link'
import { mount as mountShareBox } from './frontend/share-box'
import { mount as mountResponsiveHeader } from './frontend/header/responsive-desktop-menu'
import { mount as mountMobileMenu } from './frontend/mobile-menu'

handleEntryPoints([
	{
		els: 'body[class*="woocommerce"]',
		load: () => import('./frontend/woocommerce/main')
	},

	{
		els: '.ct-trending-block [data-page]',
		load: () => import('./frontend/trending-block'),
		events: ['ct:trending-block:mount']
	},

	{
		els: '[data-parallax]',
		load: () => import('./frontend/parallax/register-listener'),
		events: ['blocksy:parallax:init']
	},

	{
		els: '.flexy-container[data-flexy*="no"]',
		load: () => import('./frontend/flexy'),
		events: ['ct:flexy:update']
	},

	{
		els: '.ct-share-box [data-network]',
		load: () => new Promise(r => r({ mount: mountSocialButtons }))
	},

	{
		els: () => [
			getAllRegularSelects().length > 0 ? [getAllRegularSelects()[0]] : []
		],
		load: () => import('./frontend/choices'),
		events: ['ct:custom-select:init'],
		onLoad: ({ reload }) => {
			$ &&
				$(window).on('elementor/frontend/init', () => {
					elementorFrontend.hooks.addAction(
						'frontend/element_ready/global',
						() => reload()
					)
				})
		}
	},

	{
		els: '.ct-back-to-top',
		load: () => new Promise(r => r({ mount: mountBackToTop })),
		events: ['ct:back-to-top:mount']
	},

	{
		els: '.ct-share-box[data-type="type-2"]',
		load: () => new Promise(r => r({ mount: mountShareBox })),
		events: ['ct:single:share-box:update']
	},

	{
		els: ['.entries[data-layout]', '[data-products].products'],
		condition: () =>
			!!document.querySelector(
				'.ct-pagination:not([data-type="simple"])'
			),
		load: () => import('./frontend/layouts/infinite-scroll'),
		beforeLoad: el => watchLayoutContainerForReveal(el)
	},

	{
		els: () => [
			[
				...document.querySelectorAll('.search-form[data-live-results]')
			].filter(
				el =>
					!el.matches(
						'[id="search-modal"] .search-form[data-live-results]'
					) &&
					!el.matches(
						'.ct-sidebar .ct-widget .woocommerce-product-search'
					)
			)
		],
		load: () => import('./frontend/search-implementation'),
		mount: ({ mount, el }) => mount(el, {})
	},

	{
		els:
			'.ct-sidebar .ct-widget .search-form:not(.woocommerce-product-search)',
		load: () => import('./frontend/search-implementation')
	},

	{
		els: '.ct-sidebar .ct-widget .woocommerce-product-search',
		load: () => import('./frontend/search-implementation'),
		mount: ({ mount, el }) => mount(el, {})
	},

	{
		els: '[id="search-modal"] .search-form[data-live-results]',
		condition: () =>
			!!document.querySelector(
				'header[data-behavior] [data-id="search"]'
			),
		load: () => import('./frontend/search-implementation'),
		mount: ({ mount, el }) => {
			return mount(el, {
				mode: 'modal',
				perPage: 6
			})
		}
	},

	{
		els: 'header [data-device="desktop"] [data-id*="menu"] > .menu',
		condition: () =>
			!!document.querySelector(
				'header [data-device="desktop"] [data-id*="menu"] .menu-item-has-children'
			),
		load: () => import('./frontend/header/menu'),
		onLoad: false,
		mount: ({ handleFirstLevelForMenu, el }) => {
			handleFirstLevelForMenu(el)
		},
		events: [
			'ct:header:init-popper'
			// ...(window.wp && wp.customize ? ['ct:header:render-frame'] : [])
		]
	},

	{
		els: [
			'header [data-device="desktop"] [data-id*="menu"] > .menu .menu-item-has-children > .sub-menu',
			'header [data-device="desktop"] [data-id*="menu"] > .menu .page_item_has_children > .sub-menu'
		],
		load: () => import('./frontend/header/menu'),
		mount: ({ handleUpdate, el }) => handleUpdate(el),
		onLoad: false,
		events: ['ct:header:init-popper']
	},

	{
		els: 'header [data-device="desktop"] [data-id^="menu"]',
		load: () => new Promise(r => r({ mount: mountResponsiveHeader })),
		events: ['ct:header:render-frame']
	},

	// TODO: mount this listener on offcanvas open/close
	{
		els: '#offcanvas .child-indicator',
		load: () => new Promise(r => r({ mount: mountMobileMenu }))
	},

	{
		els: [
			'.ct-modal-action',
			'.ct-header-search > a[href]'
		],

		load: () => import('./frontend/overlay'),
		events: ['ct:header:update']
	}
])

onDocumentLoaded(() => {
	setTimeout(() => document.body.classList.remove('ct-loading'), 1500)
	mountRenderHeaderLoop()
})

ctEvents.on('ct:overlay:handle-click', ({ e, el, options = {} }) => {
	import('./frontend/overlay').then(({ handleClick }) => {
		handleClick(e, {
			container: document.querySelector(el.hash),
			...options
		})
	})
})

const initOverlayTrigger = () => {
	const menuToggle = document.querySelector('.ct-header-trigger')

	if (document.querySelector('#offcanvas')) {
		if (!document.querySelector('#offcanvas').hasListener) {
			document.querySelector('#offcanvas').hasListener = true

			document
				.querySelector('#offcanvas')
				.addEventListener('click', event => {
					if (event.target && event.target.matches('a')) {
						const menuToggle = document.querySelector(
							'.ct-header-trigger'
						)

						menuToggle && menuToggle.click()
					}
				})
		}
	}

	if (menuToggle && !menuToggle.hasListener) {
		menuToggle.hasListener = true

		menuToggle.addEventListener('click', event => {
			event.preventDefault()

			import('./frontend/overlay').then(({ handleClick }) =>
				handleClick(event, {
					container: document.querySelector(
						document.querySelector('.ct-header-trigger').hash
					)
				})
			)
		})
	}
}

onDocumentLoaded(() => initOverlayTrigger())

if ($) {
	$(document).on('uael_quick_view_loader_stop', () => {
		ctEvents.trigger('ct:add-to-cart:quantity')
	})

	$(document).on('facetwp-loaded', () => {
		ctEvents.trigger('ct:custom-select:init')
		ctEvents.trigger('ct:images:lazyload:update')
	})
}
