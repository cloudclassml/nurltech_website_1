import { markImagesAsLoaded } from '../../../frontend/lazy-load-helpers'
import {
	getCache,
	getOptionFor,
	getFreshHtmlFor,
	setRatioFor,
	changeTagName,
	checkAndReplace,
	watchOptionsWithPrefix
} from '../helpers'
import ctEvents from 'ct-events'

checkAndReplace({
	id: 'has_product_breadcrumbs',
	strategy: 'firstChild',

	parent_selector: '#primary > [class*="ct-container"] > section',
	selector: '.ct-breadcrumbs',
	fragment_id: 'shop-breadcrumbs'
})

checkAndReplace({
	id: 'has_shop_sort',

	parent_selector: '.woo-listing-top',
	selector: '.woocommerce-ordering',
	fragment_id: 'shop-sort',
	whenInserted: () => {
		ctEvents.trigger('ct:custom-select:init')
	}
})

checkAndReplace({
	id: 'has_shop_results_count',

	parent_selector: '.woo-listing-top',
	selector: '.woocommerce-result-count',
	fragment_id: 'shop-results-count',

	strategy: 'maybeBefore:.woocommerce-ordering'
})

const type1ToType2 = el => {
	const figure = document.createElement('figure')

	el.insertAdjacentElement('afterbegin', figure)

	let image = el.querySelector('.ct-image-container')
	changeTagName(image, 'a')
	el.querySelector('.ct-image-container').href = el.querySelector(
		'.woocommerce-LoopProduct-link'
	).href
	el.querySelector('figure').appendChild(
		el.querySelector('.ct-image-container')
	)

	if (el.querySelector('.ct-open-quick-view')) {
		el.querySelector('figure').insertAdjacentElement(
			'afterbegin',
			el.querySelector('.ct-open-quick-view')
		)
	}

	if (el.querySelector('.onsale')) {
		el.querySelector('figure').insertAdjacentElement(
			'afterbegin',
			el.querySelector('.onsale')
		)
	}

	if (el.querySelector('.star-rating')) {
		el.appendChild(el.querySelector('.star-rating'))
	}

	if (el.querySelector('.price')) {
		el.querySelector('.ct-woo-card-actions').insertAdjacentElement(
			'afterbegin',
			el.querySelector('.price')
		)
	}

	el.appendChild(el.querySelector('.ct-woo-card-actions'))
}

const type2ToType1 = el => {
	if (el.querySelector('.star-rating')) {
		el.querySelector('.woocommerce-LoopProduct-link').insertAdjacentElement(
			'afterbegin',
			el.querySelector('.star-rating')
		)
	}

	if (el.querySelector('.price')) {
		el.querySelector('.woocommerce-LoopProduct-link').appendChild(
			el.querySelector('.price')
		)
	}

	if (el.querySelector('.entry-meta')) {
		el.appendChild(el.querySelector('.entry-meta'))
	}

	el.appendChild(el.querySelector('.ct-woo-card-actions'))

	if (el.querySelector('.ct-open-quick-view')) {
		el.appendChild(el.querySelector('.ct-open-quick-view'))
	}

	let image = el.querySelector('.ct-image-container')
	changeTagName(image, 'span')
	el.querySelector('.ct-image-container').removeAttribute('href')
	el.querySelector('.woocommerce-LoopProduct-link').insertAdjacentElement(
		'afterbegin',
		el.querySelector('.ct-image-container')
	)

	if (el.querySelector('.onsale')) {
		el.querySelector('.woocommerce-LoopProduct-link').insertAdjacentElement(
			'afterbegin',
			el.querySelector('.onsale')
		)
	}

	if (el.querySelector('figure')) {
		el.querySelector('figure').remove()
	}
}

export const replaceCards = () => {
	if (!document.querySelector('[data-products]')) {
		return
	}

	;[...document.querySelectorAll('[data-products]')].map(el => {
		el.classList.add('ct-disable-transitions')
	})
	;[...document.querySelectorAll('[data-products] > *')].map(product => {
		const productsContainer = product.closest('[data-products]')
		const prevType = productsContainer.dataset.products
		const nextType = getOptionFor('shop_cards_type')

		productsContainer.removeAttribute('data-alignment')

		if (nextType === 'type-1') {
			productsContainer.dataset.alignment = getOptionFor(
				'shop_cards_alignment_1'
			)
		}

		if (nextType !== prevType) {
			if (prevType === 'type-1' && nextType === 'type-2') {
				type1ToType2(product)
			}

			if (prevType === 'type-2' && nextType === 'type-1') {
				type2ToType1(product)
			}
		}

		if (product.querySelector('.entry-meta')) {
			if (wp.customize('has_product_categories')() === 'no') {
				product.querySelector('.entry-meta').dataset.customizeHide = ''
			} else {
				product
					.querySelector('.entry-meta')
					.removeAttribute('data-customize-hide')
			}
		}

		if (product.querySelector('.star-rating')) {
			if (wp.customize('has_star_rating')() === 'no') {
				product.querySelector('.star-rating').dataset.customizeHide = ''
			} else {
				product
					.querySelector('.star-rating')
					.removeAttribute('data-customize-hide')
			}
		}

		if (product.querySelector('.onsale')) {
			if (wp.customize('has_sale_badge')() === 'no') {
				product.querySelector('.onsale').dataset.customizeHide = ''
			} else {
				product
					.querySelector('.onsale')
					.removeAttribute('data-customize-hide')
			}
		}

		const ratio = wp.customize('woocommerce_thumbnail_cropping')()

		setRatioFor(
			ratio === 'uncropped'
				? 'original'
				: ratio === 'custom' || ratio === 'predefined'
				? `${wp.customize(
						'woocommerce_thumbnail_cropping_custom_width'
				  )()}/${wp.customize(
						'woocommerce_thumbnail_cropping_custom_height'
				  )()}`
				: '1/1',
			product.querySelector('.ct-image-container .ct-ratio')
		)

		ctEvents.trigger('ct:archive-product-replace-cards:update', {
			product
		})
	})
	;[...document.querySelectorAll('[data-products]')].map(el => {
		el.dataset.products = getOptionFor('shop_cards_type')

		el.classList.remove('columns-2', 'columns-3', 'columns-4', 'columns-5')

		el.classList.add(
			`columns-${getOptionFor('woocommerce_catalog_columns')}`
		)
	})

	setTimeout(() => {
		;[...document.querySelectorAll('[data-products]')].map(el => {
			el.classList.remove('ct-disable-transitions')
		})
	})

	markImagesAsLoaded(document.querySelector('.shop-entries'))
}

watchOptionsWithPrefix({
	getOptionsForPrefix: () => [
		'has_product_categories',
		'has_star_rating',
		'has_sale_badge',
		'shop_cards_type',
		'woocommerce_catalog_columns',
		'woocommerce_thumbnail_cropping',
		'woocommerce_thumbnail_cropping_custom_width',
		'woocommerce_thumbnail_cropping_custom_height',
		'shop_cards_alignment_1'
	],

	events: ['ct:archive-product-replace-cards:perform'],

	render: () => replaceCards()
})
