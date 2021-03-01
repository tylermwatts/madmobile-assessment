import { fireEvent, render } from '@testing-library/react'
import UserCard from '../components/UserCard'

test('Name gets updated', () => {
	const userInfo = {
		email: 'example@example.com',
		city: 'Nashville',
		state: 'TN',
		firstName: 'Tyler',
		lastName: 'Watts',
		phone: '615-555-1234',
		picture:
			'https://i1.wp.com/www.tor.com/wp-content/uploads/2017/01/Batman-Surf07.jpg?w=630&type=vertical&quality=100&ssl=1',
	}

	const { getByLabelText, getByText } = render(<UserCard user={userInfo} />)

	fireEvent.click(getByLabelText('edit'))
	fireEvent.change(getByLabelText(/First Name/i), {
		target: { value: 'Joker' },
	})
	fireEvent.click(getByLabelText('edit'))

	expect(getByText(/Joker Watts/i)).toBeTruthy()
})
