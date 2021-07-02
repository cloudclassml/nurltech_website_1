import { Flexy, adjustContainerHeightFor } from 'flexy'
import ctEvents from 'ct-events'

export const mount = sliderEl => {
	sliderEl = sliderEl.parentNode

	if (sliderEl.flexy) {
		return
	}

	const inst = new Flexy(sliderEl.querySelector('.flexy-items'), {
		flexyAttributeEl: sliderEl.querySelector('.flexy-container'),
		elementsThatDoNotStartDrag: ['.twentytwenty-handle'],
		adjustHeight: !!sliderEl.querySelector('.flexy-items').dataset.height,

		/*
				autoplay:
					Object.keys(
						el.querySelector('.flexy-container').dataset
					).indexOf('autoplay') > -1 &&
					parseInt(
						el.querySelector('.flexy-container').dataset.autoplay,
						10
					)
						? el.querySelector('.flexy-container').dataset.autoplay
						: false,
*/

		pillsContainerSelector: sliderEl.querySelector('.flexy-pills'),
		// leftArrow: sliderEl.querySelector('.flexy-arrow-prev'),
		// rightArrow: sliderEl.querySelector('.flexy-arrow-next'),
		scaleRotateEffect: false,

		// viewport | container
		wrapAroundMode:
			sliderEl.querySelector('.flexy-container').dataset.wrap ===
			'viewport'
				? 'viewport'
				: 'container'
	})

	sliderEl.flexy = inst
}

ctEvents.on('ct:flexy:update-height', () => {
	;[...document.querySelectorAll('.flexy-container')].map(el => {
		if (!el.flexy) {
			return
		}

		adjustContainerHeightFor(el.flexy)
	})
})
