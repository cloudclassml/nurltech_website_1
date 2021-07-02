import { createElement, Component } from '@wordpress/element'
import classnames from 'classnames'

const ImagePicker = ({
	option: { choices, tabletChoices, mobileChoices },
	option,
	device,
	value,
	onChange
}) => {
	const { className, ...attr } = { ...(option.attr || {}) }

	let deviceChoices = option.choices

	if (device === 'tablet' && tabletChoices) {
		deviceChoices = tabletChoices
	}

	if (device === 'mobile' && mobileChoices) {
		deviceChoices = mobileChoices
	}

	return (
		<ul
			{...attr}
			className={classnames('ct-image-picker', className)}
			{...(option.title && null ? { 'data-title': '' } : {})}>
			{Object.keys(deviceChoices).map(choice => (
				<li
					className={classnames({
						active: choice === value
					})}
					onClick={() => onChange(choice)}
					key={choice}>
					{deviceChoices[choice].src.indexOf('<svg') === -1 ? (
						<img src={deviceChoices[choice].src} />
					) : (
						<span
							dangerouslySetInnerHTML={{
								__html: deviceChoices[choice].src
							}}
						/>
					)}

					{option.title && null && (
						<span>{deviceChoices[choice].title}</span>
					)}

					{deviceChoices[choice].title && (
						<span className="ct-tooltip-top">
							{deviceChoices[choice].title}
						</span>
					)}
				</li>
			))}
		</ul>
	)
}

export default ImagePicker
