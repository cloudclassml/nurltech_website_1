import {
	createElement,
	Component,
	useState,
	useContext,
	Fragment
} from '@wordpress/element'

import { Slot } from '@wordpress/components'

import cls from 'classnames'
import Select from '../../../../options/options/ct-select'
import { __ } from 'ct-i18n'
import { DragDropContext } from '../BuilderRoot'

const BuilderTemplates = ({
	allBuilderSections,
	builderValue,
	builderValueDispatch
}) => {
	const secondaryItems =
		ct_customizer_localizations.header_builder_data.secondary_items.header
	const allItems = ct_customizer_localizations.header_builder_data.header

	const { option, builderValueCollection } = useContext(DragDropContext)

	const allSections = !option.value.sections.find(
		({ id }) => id.indexOf('ct-custom') > -1
	)
		? allBuilderSections.sections.filter(
				({ id }) => id.indexOf('ct-custom') === -1
		  )
		: allBuilderSections.sections

	return (
		<Select
			onChange={id =>
				builderValueDispatch({
					type: 'PICK_BUILDER_SECTION',
					payload: {
						id
					}
				})
			}
			option={{
				placeholder: __('Picker header', 'blocksy'),
				choices: allSections.map(({ name, id }) => ({
					key: id,
					value:
						name ||
						{
							'type-1': __('Default', 'blocksy'),
							'type-2': __('Centered', 'blocksy'),
							'type-3': __('Secondary', 'blocksy')
						}[id] ||
						id
				}))
			}}
			renderItemFor={item => (
				<Fragment>
					<span>{item.value}</span>

					{builderValueCollection.current_section === item.key && (
						<span
							className="ct-global-item"
							title={__('Global header', 'blocksy')}
							onClick={e => {}}>
							{__('Global', 'blocksy')}
						</span>
					)}
				</Fragment>
			)}
			value={builderValue.id}
		/>
	)
}

export default BuilderTemplates
