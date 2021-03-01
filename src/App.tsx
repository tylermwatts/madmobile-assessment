import { useEffect, useState } from 'react'
import Container, { User } from './components/Container'

export default function App() {
	const [users, setUsers] = useState<User[]>([])

	useEffect(() => {
		const fetchUsers: () => Promise<void> = async () => {
			const userObjs = await fetch(
				'https://randomuser.me/api/?nat=us,ca,gb,au,nz&results=25&inc=name,picture,email,phone,location&noinfo'
			)
				.then((response) => response.json())
				.then(({ results }) => results)
			const users: User[] = userObjs.map((u: any) => {
				const {
					email,
					location: { city, state },
					name: { first, last },
					phone,
					picture: { large: picture },
				} = u
				return {
					email,
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

	return <div className='App'>{users && <Container users={users} />}</div>
}
