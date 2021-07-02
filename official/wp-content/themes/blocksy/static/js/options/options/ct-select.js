import { createElement, Component, Fragment } from '@wordpress/element'
import { maybeTransformUnorderedChoices } from '../helpers/parse-choices.js'
import Downshift from 'downshift'
import classnames from 'classnames'

const Select = ({
	value,
	option: {
		choices,
		tabletChoices,
		mobileChoices,
		placeholder,
		defaultToFirstItem = true,
		search = false,
		inputClassName = '',
		selectInputStart
	},
	renderItemFor = item => item.value,
	onChange,
	device = 'desktop'
}) => {
	let deviceChoices = choices

	if (device === 'tablet' && tabletChoices) {
		deviceChoices = tabletChoices
	}

	if (device === 'mobile' && mobileChoices) {
		deviceChoices = mobileChoices
	}

	const orderedChoices = maybeTransformUnorderedChoices(deviceChoices)

	if (orderedChoices.length === 0) {
		return null
	}

	let potentialValue =
		value || !defaultToFirstItem
			? value
			: parseInt(value, 10) === 0
			? value
			: orderedChoices[0].key

	return (
		<Downshift
			selectedItem={
				orderedChoices.find(({ key }) => key === potentialValue) ||
				!defaultToFirstItem
					? potentialValue
					: orderedChoices[0].key
			}
			onChange={selection => onChange(selection)}
			itemToString={item =>
				item && orderedChoices.find(({ key }) => key === item)
					? orderedChoices.find(({ key }) => key === item).value
					: ''
			}>
			{({
				getInputProps,
				getItemProps,
				getLabelProps,
				getMenuProps,
				isOpen,
				inputValue,
				highlightedIndex,
				selectedItem,
				openMenu,
				toggleMenu
			}) => (
				<div className={classnames('ct-select-input', inputClassName)}>
					{selectInputStart && selectInputStart()}
					<input
						{...getInputProps({
							// onFocus: () => openMenu(),
							onClick: () => toggleMenu()
						})}
						placeholder={placeholder || 'Select value...'}
						disabled={orderedChoices.length === 0}
						readOnly={!search}
					/>

					{isOpen && (
						<div
							{...getMenuProps({
								className: 'ct-select-dropdown'
							})}>
							{orderedChoices
								.filter(
									item =>
										!inputValue ||
										(orderedChoices.find(
											({ key }) =>
												key.toString() ===
												selectedItem.toString()
										) &&
											orderedChoices.find(
												({ key }) =>
													key.toString() ===
													selectedItem.toString()
											).value === inputValue) ||
										item.value
											.toLowerCase()
											.includes(inputValue.toLowerCase())
								)
								.map((item, index) => (
									<Fragment key={index}>
										{item.group &&
											(index === 0 ||
												orderedChoices[index - 1]
													.group !==
													orderedChoices[index]
														.group) && (
												<div
													className="ct-select-dropdown-group"
													key={`${index}-group`}>
													{item.group}
												</div>
											)}
										<div
											{...getItemProps({
												key: item.key,
												index,
												item: item.key,
												className: classnames(
													'ct-select-dropdown-item',
													{
														active:
															highlightedIndex ===
															index,
														selected:
															selectedItem ===
															item.key
													}
												)
											})}>
											{renderItemFor(item)}
										</div>
									</Fragment>
								))}
						</div>
					)}
				</div>
			)}
		</Downshift>
	)
}

export default Select
