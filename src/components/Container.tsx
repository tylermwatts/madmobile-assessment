/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react'
import { useEffect, useState } from 'react'
import SearchAndSortHeader from './SearchAndSortHeader'
import UserCard from './UserCard'

export type User = {
	email: string
	city: string
	state: string
	firstName: string
	lastName: string
	phone: string
	picture: string
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

type SearchableUserProps = keyof Omit<User, 'picture' | 'phone'> // custom type for indexing searchable user properties, ignoring picture URL and phone number

const Container: React.FunctionComponent<{ users: User[] }> = ({ users }) => {
	const [userArray, setUserArray] = useState<User[]>(users) // maintain a working set of users locally so that filtering/sorting does not mutate the original user array
	const [searchText, setSearchText] = useState<string>('')
	const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>(
		'ascending'
	)
	const [sortCriteria, setSortCriteria] = useState<SearchableUserProps>(
		'lastName'
	)

	useEffect(() => {
		const filterSortAndUpdate: () => void = () => {
			const updatedUsers: User[] = users
				.filter((u: User) => {
					// filter users based on text input matching case-insensitive values on any searchable property of User
					const { picture, phone, ...user } = u
					return (Object.keys(user) as Array<SearchableUserProps>).some(
						(k: SearchableUserProps) => {
							return user[k].toLowerCase().includes(searchText.toLowerCase())
						}
					)
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
			<div data-testid='userCardContainer' css={cardContainerStyles}>
				{userArray.map((user: User, i: number) => {
					return <UserCard key={`user-${i}`} user={user} />
				})}
			</div>
		</>
	)
}

export default Container
