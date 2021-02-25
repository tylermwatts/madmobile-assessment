import { useEffect, useState } from 'react'
import UserCardContainer from './components/UserCardContainer'

export default function App() {
	const [users, setUsers] = useState(null)

	const fetchUsers = async () => {
		const userObjs = await fetch(
			'https://randomuser.me/api/?results=25&inc=name,picture,email,phone,location'
		)
			.then((response) => response.json())
			.then(({ results }) => results)
		const users = userObjs.map((u) => {
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
				name: `${first} ${last}`,
				phone,
				picture,
			}
		})
		setUsers(users)
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	return (
		<div className='App'>{users && <UserCardContainer users={users} />}</div>
	)
}
