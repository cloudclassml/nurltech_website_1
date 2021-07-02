import {
	createElement,
	Component,
	useState,
	useContext,
	Fragment
} from '@wordpress/element'
import DraggableItems from './DraggableItems'
import cls from 'classnames'
import Panel, { PanelMetaWrapper } from '../../../options/options/ct-panel'
import { getValueFromInput } from '../../../options/helpers/get-value-from-input'
import { __ } from 'ct-i18n'

import { Slot } from '@wordpress/components'
import Switch from '../../../options/options/ct-switch'

import OptionsPanel from '../../../options/OptionsPanel'

import BuilderTemplates from './builder-sidebar/Templates'
import SecondaryItems from './builder-sidebar/SecondaryItems'
import InvisiblePanels from './builder-sidebar/InvisiblePanels'

import { DragDropContext } from './BuilderRoot'

import classnames from 'classnames'

const AvailableItems = ({
	allBuilderSections,
	builderValue,
	builderValueDispatch,
	inlinedItemsFromBuilder
}) => {
	// items | options
	const [currentTab, setCurrentTab] = useState('items')

	const { builderValueCollection } = useContext(DragDropContext)

	const secondaryItems =
		ct_customizer_localizations.header_builder_data.secondary_items.header
	const allItems = ct_customizer_localizations.header_builder_data.header

	const headerOptions =
		ct_customizer_localizations.header_builder_data.header_data
			.header_options

	return (
		<div className="ct-available-items">
			<Slot name="PlacementsBuilderTemplates">
				{fills =>
					fills.length === 0 ? (
						<Fragment>
							<h3 className="ct-title">
								{__('Select Header', 'blocksy')}
							</h3>

							<div className="ct-instance-selector">
								<BuilderTemplates
									allBuilderSections={allBuilderSections}
									builderValue={builderValue}
									builderValueDispatch={builderValueDispatch}
								/>

								<span
									className={classnames(
										'ct-instance-button-global',
										{
											active:
												builderValueCollection.current_section ===
												builderValueCollection.__forced_static_header__
										}
									)}
									onClick={() => {
										builderValueDispatch({
											type: 'MARK_HEADER_AS_GLOBAL',
											payload: {}
										})
									}}>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16">
										<path d="M16,0v6h-6l2.2-2.2C11.1,2.6,9.6,2,8,2C5.1,2,2.6,4.1,2.1,7h-2c0,0,0-0.1,0-0.1C0.6,2.9,4,0,8,0c2.1,0,4.2,0.9,5.6,2.4L16,0z M8,14c-1.7,0-3.2-0.6-4.4-1.6L6,10H0v6l2.2-2.2C3.7,15.2,5.8,16,8,16c4.1,0,7.4-3.1,7.9-7h-2C13.4,11.8,11,14,8,14z" />
									</svg>

									<i className="ct-tooltip-top">
										{builderValueCollection.current_section ===
										builderValueCollection.__forced_static_header__
											? __('Is Global', 'blocksy')
											: __('Make Global', 'blocksy')}
									</i>
								</span>
							</div>

							<div className="ct-option-description">
								{__(
									'Set one of these headers as a global one. You can edit them idependently.',
									'blocksy'
								)}
							</div>
						</Fragment>
					) : (
						fills
					)
				}
			</Slot>

			<div className="ct-tabs">
				<ul>
					{['items', 'options'].map(tab => (
						<li
							key={tab}
							onClick={e => {
								e.preventDefault()
								setCurrentTab(tab)
							}}
							className={cls({
								active: tab === currentTab
							})}>
							{
								{
									items: __('Elements', 'blocksy'),
									options: __('General', 'blocksy')
								}[tab]
							}
						</li>
					))}
				</ul>

				<div className="ct-current-tab">
					<SecondaryItems
						builderValue={builderValue}
						builderValueDispatch={builderValueDispatch}
						inlinedItemsFromBuilder={inlinedItemsFromBuilder}
						displayList={currentTab === 'items'}
					/>

					{currentTab === 'options' && (
						<OptionsPanel
							onChange={(optionId, optionValue) => {
								builderValueDispatch({
									type: 'BUILDER_GLOBAL_SETTING_ON_CHANGE',
									payload: {
										optionId,
										optionValue,
										values: getValueFromInput(
											headerOptions,
											Array.isArray(builderValue.settings)
												? {}
												: builderValue.settings || {}
										)
									}
								})
							}}
							options={headerOptions}
							value={builderValue.settings || {}}
						/>
					)}
				</div>
			</div>

			<InvisiblePanels
				builderValue={builderValue}
				builderValueDispatch={builderValueDispatch}
			/>
		</div>
	)
}

export default AvailableItems
