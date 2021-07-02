import {
	createElement,
	Component,
	Fragment,
	createContext,
	useRef,
	useContext,
	useState
} from '@wordpress/element'
import SinglePicker from './color-picker/single-picker'
import OutsideClickHandler from './react-outside-click-handler'
import { normalizeCondition, matchValuesWithCondition } from 'match-conditions'

export const ColorPickerContext = createContext({ modalWrapper: null })

const ColorPicker = ({ option, values, value, onChange }) => {
	const [{ isPicking, isTransitioning }, setState] = useState({
		isPicking: null,
		isTransitioning: null
	})

	const { modalWrapper } = useContext(ColorPickerContext)

	return (
		<OutsideClickHandler
			useCapture={false}
			display="inline-block"
			disabled={!isPicking}
			className="ct-color-picker-container"
			additionalRefs={[modalWrapper]}
			onOutsideClick={() => {
				setState(({ isPicking }) => ({
					isPicking: null,
					isTransitioning: isPicking
				}))
			}}>
			{option.pickers
				.filter(
					picker =>
						!picker.condition ||
						matchValuesWithCondition(
							normalizeCondition(picker.condition),
							values
						)
				)
				.map(picker => (
					<SinglePicker
						picker={picker}
						key={picker.id}
						option={option}
						isPicking={isPicking}
						isTransitioning={isTransitioning}
						onPickingChange={isPicking =>
							setState({
								isTransitioning: picker.id,
								isPicking
							})
						}
						stopTransitioning={() =>
							setState(state => ({
								...state,
								isTransitioning: false
							}))
						}
						onChange={newPicker =>
							onChange({
								...value,
								[picker.id]: newPicker
							})
						}
						value={value[picker.id] || option.value[picker.id]}
					/>
				))}
		</OutsideClickHandler>
	)
}

ColorPicker.ControlEnd = () => {
	const { modalWrapper } = useContext(ColorPickerContext)

	return <div ref={modalWrapper} className="ct-color-modal-wrapper" />
}

ColorPicker.MetaWrapper = ({ getActualOption }) => {
	const ref = useRef()

	return (
		<ColorPickerContext.Provider
			value={{
				modalWrapper: ref
			}}>
			{getActualOption()}
		</ColorPickerContext.Provider>
	)
}

export default ColorPicker
