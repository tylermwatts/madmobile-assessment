import { fireEvent, render } from '@testing-library/react'
import App from '../App'

test('Sorting select gets changed', () => {
	const { getByTestId } = render(<App />)
	const select = getByTestId('sortBySelect')

	expect(select).toHaveDisplayValue('Last name')

	fireEvent.change(select, { target: { value: 'city' } })

	expect(select).toHaveDisplayValue('City')
})

test('Sort order gets changed', () => {
	const { getByLabelText } = render(<App />)

	expect(getByLabelText('Alphabetical')).toBeChecked()
	expect(getByLabelText('Reverse Alphabetical')).not.toBeChecked()

	fireEvent.click(getByLabelText('Reverse Alphabetical'))

	expect(getByLabelText('Alphabetical')).not.toBeChecked()
	expect(getByLabelText('Reverse Alphabetical')).toBeChecked()
})
