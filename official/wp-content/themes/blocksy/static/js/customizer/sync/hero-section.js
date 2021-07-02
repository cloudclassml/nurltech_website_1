import { markImagesAsLoaded } from '../../frontend/lazy-load-helpers'
import { getCache, getOptionFor, responsiveClassesFor } from './helpers'
import { typographyOption } from './variables/typography'
import date from '@wordpress/date'
import { handleBackgroundOptionFor } from './variables/background'
import { changeTagName } from './helpers'
import { renderSingleEntryMeta } from './helpers/entry-meta'

const enabledKeysForPrefix = {
	blog: 'blog_page_title_enabled',
	single_blog_post: 'single_blog_post_title_enabled',
	single_page: 'single_page_title_enabled',
	search: 'search_page_title_enabled',
	categories: 'categories_has_page_title',
	woo_categories: 'woo_categories_has_page_title',
	author: 'author_page_title'
}

export const getPrefixFor = () => {
	if (document.body.classList.contains('blog')) {
		return 'blog'
	}

	if (
		document.body.classList.contains('single') &&
		!document.body.classList.contains('attachment')
	) {
		return 'single_blog_post'
	}

	if (
		document.body.classList.contains('woocommerce-archive') ||
		// document.body.classList.contains('woocommerce-cart') ||
		// document.body.classList.contains('woocommerce-checkout') ||
		// document.body.classList.contains('woocommerce-account') ||
		document.body.classList.contains('post-type-archive-product')
	) {
		return 'woo_categories'
	}

	if (
		document.body.classList.contains('page') ||
		document.body.classList.contains('single') ||
		document.body.classList.contains('blog')
	) {
		return 'single_page'
	}

	if (document.body.classList.contains('search')) {
		return 'search'
	}

	if (document.body.classList.contains('author')) {
		return 'author'
	}

	if (
		document.body.classList.contains('archive') &&
		!document.body.classList.contains('author')
	) {
		return 'categories'
	}

	return false
}

const getEnabledKey = () => {
	if (document.body.classList.contains('blog')) {
		return 'blog_page_title_enabled'
	}

	if (
		document.body.classList.contains('single') &&
		!document.body.classList.contains('attachment')
	) {
		return 'single_blog_post_title_enabled'
	}

	if (
		document.body.classList.contains('woocommerce-archive') ||
		// document.body.classList.contains('woocommerce-cart') ||
		// document.body.classList.contains('woocommerce-checkout') ||
		// document.body.classList.contains('woocommerce-account') ||
		document.body.classList.contains('post-type-archive-product')
	) {
		return 'woo_categories_has_page_title'
	}

	if (
		document.body.classList.contains('page') ||
		document.body.classList.contains('single') ||
		document.body.classList.contains('blog')
		// ||
		// document.body.classList.contains('post-type-archive-product')
	) {
		return 'single_page_title_enabled'
	}

	if (document.body.classList.contains('search')) {
		return 'search_page_title_enabled'
	}

	if (document.body.classList.contains('author')) {
		return 'author_page_title'
	}

	if (
		document.body.classList.contains('archive') &&
		!document.body.classList.contains('author')
	) {
		return 'categories_has_page_title'
	}

	return false
}

export const renderHeroSection = prefix => {
	if (prefix !== getPrefixFor()) {
		return
	}

	const cache = getCache()

	const isCustom = cache.querySelector(
		'.ct-customizer-preview-cache [data-hero-section-custom]'
	)

	if (isCustom) {
		return
	}

	;[...document.querySelectorAll('.hero-section')].map(el =>
		el.parentNode.removeChild(el)
	)

	if (getOptionFor(getEnabledKey()) === 'no') {
		return
	}

	const type = getOptionFor('hero_section', prefix)

	if (
		!cache.querySelector(
			`.ct-customizer-preview-cache .ct-hero-section-cache[data-type="${type}"]`
		)
	) {
		return
	}

	const newHtml = cache.querySelector(
		`.ct-customizer-preview-cache .ct-hero-section-cache[data-type="${type}"]`
	).innerHTML

	const e = document.createElement('div')
	e.innerHTML = newHtml

	while (e.firstElementChild) {
		let type1Selector =
			prefix === 'single_blog_post' ||
			(prefix === 'single_page' &&
				!document.body.classList.contains('blog'))
				? document.body.classList.contains('single-product')
					? '.woocommerce .summary .price'
					: 'article .entry-content'
				: document.body.classList.contains('woocommerce-archive') ||
				  document.body.classList.contains('post-type-archive-product')
				? '.woo-listing-top'
				: '.entries'

		if (prefix === 'single_blog_post') {
			if (
				document
					.querySelector('article .entry-content')
					.parentNode.querySelector(
						'.ct-share-box[data-location="top"]'
					)
			) {
				type1Selector = 'article .ct-share-box[data-location="top"]'
			}
		}

		let entries = document.querySelector(
			type === 'type-1' ? type1Selector : '#primary.content-area'
		)

		entries.parentNode.insertBefore(e.firstElementChild, entries)
	}

	if (
		getOptionFor('page_title_bg_type', prefix) === 'color' &&
		document.querySelector('.hero-section figure')
	) {
		document
			.querySelector('.hero-section figure')
			.parentNode.removeChild(
				document.querySelector('.hero-section figure')
			)
	}

	if (
		type === 'type-2' &&
		getOptionFor('page_title_bg_type', prefix) === 'custom_image'
	) {
		if (!getOptionFor('custom_hero_background', prefix).attachment_id) {
			if (document.querySelector('.hero-section figure')) {
				document
					.querySelector('.hero-section figure')
					.parentNode.removeChild(
						document.querySelector('.hero-section figure')
					)
			}
		} else {
			wp.media
				.attachment(
					getOptionFor('custom_hero_background', prefix).attachment_id
				)
				.fetch()
				.then(() => {
					if (document.querySelector('.hero-section figure img')) {
						document
							.querySelector('.hero-section figure img')
							.removeAttribute('srcset')

						document
							.querySelector('.hero-section figure img')
							.removeAttribute('src')

						document
							.querySelector('.hero-section figure img')
							.removeAttribute('sizes')

						document.querySelector(
							'.hero-section figure img'
						).src = wp.media
							.attachment(
								getOptionFor('custom_hero_background', prefix)
									.attachment_id
							)
							.get('url')
					}
				})
		}
	}

	document.querySelector('.hero-section').removeAttribute('data-parallax')

	if (
		type === 'type-2' &&
		(getOptionFor('page_title_bg_type', prefix) === 'custom_image' ||
			getOptionFor('page_title_bg_type', prefix) === 'featured_image')
	) {
		const parallaxResult = getOptionFor('parallax', prefix)
		const parallaxOutput = [
			...(parallaxResult.desktop ? ['desktop'] : []),
			...(parallaxResult.tablet ? ['tablet'] : []),
			...(parallaxResult.mobile ? ['mobile'] : [])
		]

		if (
			document.querySelector('.hero-section figure') &&
			parallaxOutput.length > 0
		) {
			document.querySelector(
				'.hero-section'
			).dataset.parallax = parallaxOutput.join(':')

			window.ctEvents.trigger('blocksy:parallax:init')
		}
	}

	const heroElements = getOptionFor('hero_elements', prefix)

	let metaCache = document.createElement('div')

	if (document.querySelector('.hero-section .entry-meta')) {
		metaCache.appendChild(
			document.querySelector('.hero-section .entry-meta')
		)
	}

	const heroElementsContainer = document.querySelector(
		'.hero-section .entry-header'
	)

	heroElements.map(singleLayer => {
		if (singleLayer.id === 'custom_title') {
			let title = heroElementsContainer.querySelector('.page-title')

			if (singleLayer.enabled) {
				if (prefix === 'author') {
					let img = document.querySelector(
						'.hero-section .entry-header > [class*="ct-image-container"]'
					)

					if (img) {
						if (singleLayer.has_author_avatar === 'yes') {
							heroElementsContainer.appendChild(img)
						} else {
							img.remove()
						}
					}
				}

				heroElementsContainer.appendChild(title)

				if (
					singleLayer.has_category_label &&
					singleLayer.has_category_label !== 'yes'
				) {
					;[
						...document.querySelectorAll(
							'.hero-section .page-title span'
						)
					].map(el => el.remove())
				}

				if (
					prefix === 'blog' &&
					document.body.classList.contains('blog') &&
					document.body.classList.contains('home')
				) {
					if (singleLayer.title) {
						title.innerHTML = singleLayer.title
					} else {
						title.remove()
					}
				}

				if (title.innerHTML.trim().length === 0) {
					title.remove()
				} else {
					changeTagName(title, singleLayer.heading_tag)
				}
			} else {
				title.remove()
			}
		}

		if (singleLayer.id === 'custom_description') {
			let description = heroElementsContainer.querySelector(
				'.page-description'
			)

			if (singleLayer.enabled && description) {
				heroElementsContainer.appendChild(description)

				if (
					prefix === 'blog' &&
					document.body.classList.contains('blog') &&
					document.body.classList.contains('home')
				) {
					if (singleLayer.description) {
						description.innerHTML = singleLayer.description
					} else {
						description.remove()
					}
				}

				if (description.innerHTML.trim().length === 0) {
					description.remove()
				} else {
					responsiveClassesFor(
						singleLayer.description_visibility,
						description
					)
				}
			} else {
				description && description.remove()
			}
		}

		if (singleLayer.id === 'author_social_channels') {
			let authorBox = heroElementsContainer.querySelector(
				'.author-box-social'
			)
			if (singleLayer.enabled) {
				authorBox && heroElementsContainer.appendChild(authorBox)
			} else {
				authorBox && authorBox.remove()
			}
		}

		if (singleLayer.id === 'breadcrumbs') {
			if (singleLayer.enabled) {
				heroElementsContainer.appendChild(
					heroElementsContainer.querySelector('.ct-breadcrumbs')
				)
			} else {
				heroElementsContainer.querySelector('.ct-breadcrumbs').remove()
			}
		}

		if (singleLayer.id === 'custom_meta' && singleLayer.enabled) {
			heroElementsContainer.insertAdjacentHTML(
				'beforeend',
				metaCache.innerHTML
			)

			if (prefix === 'single_blog_post' || prefix === 'single_page') {
				const metaElements = singleLayer.meta_elements

				let metaContainer = heroElementsContainer.lastElementChild

				renderSingleEntryMeta({
					el: metaContainer,
					meta_elements: metaElements,
					...singleLayer
				})
			}

			if (prefix === 'author') {
				const metaElements = singleLayer.page_meta_elements
				let metaContainer = heroElementsContainer.lastElementChild

				if (!metaElements.joined) {
					;[
						...metaContainer.querySelectorAll('.ct-meta-joined')
					].map(el => el.remove())
				}

				if (!metaElements.articles_count) {
					;[
						...metaContainer.querySelectorAll('.ct-meta-articles')
					].map(el => el.remove())
				}

				if (!metaElements.comments) {
					;[
						...metaContainer.querySelectorAll(
							'.ct-meta-comments-left'
						)
					].map(el => el.remove())
				}

				if (
					!metaContainer.parentNode.querySelector('.entry-meta > *')
				) {
					metaContainer.remove()
				}
			}
		}
	})

	let allMeta = Array.from(
		document.querySelectorAll('.hero-section .entry-meta')
	)

	allMeta.map(el => el.removeAttribute('data-id'))

	if (allMeta.length === 2) {
		allMeta[1].dataset.id = 'second'
	}

	markImagesAsLoaded(document.querySelector('.site-main'))
}

const getMetaSpacingVariables = () =>
	[
		{
			key: 'author_social_channels',
			selector: '.hero-section .author-box-social'
		},
		{
			key: 'custom_description',
			selector: '.hero-section .page-description'
		},
		{
			key: 'custom_title',
			selector:
				'.hero-section .page-title, .hero-section .ct-image-container'
		},
		{ key: 'breadcrumbs', selector: '.hero-section .ct-breadcrumbs' },
		{ key: 'custom_meta', selector: '.hero-section .entry-meta' },
		{
			second_meta: true,
			key: 'custom_meta',
			selector: '.hero-section .entry-meta[data-id="second"]'
		}
	].map(({ key, selector, second_meta }) => ({
		variable: 'itemSpacing',
		unit: 'px',
		responsive: true,
		selector,
		extractValue: value => {
			let component = value.find(component => component.id === key)

			if (second_meta) {
				let allMeta = value.filter(
					component => component.id === 'custom_meta'
				)

				if (allMeta.length === 2) {
					component = allMeta[1]
				} else {
					return 'CT_CSS_SKIP_RULE'
				}
			}

			return (
				(
					component || {
						hero_item_spacing: 20
					}
				).hero_item_spacing || 20
			)
		}
	}))

const getVariablesForPrefix = prefix => ({
	[`${prefix}_hero_height`]: {
		selector: '.hero-section[data-type="type-2"]',
		variable: 'minHeight',
		responsive: true,
		unit: ''
	},

	...typographyOption({
		id: `${prefix}_pageTitleFont`,
		selector: '.entry-header .page-title'
	}),

	[`${prefix}_pageTitleFontColor`]: {
		selector: '.entry-header .page-title',
		variable: 'headingColor',
		type: 'color'
	},

	...typographyOption({
		id: `${prefix}_pageMetaFont`,
		selector: '.entry-header .entry-meta'
	}),

	[`${prefix}_pageMetaFontColor`]: [
		{
			selector: '.entry-header .entry-meta',
			variable: 'color',
			type: 'color:default'
		},

		{
			selector: '.entry-header .entry-meta',
			variable: 'linkHoverColor',
			type: 'color:hover'
		}
	],

	...typographyOption({
		id: `${prefix}_pageExcerptFont`,
		selector: '.entry-header .page-description'
	}),

	[`${prefix}_pageExcerptColor`]: {
		selector: '.entry-header .page-description',
		variable: 'color',
		type: 'color'
	},

	...typographyOption({
		id: `${prefix}_breadcrumbsFont`,
		selector: '.entry-header .ct-breadcrumbs'
	}),

	[`${prefix}_breadcrumbsFontColor`]: [
		{
			selector: '.entry-header .ct-breadcrumbs',
			variable: 'color',
			type: 'color:default'
		},

		{
			selector: '.entry-header .ct-breadcrumbs',
			variable: 'linkInitialColor',
			type: 'color:initial'
		},

		{
			selector: '.entry-header .ct-breadcrumbs',
			variable: 'linkHoverColor',
			type: 'color:hover'
		}
	],

	[`${prefix}_hero_alignment1`]: {
		selector: '.hero-section[data-type="type-1"]',
		variable: 'alignment',
		unit: '',
		responsive: true
	},

	[`${prefix}_hero_alignment2`]: {
		selector: '.hero-section[data-type="type-2"]',
		variable: 'alignment',
		unit: '',
		responsive: true
	},

	[`${prefix}_pageTitleOverlay`]: {
		selector: '.hero-section[data-type="type-2"]',
		variable: 'pageTitleOverlay',
		type: 'color'
	},

	...handleBackgroundOptionFor({
		id: `${prefix}_pageTitleBackground`,
		selector: '.hero-section[data-type="type-2"]'
	}),

	[`${prefix}_hero_elements`]: [...getMetaSpacingVariables()]
})

export const getHeroVariables = () => getVariablesForPrefix(getPrefixFor())

const watchOptionsFor = prefix => {
	;[
		enabledKeysForPrefix[prefix],
		`${prefix}_hero_alignment1`,
		`${prefix}_hero_alignment2`,
		`${prefix}_hero_section`,
		`${prefix}_hero_elements`,

		`${prefix}_page_title_bg_type`,
		`${prefix}_custom_hero_background`,
		`${prefix}_parallax`
	].map(id =>
		wp.customize(id, val => val.bind(to => renderHeroSection(prefix)))
	)
}

Object.keys(enabledKeysForPrefix).map(prefix => watchOptionsFor(prefix))
