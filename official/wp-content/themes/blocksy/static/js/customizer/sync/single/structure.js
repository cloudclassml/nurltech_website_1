import { markImagesAsLoaded } from '../../../frontend/lazy-load-helpers'
import ctEvents from 'ct-events'
import { refreshRelatedPosts } from './page-elements'

import { getCache, watchOptionsWithPrefix, getOptionFor } from '../helpers'
import { renderFeaturedImage } from '../featured_image'

export const getSidebarTypeFor = page_structure_type => {
	if (page_structure_type === 'type-1') {
		return 'right'
	}

	if (page_structure_type === 'type-2') {
		return 'left'
	}

	return 'none'
}

const pageStructureFor = page_structure_type => {
	if (page_structure_type === 'type-3') {
		return 'narrow'
	}

	if (page_structure_type === 'type-4') {
		return 'normal'
	}

	if (page_structure_type === 'type-5') {
		return 'normal'
	}

	return 'none'
}

watchOptionsWithPrefix({
	getPrefix: () => {
		if (document.body.classList.contains('single')) {
			return 'single_blog_post'
		}

		if (
			document.body.classList.contains('page') ||
			document.body.classList.contains('blog') ||
			document.body.classList.contains('post-type-archive-product')
		) {
			return 'single_page'
		}

		return false
	},

	getOptionsForPrefix: ({ prefix }) =>
		prefix === 'single_page'
			? ['single_page_structure', 'page_content_style']
			: ['single_blog_post_structure', 'single_content_style'],

	render: ({ prefix }) => {
		if (!document.querySelector('.content-area')) {
			return
		}

		let structure = getOptionFor(
			prefix === 'single_page'
				? 'single_page_structure'
				: 'single_blog_post_structure'
		)

		if (
			getCache().querySelector(
				'.ct-customizer-preview-cache [data-structure-custom]'
			)
		) {
			structure = getCache().querySelector(
				'.ct-customizer-preview-cache [data-structure-custom]'
			).dataset.structureCustom
		}

		let pageStructure = pageStructureFor(structure)
		let sidebarType = getSidebarTypeFor(structure)

		let contentStyle = getOptionFor(
			prefix === 'single_page'
				? 'page_content_style'
				: 'single_content_style'
		)
		let editor = 'default'

		if (document.body.className.indexOf('elementor-page') > -1) {
			editor = 'elementor'
		}

		if (document.body.classList.contains('brz')) {
			editor = 'brizy'
		}

		let computedStructure =
			pageStructure === 'none'
				? contentStyle
				: `${editor}:${contentStyle}:${pageStructure}`

		document.querySelector(
			`article.${prefix === 'single_page' ? 'page' : 'post'}`
		).dataset.structure = computedStructure

		const sidebarEl = document.querySelector(
			'.site-main > .content-area > [class*="ct-container"]'
		)

		sidebarEl.classList.remove('ct-container', 'ct-container-narrow')

		sidebarEl.classList.add(
			pageStructure === 'narrow' ? 'ct-container-narrow' : 'ct-container'
		)

		if (sidebarType === 'none') {
			if (sidebarEl.querySelector('aside')) {
				sidebarEl.removeChild(sidebarEl.querySelector('aside'))
			}

			sidebarEl.removeAttribute('data-sidebar')
			document.body.classList.remove('sidebar')
		} else {
			if (sidebarEl.dataset.sidebar !== sidebarType) {
				document.body.classList.add('sidebar')
				if (sidebarEl.querySelector('aside')) {
					sidebarEl.removeChild(sidebarEl.querySelector('aside'))
				}

				sidebarEl.dataset.sidebar = sidebarType

				const newHtml = getCache().querySelector(
					`.ct-customizer-preview-cache [data-id="sidebar"]`
				).innerHTML

				const e = document.createElement('div')
				e.innerHTML = newHtml

				while (e.firstElementChild) {
					sidebarEl.appendChild(e.firstElementChild)
				}
			}
		}

		if (prefix === 'single_blog_post') {
			refreshRelatedPosts()
		}

		renderFeaturedImage(prefix, { renderArticle: false })

		markImagesAsLoaded(document.querySelector('.site-main'))
		window.ctEvents.trigger('ct:sidebar:update')
	}
})
