import { markImagesAsLoaded } from '../../frontend/lazy-load-helpers'
import {
	getCache,
	setRatioFor,
	watchOptionsWithPrefix,
	changeTagName,
	getOptionFor,
	responsiveClassesFor
} from './helpers'
import { getPrefixFor } from './hero-section'
import { replaceArticleAndRemoveParts } from './single'
import { getSidebarTypeFor } from './single/structure'

export const renderFeaturedImage = (prefix, { renderArticle = true } = {}) => {
	if (!document.querySelector('.content-area')) {
		return
	}

	if (renderArticle) {
		replaceArticleAndRemoveParts()
	}

	if ((getOptionFor('has_featured_image', prefix) || 'no') === 'no') {
		const postNav = document.querySelector(
			'.site-main .content-area article .ct-featured-image'
		)

		postNav && postNav.remove()
	} else {
		const image = document.querySelector(
			'.site-main .content-area article .ct-featured-image'
		)

		image && image.classList.remove('alignwide')
		image && image.classList.remove('ct-boundless')

		if (
			getSidebarTypeFor(
				wp.customize(
					prefix === 'single_page'
						? 'single_page_structure'
						: 'single_blog_post_structure'
				)()
			) === 'none' &&
			(wp.customize(
				prefix === 'single_page'
					? 'page_content_style'
					: 'single_content_style'
			)() || 'wide') === 'wide'
		) {
			if (getOptionFor('featured_image_width', prefix) === 'wide') {
				image.classList.add('alignwide')
			}
		}

		if (
			(wp.customize(
				prefix === 'single_page'
					? 'page_content_style'
					: 'single_content_style'
			)() || 'wide') === 'boxed' &&
			(getOptionFor('featured_image_boundless', prefix) || 'no') === 'yes'
		) {
			image.classList.add('ct-boundless')
		}

		if (getOptionFor('featured_image_location', prefix) === 'below') {
			setTimeout(() => {
				if (
					document.querySelector(
						'.site-main .content-area article .hero-section[data-type="type-1"]'
					)
				) {
					document
						.querySelector('.site-main .content-area article')
						.insertBefore(
							document.querySelector(
								'.site-main .content-area article .hero-section[data-type="type-1"]'
							),
							document.querySelector(
								'.site-main .content-area article .ct-featured-image'
							)
						)
				}
			})
		}

		if (image) {
			setRatioFor(
				getOptionFor('featured_image_ratio', prefix),
				image.querySelector('.ct-image-container .ct-ratio')
			)
		}

		if (
			document.querySelector(
				'.site-main .content-area article .ct-featured-image'
			)
		) {
			responsiveClassesFor(
				getOptionFor('featured_image_visibility', prefix),
				document.querySelector(
					'.site-main .content-area article .ct-featured-image'
				)
			)
		}

		markImagesAsLoaded(document.querySelector('.site-main'))
	}
}

watchOptionsWithPrefix({
	getPrefix: getPrefixFor,

	getOptionsForPrefix: ({ prefix }) => [
		`${prefix}_has_featured_image`,
		`${prefix}_featured_image_boundless`,
		`${prefix}_featured_image_width`,
		`${prefix}_featured_image_location`,
		`${prefix}_featured_image_ratio`,
		`${prefix}_featured_image_visibility`
	],

	render: ({ prefix }) => renderFeaturedImage(prefix)
})
