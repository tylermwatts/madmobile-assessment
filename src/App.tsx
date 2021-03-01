import { createContext, useEffect, useState } from 'react'
import Container from './components/Container'

export type User = {
	email: string
	id: string
	city: string
	state: string
	firstName: string
	lastName: string
	phone: string
	picture: string
}

const defaultValue: { users: User[]; setUsers: Function } = {
	users: [],
	setUsers: () => {},
}

export const UserContext = createContext(defaultValue) // Using context to pass users and setUsers to the UserCard component for updating

export default function App() {
	const [users, setUsers] = useState<User[]>([])

	useEffect(() => {
		const fetchUsers: () => Promise<void> = async () => {
			const userObjs = await fetch(
				'https://randomuser.me/api/?nat=us,ca,gb,au,nz&results=50&inc=name,picture,email,phone,location,login&noinfo'
			)
				.then((response) => response.json())
				.then(({ results }) => results)
			const users: User[] = userObjs.map((u: any) => {
				const {
					email,
					login: { uuid },
					location: { city, state },
					name: { first, last },
					phone,
					picture: { large: picture },
				} = u
				return {
					email,
					id: uuid,
					city,
					state,
					firstName: first,
					lastName: last,
					phone,
					picture,
				}
			})
			setUsers([
				{
					email: 'tyler.watts@example.com',
					id: '54ea12c4-fb6d-48a6-a3b0-b41c379785b6',
					city: 'Nashville',
					state: 'Tennessee',
					firstName: 'Tyler',
					lastName: 'Watts',
					phone: '615-555-1234',
					picture:
						'https://i1.wp.com/www.tor.com/wp-content/uploads/2017/01/Batman-Surf07.jpg?w=630&type=vertical&quality=100&ssl=1',
				},
				...users,
			])
		}
		// hydrate state with users from API
		fetchUsers()
	}, [])

	return (
		<div className='App'>
			<UserContext.Provider value={{ users, setUsers }}>
				{users && <Container users={users} />}
			</UserContext.Provider>
		</div>
	)
}
