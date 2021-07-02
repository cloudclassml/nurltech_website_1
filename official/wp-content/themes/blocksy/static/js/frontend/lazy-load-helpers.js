export const markImagesAsLoaded = el =>
	el &&
	[...el.querySelectorAll('[class*="ct-image-container"].ct-lazy')].map(
		el => {
			if (!el.querySelector('img')) {
				return
			}

			el.querySelector('img').setAttribute(
				'src',
				el.querySelector('img').dataset.ctLazy
			)

			if (el.querySelector('img').dataset.ctLazySet) {
				el.querySelector('img').setAttribute(
					'srcset',
					el.querySelector('img').dataset.ctLazySet
				)
			}

			el.classList.remove('ct-lazy')
			el.classList.add('ct-lazy-loaded')
		}
	)
