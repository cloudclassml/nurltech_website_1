import $ from 'jquery'

export const mount = () => {
	const wc_single_product_params = {
		i18n_required_rating_text: 'Please select a rating',
		review_rating_required: 'yes',
		flexslider: {
			rtl: false,
			animation: 'slide',
			smoothHeight: true,
			directionNav: false,
			controlNav: 'thumbnails',
			slideshow: false,
			animationSpeed: 500,
			animationLoop: false,
			allowOneSlide: false
		},
		zoom_enabled: '',
		zoom_options: [],
		photoswipe_enabled: '1',
		photoswipe_options: {
			shareEl: false,
			closeOnScroll: false,
			history: false,
			hideAnimationDuration: 0,
			showAnimationDuration: 0
		},
		flexslider_enabled: '1'
	}

	const openPhotoswipeFor = el => {
		var pswpElement = $('.pswp')[0],
			eventTarget = $(el),
			clicked = eventTarget

		const items = [
			...el
				.closest('.ct-product-view')
				.querySelectorAll(
					'.flexy-items .ct-image-container img, .ct-product-view > .ct-image-container img'
				)
		].map(img => ({
			src: img.closest('a') ? img.closest('a').href : img.src,
			w: img.closest('a') ? img.closest('a').dataset.width : img.width,
			h: img.closest('a') ? img.closest('a').dataset.height : img.width,
			title: img.getAttribute('title')
		}))

		var options = $.extend(
			{
				index: $(clicked).index(),
				addCaptionHTMLFn: function (item, captionEl) {
					if (!item.title) {
						captionEl.children[0].textContent = ''
						return false
					}
					captionEl.children[0].textContent = item.title
					return true
				}
			},
			wc_single_product_params.photoswipe_options
		)

		// Initializes and opens PhotoSwipe.
		var photoswipe = new PhotoSwipe(
			pswpElement,
			PhotoSwipeUI_Default,
			items,
			options
		)

		photoswipe.init()
	}

	const renderPhotoswipe = () =>
		[
			...document.querySelectorAll(
				'.product.type-product .flexy-items .ct-image-container, .product.type-product .ct-product-view > .ct-image-container'
			)
		].map(el =>
			el.addEventListener('click', e => {
				e.preventDefault()
				window.PhotoSwipe && openPhotoswipeFor(el)
			})
		)

	renderPhotoswipe()

	if (!$ || !$.fn || !$.fn.wc_variations_image_update) {
		return
	}

	const old = $.fn.wc_variations_image_update

	$.fn.wc_variations_image_update = function (variation) {
		if (
			this[0]
				.closest('.product')
				.querySelector('.ct-product-view > .ct-image-container')
		) {
			/**
			 * One image
			 */
			let imageContainer = this[0]
				.closest('.product')
				.querySelector('.ct-product-view > .ct-image-container')

			if (!variation) {
				let img = imageContainer.querySelector('img')

				if (
					img &&
					imageContainer.querySelector('.ct-variation-image')
				) {
					img.remove()
					imageContainer.classList.add('ct-no-image')
				} else {
					imageContainer.href =
						imageContainer.dataset.originalHref ||
						imageContainer.href
					if (img.dataset.originalSrc || img.src) {
						img.src = img.dataset.originalSrc || img.src
					}
					if (img.dataset.originalSrcSet || img.srcset) {
						img.srcset = img.dataset.originalSrcSet || img.srcset
					}
					if (img.dataset.originalSizes || img.sizes) {
						img.sizes = img.dataset.originalSizes || img.sizes
					}
				}
			} else {
				if (
					variation.image &&
					variation.image.src &&
					variation.image.src.length > 0
				) {
					let img = imageContainer.querySelector('img')

					imageContainer.classList.remove('ct-no-image')

					if (!imageContainer.querySelector('img')) {
						img = document.createElement('img')
						img.classList.add('ct-variation-image')
					}

					if (
						!img.classList.contains('ct-variation-image') &&
						!img.dataset.originalSrc
					) {
						imageContainer.dataset.originalHref =
							imageContainer.href
						if (img.src) {
							img.dataset.originalSrc = img.src
						}
						if (img.srcset) {
							img.dataset.originalSrcSet = img.srcset
						}
						if (img.sizes) {
							img.dataset.originalSizes = img.sizes
						}
					}

					imageContainer.href = variation.image.full_src

					if (variation.image.srcset) {
						img.srcset = variation.image.srcset
					}
					if (variation.image.sizes) {
						img.sizes = variation.image.sizes
					}
					img.src = variation.image.src

					imageContainer.appendChild(img)
				}
			}

			old && old.apply(this, arguments)
			return
		}

		/**
		 * Gallery
		 */

		if (!this[0].closest('.product').querySelector('.flexy-pills')) {
			old && old.apply(this, arguments)
			return
		}

		const slideToFirst = () => {
			if (
				!this[0].closest('.product').querySelector('.flexy-container')
					.dataset.flexy
			) {
				this[0]
					.closest('.product')
					.querySelector('.flexy-pills')
					.firstElementChild.click()
			}
		}

		const resetView = () => {
			let pill = this[0]
				.closest('.product')
				.querySelector('.flexy-pills [data-original-src]')

			let slide = this[0]
				.closest('.product')
				.querySelector('.flexy-items [data-original-src]')

			if (!pill) {
				return
			}

			pill.parentNode.href =
				pill.parentNode.dataset.originalHref || pill.parentNode.href
			if (pill.dataset.originalSrc || pill.src) {
				pill.src = pill.dataset.originalSrc || pill.src
			}
			if (pill.dataset.originalSrcSet || pill.srcset) {
				pill.srcset = pill.dataset.originalSrcSet || pill.srcset
			}
			if (pill.dataset.originalSizes || pill.sizes) {
				pill.sizes = pill.dataset.originalSizes || pill.sizes
			}

			slide.parentNode.href =
				slide.parentNode.dataset.originalHref || slide.parentNode.href
			if (slide.dataset.originalSrc || slide.src) {
				slide.src = slide.dataset.originalSrc || slide.src
			}
			if (slide.dataset.originalSrcSet || slide.srcset) {
				slide.srcset = slide.dataset.originalSrcSet || slide.srcset
			}
			if (slide.dataset.originalSizes || slide.sizes) {
				slide.sizes = slide.dataset.originalSizes || slide.sizes
			}
		}

		if (!variation) {
			slideToFirst()
			resetView()

			old && old.apply(this, arguments)
			return
		}

		resetView()

		const maybePillImage = this[0]
			.closest('.product')
			.querySelector(`.flexy-items [srcset*="${variation.image.src}"]`)

		if (maybePillImage) {
			const pill = this[0]
				.closest('.product')
				.querySelector(`.flexy-pills`).children[
				[
					...this[0].closest('.product').querySelector(`.flexy-items`)
						.children
				].indexOf(maybePillImage.closest('div'))
			]

			pill && pill.click()
		} else {
			slideToFirst()
			let pill = this[0].closest('.product').querySelector('.flexy-pills')
				.firstElementChild.firstElementChild

			let slide = this[0]
				.closest('.product')
				.querySelector('.flexy-items')
				.firstElementChild.querySelector('.ct-image-container img')

			if (!pill.dataset.originalSrc) {
				pill.parentNode.dataset.originalHref = pill.parentNode.href
				pill.dataset.originalSrc = pill.src
				pill.dataset.originalSrcSet = pill.srcset
				pill.dataset.originalSizes = pill.sizes

				slide.parentNode.dataset.originalHref = slide.parentNode.href
				slide.dataset.originalSrc = slide.src
				slide.dataset.originalSrcSet = slide.srcset
				slide.dataset.originalSizes = slide.sizes
			}

			pill.parentNode.href = variation.image.full_src
			if (variation.image.srcset) {
				pill.srcset = variation.image.srcset
			}
			if (variation.image.sizes) {
				pill.sizes = variation.image.sizes
			}
			pill.src = variation.image.src

			slide.parentNode.href = variation.image.full_src
			if (variation.image.srcset) {
				slide.srcset = variation.image.srcset
			}
			if (variation.image.sizes) {
				slide.sizes = variation.image.sizes
			}
			slide.src = variation.image.src

			slideToFirst()
		}

		old && old.apply(this, arguments)
	}
}
