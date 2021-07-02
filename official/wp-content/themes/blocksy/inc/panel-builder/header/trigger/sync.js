import ctEvents from 'ct-events'
import { updateAndSaveEl } from '../../../../static/js/frontend/header/render-loop'

ctEvents.on(
	'ct:header:sync:collect-variable-descriptors',
	variableDescriptors => {
		variableDescriptors['trigger'] = {
			triggerIconColor: [
				{
					selector: '.ct-header-trigger',
					variable: 'color',
					type: 'color:default'
				},

				{
					selector: '.ct-header-trigger',
					variable: 'colorHover',
					type: 'color:hover'
				}
			],

			triggerSecondColor: [
				{
					selector: '.ct-header-trigger',
					variable: 'secondColor',
					type: 'color:default'
				},

				{
					selector: '.ct-header-trigger',
					variable: 'secondColorHover',
					type: 'color:hover'
				}
			],

			triggerMargin: {
				selector: '.ct-header-trigger',
				type: 'spacing',
				variable: 'margin',
				responsive: true,
				important: true
			}
		}
	}
)

ctEvents.on(
	'ct:header:sync:item:trigger',
	({ optionId, optionValue, values }) => {
		const selector = '[data-id="trigger"]'

		if (optionId === 'mobile_menu_trigger_type') {
			updateAndSaveEl(
				selector,
				el =>
					(el.querySelector('.ct-trigger').dataset.type = optionValue)
			)
		}

		updateAndSaveEl(selector, el => {
			let label = el.querySelector('.ct-label')

			label.innerHTML = values.trigger_label

			label.removeAttribute('hidden')

			if (values.has_trigger_label !== 'yes') {
				label.hidden = true
			}

			el.dataset.design = `${values.trigger_design || 'simple'}${
				values.has_trigger_label === 'yes'
					? `:${values.trigger_label_alignment || 'right'}`
					: ''
			}`
		})
	}
)
