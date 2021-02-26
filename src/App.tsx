import { useEffect, useState } from 'react'
import UserCardContainer, { User } from './components/UserCardContainer'

export default function App() {
	const [users, setUsers] = useState<User[]>([])

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
		setUsers(users)
	}

	useEffect(() => {
		// hydrate state with users from API
		fetchUsers()
	}, [])

	return (
		<div className='App'>{users && <UserCardContainer users={users} />}</div>
	)
}
