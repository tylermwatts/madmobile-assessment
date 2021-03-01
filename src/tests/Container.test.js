import { fireEvent, render } from '@testing-library/react'
import Container from '../components/Container'

test('Searching accurately filters results', () => {
	const users = [
		{
			email: 'tyler.watts@example.com',
			city: 'Nashville',
			state: 'Tennessee',
			firstName: 'Tyler',
			lastName: 'Watts',
			phone: '615-555-1234',
			picture:
				'https://i1.wp.com/www.tor.com/wp-content/uploads/2017/01/Batman-Surf07.jpg?w=630&type=vertical&quality=100&ssl=1',
		},
		{
			email: 'bruce.wayne@example.com',
			city: 'Gotham City',
			state: 'New Jersey',
			firstName: 'Bruce',
			lastName: 'Wayne',
			phone: '615-555-4321',
			picture:
				'https://static.wikia.nocookie.net/batmantheanimatedseries/images/b/b1/PP_20_-_Your_crazy_friend.jpg/revision/latest/scale-to-width-down/340?cb=20150804222402',
		},
		{
			email: 'alfred.pennyworth@example.com',
			city: 'Gotham City',
			state: 'New Jersey',
			firstName: 'Alfred',
			lastName: 'Pennyworth',
			phone: '615-555-5678',
			picture:
				'https://i.pinimg.com/originals/8a/72/b6/8a72b661a6aa5084a691a27320d7577d.png',
		},
	]

	const { getByText, getByPlaceholderText, getByTestId } = render(
		<Container users={users} />
	)

	expect(getByTestId('userCardContainer').children.length).toBe(3)

	fireEvent.change(getByPlaceholderText('Search Contacts'), {
		target: { value: 'bruce' },
	})

	expect(getByTestId('userCardContainer').children.length).toBe(1)
	expect(getByText('Bruce Wayne')).toBeTruthy()

	fireEvent.change(getByPlaceholderText('Search Contacts'), {
		target: { value: 'gotham' },
	})

	expect(getByTestId('userCardContainer').children.length).toBe(2)
	expect(getByText('Alfred Pennyworth')).toBeTruthy()
	expect(getByText('Bruce Wayne')).toBeTruthy()
})
