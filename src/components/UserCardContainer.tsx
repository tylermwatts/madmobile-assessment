/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { useEffect, useState } from 'react';
import SearchAndSortHeader from './SearchAndSort';
import UserCard from './UserCard';

export type User = {
	email: string,
	city: string,
	state: string,
	firstName: string,
	lastName: string,
	phone: string,
	picture: string,
}

const cardContainerStyles: SerializedStyles = css`
	display: flex;
	flex-direction: column;
	@media only screen and (min-width: 768px) {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	@media only screen and (min-width: 1280px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media only screen and (min-width: 1600px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`

const UserCardContainer: React.FunctionComponent<{users: User[]}> = ({ users }) => {
	const [userArray, setUserArray] = useState<User[]>(users)
	const [searchText, setSearchText] = useState<string>('')
	const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>('ascending')
	const [sortCriteria, setSortCriteria] = useState<keyof User>('lastName')

	useEffect(() => {
		const filterSortAndUpdate: () => void = () => {
			const updatedUsers: User[] = users
				.filter((u: User) => {
					const {picture, phone, ...user} = u
					// filter users based on text input matching case-insensitive values on any property of User, ignoring picture URL
					return (Object.keys(user) as Array<keyof Omit<User, 'picture' | 'phone'>>).some((k: keyof Omit<User, 'picture'| 'phone'>) => {
						return user[k].toLowerCase().includes(searchText.toLowerCase())
					})
				})
				.sort((a: User, b: User) => {
					// sort users based on dynamic sort criteria and sort order
					const valueA: string = a[sortCriteria].toLowerCase()
					const valueB: string = b[sortCriteria].toLowerCase()
					return sortOrder === 'ascending'
						? valueA < valueB
							? -1
							: 1
						: valueA < valueB
						? 1
						: -1
				})
			setUserArray(updatedUsers)
		}
		filterSortAndUpdate()
		// user list gets updated any time searchText, props.users, sortCriteria, or sortOrder are changed
	}, [searchText, users, sortCriteria, sortOrder])

	return (
		<>
			<SearchAndSortHeader
				searchText={searchText}
				setSearchText={setSearchText}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
				sortCriteria={sortCriteria}
				setSortCriteria={setSortCriteria}
			/>
			<div css={cardContainerStyles}>
				{userArray.map((user: User, i: number) => {
					return <UserCard key={`user-${i}`} user={user} />
				})}
			</div>
		</>
	)
}

export default UserCardContainer
