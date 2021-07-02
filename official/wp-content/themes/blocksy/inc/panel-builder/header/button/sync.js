import ctEvents from 'ct-events'
import { updateAndSaveEl } from '../../../../static/js/frontend/header/render-loop'

ctEvents.on(
	'ct:header:sync:collect-variable-descriptors',
	variableDescriptors => {
		variableDescriptors['button'] = {
			headerButtonFontColor: [
				{
					selector: '.ct-header-cta .ct-button',
					variable: 'buttonTextInitialColor',
					type: 'color:default',
					responsive: true
				},

				{
					selector: '.ct-header-cta .ct-button',
					variable: 'buttonTextHoverColor',
					type: 'color:hover',
					responsive: true
				},

				{
					selector: '.ct-header-cta .ct-button-ghost',
					variable: 'buttonTextInitialColor',
					type: 'color:default_2',
					responsive: true
				},

				{
					selector: '.ct-header-cta .ct-button-ghost',
					variable: 'buttonTextHoverColor',
					type: 'color:hover_2',
					responsive: true
				}
			],

			headerButtonForeground: [
				{
					selector: '.ct-header-cta',
					variable: 'buttonInitialColor',
					type: 'color:default',
					responsive: true
				},

				{
					selector: '.ct-header-cta',
					variable: 'buttonHoverColor',
					type: 'color:hover',
					responsive: true
				}
			],

			headerCtaMargin: {
				selector: '.ct-header-cta',
				type: 'spacing',
				variable: 'margin',
				responsive: true,
				important: true
			},

			headerCtaRadius: {
				selector: '.ct-header-cta',
				type: 'spacing',
				variable: 'buttonBorderRadius',
				responsive: true
			}
		}
	}
)

ctEvents.on('ct:header:sync:item:button', ({ optionId, optionValue }) => {
	const selector = '[data-id="button"]'

	if (optionId === 'header_button_type') {
		updateAndSaveEl(selector, el => {
			const button = el.querySelector('[class*="ct-button"]')
			button.classList.remove('ct-button', 'ct-button-ghost')

			button.classList.add(
				optionValue === 'type-1' ? 'ct-button' : 'ct-button-ghost'
			)
		})
	}

	if (optionId === 'header_button_size') {
		updateAndSaveEl(selector, el => {
			el.querySelector('.ct-button').dataset.size = optionValue
		})
	}

	if (optionId === 'header_button_text') {
		updateAndSaveEl(selector, el => {
			el.querySelector('.ct-button').innerHTML = optionValue
		})
	}

	if (optionId === 'header_button_link') {
		updateAndSaveEl(selector, el => {
			el.querySelector('.ct-button').href = optionValue
		})
	}
})
