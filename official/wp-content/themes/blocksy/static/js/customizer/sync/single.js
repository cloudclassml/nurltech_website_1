import { markImagesAsLoaded } from '../../frontend/lazy-load-helpers'
import ctEvents from 'ct-events'
import {
	getCache,
	setRatioFor,
	watchOptionsWithPrefix,
	changeTagName,
	responsiveClassesFor,
	getOptionFor
} from './helpers'

import { renderHeroSection, getPrefixFor } from './hero-section'
import { renderFeaturedImage } from './featured_image'

export const replaceArticleAndRemoveParts = () => {
	if (
		!document.body.classList.contains('single') &&
		!document.body.classList.contains('page')
	) {
		return
	}

	if (!document.querySelector('.site-main .content-area')) {
		return
	}

	document.querySelector(
		'.site-main .content-area article'
	).innerHTML = getCache().querySelector(
		'.ct-customizer-preview-cache .single-content-cache > article'
	).innerHTML

	const article = document.querySelector(
		'.single-post .site-main .content-area article'
	)

	if ((wp.customize('has_share_box')() || 'yes') === 'no') {
		const shareBox = document.querySelectorAll(
			'.site-main .content-area article .ct-share-box'
		)
		;[...shareBox].map(el => el && el.parentNode.removeChild(el))
	} else {
		const shareBoxType = wp.customize('share_box_type')() || 'type-1'

		const shareBox1Location = wp.customize('share_box1_location')() || {
			top: false,
			bottom: true
		}

		const shareBox2Location =
			wp.customize('share_box2_location')() || 'right'

		if (!shareBox1Location.top && shareBoxType !== 'type-2') {
			const header = document.querySelector(
				'.site-main .content-area article .ct-share-box[data-location="top"]'
			)

			if (header) {
				header.parentNode.removeChild(header)
			}
		}

		if (!shareBox1Location.bottom || shareBoxType === 'type-2') {
			const content = document.querySelector(
				'.site-main .content-area article .ct-share-box[data-location="bottom"]'
			)

			if (content) {
				content.parentNode.removeChild(content)
			}
		}

		if (shareBoxType === 'type-2') {
			const header = document.querySelector(
				'.site-main .content-area article .ct-share-box[data-location="top"]'
			)

			header.dataset.type = shareBoxType

			header.removeAttribute('data-location')
			header.dataset.location = shareBox2Location
		}

		if ((wp.customize('share_facebook')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article [data-network="facebook"]'
				)
			].map(el => el.parentNode.removeChild(el))
		}

		if ((wp.customize('share_twitter')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article [data-network="twitter"]'
				)
			].map(el => el.parentNode.removeChild(el))
		}

		if ((wp.customize('share_vk')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article [data-network="vk"]'
				)
			].map(el => el.parentNode.removeChild(el))
		}

		if ((wp.customize('share_ok')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article [data-network="ok"]'
				)
			].map(el => el.parentNode.removeChild(el))
		}

		if ((wp.customize('share_telegram')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article [data-network="telegram"]'
				)
			].map(el => el.parentNode.removeChild(el))
		}

		if ((wp.customize('share_pinterest')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article [data-network="pinterest"]'
				)
			].map(el => el.parentNode.removeChild(el))
		}

		if ((wp.customize('share_linkedin')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article [data-network="linkedin"]'
				)
			].map(el => el.parentNode.removeChild(el))
		}

		if ((wp.customize('share_viber')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article [data-network="viber"]'
				)
			].map(el => el.parentNode.removeChild(el))
		}

		if ((wp.customize('share_reddit')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article [data-network="reddit"]'
				)
			].map(el => el.parentNode.removeChild(el))
		}

		if ((wp.customize('share_hacker_news')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article [data-network="hacker_news"]'
				)
			].map(el => el.parentNode.removeChild(el))
		}

		if ((wp.customize('share_whatsapp')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article [data-network="whatsapp"]'
				)
			].map(el => el.parentNode.removeChild(el))
		}

		;[
			...document.querySelectorAll(
				'.site-main .content-area article .ct-share-box'
			)
		].map(el => {
			if (shareBoxType === 'type-1') {
				if (el.lastElementChild.tagName.toLowerCase() === 'span') {
					el.lastElementChild.remove()
				}
			}

			const count = el.children.length

			if (count === 0) {
				el.parentNode.removeChild(el)
				return
			}

			el.removeAttribute('data-count')

			responsiveClassesFor('share_box_visibility', el)

			if (shareBoxType === 'type-2') {
				el.dataset.count = count
			}
		})

		ctEvents.trigger('ct:single:share-box:update')
	}

	if ((wp.customize('has_author_box')() || 'no') !== 'yes') {
		const authorBox = document.querySelector(
			'.site-main .content-area article .author-box'
		)

		authorBox && authorBox.parentNode.removeChild(authorBox)
	} else {
		if ((wp.customize('single_author_box_social')() || 'yes') === 'no') {
			const authorBoxSocial = document.querySelector(
				'.site-main .content-area article .author-box .author-box-social'
			)

			authorBoxSocial &&
				authorBoxSocial.parentNode.removeChild(authorBoxSocial)
		}

		if (
			document.querySelector(
				'.site-main .content-area article .author-box'
			)
		) {
			responsiveClassesFor(
				'author_box_visibility',
				document.querySelector(
					'.site-main .content-area article .author-box'
				)
			)
		}
	}

	if ((wp.customize('has_post_tags')() || 'yes') === 'no') {
		const postTags = document.querySelector(
			'.site-main .content-area article .entry-tags'
		)

		postTags && postTags.parentNode.removeChild(postTags)
	}

	if ((wp.customize('has_post_nav')() || 'yes') === 'no') {
		const postNav = document.querySelector(
			'.site-main .content-area article .post-navigation'
		)

		postNav && postNav.parentNode.removeChild(postNav)
	} else {
		if ((wp.customize('has_post_nav_thumb')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article .post-navigation [class*="nav-item"] > figure'
				)
			].map(el => el.parentNode.removeChild(el))

			const postNav = document.querySelector(
				'.site-main .content-area article .post-navigation'
			)

			if (postNav) {
				postNav.classList.remove('has-thumbnails')
			}
		}

		if ((wp.customize('has_post_nav_title')() || 'yes') === 'no') {
			;[
				...document.querySelectorAll(
					'.site-main .content-area article .post-navigation [class*="nav-item"] .item-title'
				)
			].map(el => el.parentNode.removeChild(el))
		}

		if (
			document.querySelector(
				'.site-main .content-area article .post-navigation'
			)
		) {
			responsiveClassesFor(
				'post_nav_visibility',
				document.querySelector(
					'.site-main .content-area article .post-navigation'
				)
			)
		}
	}

	renderHeroSection(getPrefixFor())
	renderFeaturedImage(getPrefixFor(), { renderArticle: false })

	markImagesAsLoaded(document.querySelector('.site-main'))
}

wp.customize('single_author_box_type', val => {
	val.bind(to => {
		if (document.querySelector('.site-main .author-box')) {
			document.querySelector('.site-main .author-box').dataset.type = to
		}
	})
})

watchOptionsWithPrefix({
	getOptionsForPrefix: () => [
		'single_page_hero_section',
		'single_blog_post_hero_section',
		'has_share_box',
		'share_box_visibility',
		'has_post_nav_title',
		'has_post_nav_thumb',
		'share_box1_location',
		'share_box2_location',
		'share_box_type',
		'share_facebook',
		'share_twitter',
		'share_pinterest',
		'share_linkedin',
		'share_vk',
		'share_ok',
		'share_telegram',
		'share_viber',
		'share_reddit',
		'share_hacker_news',
		'share_whatsapp',
		'has_author_box',
		'single_author_box_social',
		'author_box_visibility',
		'has_post_nav',
		'post_nav_visibility',
		'has_post_tags'
	],
	render: () => replaceArticleAndRemoveParts()
})
