import { handleBackgroundOptionFor } from '../../../static/js/customizer/sync/variables/background'
import { maybePromoteScalarValueIntoResponsive } from 'customizer-sync-helpers/dist/promote-into-responsive'
import {
	withKeys,
	handleResponsiveSwitch
} from '../../../static/js/customizer/sync/helpers'
import ctEvents from 'ct-events'

ctEvents.on(
	'ct:footer:sync:collect-variable-descriptors',
	variableDescriptors => {
		variableDescriptors['global'] = {
			...handleBackgroundOptionFor({
				id: 'footerBackground',
				selector: '.site-footer'
			}),

			...withKeys(
				['has_reveal_effect', 'footerShadow'],
				[
					handleResponsiveSwitch({
						selector: '.ct-footer-reveal .site-footer',
						variable: 'position',
						on: 'sticky',
						off: 'static',
						fullValue: true,
						extractValue: ({
							has_reveal_effect = {
								desktop: false,
								tablet: false,
								mobile: false
							}
						}) => has_reveal_effect
					}),

					{
						selector: '.ct-footer-reveal .site-main',
						type: 'box-shadow',
						variable: 'boxShadow',
						responsive: true,
						fullValue: true,
						forcedOutput: true,
						extractValue: ({
							has_reveal_effect = {
								desktop: false,
								tablet: false,
								mobile: false
							},

							footerShadow = {
								enable: true,
								h_offset: 0,
								v_offset: 30,
								blur: 50,
								spread: 0,
								inset: false,
								color: { color: 'rgba(0, 0, 0, 0.1)' }
							}
						}) => {
							let value = maybePromoteScalarValueIntoResponsive(
								footerShadow
							)

							if (
								!has_reveal_effect.desktop &&
								!has_reveal_effect.tablet &&
								!has_reveal_effect.mobile
							) {
								return 'CT_CSS_SKIP_RULE'
							}

							if (!has_reveal_effect.desktop) {
								value.desktop = 'none'
							}

							if (!has_reveal_effect.tablet) {
								value.tablet = 'none'
							}

							if (!has_reveal_effect.mobile) {
								value.mobile = 'none'
							}

							return value
						}
					}
				]
			)
		}
	}
)

ctEvents.on('ct:footer:sync:item:global', changeDescriptor => {
	if (changeDescriptor.optionId === 'has_reveal_effect') {
		const footer = document.querySelector('.site-footer')

		let revealComponents = []

		if (changeDescriptor.optionValue.desktop) {
			revealComponents.push('desktop')
		}

		if (changeDescriptor.optionValue.tablet) {
			revealComponents.push('tablet')
		}

		if (changeDescriptor.optionValue.mobile) {
			revealComponents.push('mobile')
		}

		document.body.classList.remove('ct-footer-reveal')

		if (revealComponents.length > 0) {
			document.body.classList.add('ct-footer-reveal')
		}
	}
})
