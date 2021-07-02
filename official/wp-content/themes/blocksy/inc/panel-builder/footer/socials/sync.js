import ctEvents from 'ct-events'
import {
	getCache,
	handleResponsiveSwitch
} from '../../../../static/js/customizer/sync/helpers'
import { responsiveClassesFor } from '../../../../static/js/customizer/sync/helpers'

ctEvents.on(
	'ct:footer:sync:collect-variable-descriptors',
	variableDescriptors => {
		variableDescriptors['socials'] = {
			socialsIconSize: {
				selector: '.ct-footer-socials',
				variable: 'iconSize',
				responsive: true,
				unit: 'px'
			},

			socialsIconSpacing: {
				selector: '.ct-footer-socials',
				variable: 'spacing',
				responsive: true,
				unit: 'px'
			},

			footerSocialsAlignment: {
				selector: '[data-column="socials"]',
				variable: 'horizontal-alignment',
				responsive: true,
				unit: ''
			},

			footerSocialsVerticalAlignment: {
				selector: '[data-column="socials"]',
				variable: 'vertical-alignment',
				responsive: true,
				unit: ''
			},

			footerSocialsIconColor: [
				{
					selector: '.ct-footer-socials [data-color="custom"]',
					variable: 'linkInitialColor',
					type: 'color:default',
					responsive: true
				},

				{
					selector: '.ct-footer-socials [data-color="custom"]',
					variable: 'linkHoverColor',
					type: 'color:hover',
					responsive: true
				}
			],

			footerSocialsIconBackground: [
				{
					selector: '.ct-footer-socials [data-color="custom"]',
					variable: 'backgroundColor',
					type: 'color:default',
					responsive: true
				},

				{
					selector: '.ct-footer-socials [data-color="custom"]',
					variable: 'backgroundColorHover',
					type: 'color:hover',
					responsive: true
				}
			],

			footerSocialsMargin: {
				selector: '.ct-footer-socials',
				type: 'spacing',
				variable: 'margin',
				responsive: true
				// important: true
			},

			socialsLabelVisibility: handleResponsiveSwitch({
				selector: '.ct-footer-socials .ct-label'
			})
		}
	}
)

ctEvents.on(
	'ct:footer:sync:item:socials',
	({ optionId, optionValue, values }) => {
		const selector = '.site-footer [data-column="socials"]'

		const el = document.querySelector(selector).firstElementChild

		if (optionId === 'socialsLabelVisibility') {
			if (
				optionValue.desktop ||
				optionValue.tablet ||
				optionValue.mobile
			) {
				;[...el.querySelectorAll('span.ct-label')].map(el =>
					el.setAttribute('hidden', '')
				)
			} else {
				;[...el.querySelectorAll('span.ct-label')].map(el =>
					el.removeAttribute('hidden')
				)
			}
		}

		if (optionId === 'socialsType' || optionId === 'socialsFillType') {
			const box = el.querySelector('.ct-social-box')
			box.dataset.type = values.socialsType

			box.removeAttribute('data-fill')

			if (values.socialsType !== 'simple') {
				box.dataset.fill = values.socialsFillType || 'solid'
			}
		}

		if (optionId === 'socialsIconSize') {
			el.querySelector('.ct-social-box').dataset.size =
				values.socialsIconSize
		}

		if (optionId === 'footerSocialsColor') {
			el.querySelector('.ct-social-box').dataset.color = optionValue
		}

		if (optionId === 'footer_socials') {
			const newHtml = getCache().querySelector(
				`.ct-customizer-preview-cache [data-id="socials-general-cache"]`
			).innerHTML

			const cache = document.createElement('div')
			cache.innerHTML = newHtml

			el.querySelector('.ct-social-box').innerHTML = ''

			optionValue.map(({ id, enabled }) => {
				if (!enabled) return

				el.querySelector('.ct-social-box').appendChild(
					cache.querySelector(`[data-network=${id}]`)
				)
			})
		}

		if (
			optionId === 'footer_socials' ||
			optionId === 'socialsLabelVisibility'
		) {
			if (
				values.socialsLabelVisibility.desktop ||
				values.socialsLabelVisibility.tablet ||
				values.socialsLabelVisibility.mobile
			) {
				;[...el.querySelectorAll('span.ct-label')].map(el =>
					el.removeAttribute('hidden')
				)
			} else {
				;[...el.querySelectorAll('span.ct-label')].map(el =>
					el.setAttribute('hidden', '')
				)
			}
		}
	}
)
