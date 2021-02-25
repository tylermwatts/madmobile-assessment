/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'

const styles = css`
	display: flex;
	flex-direction: column;
	@media only screen and (min-width: 768px) {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	@media only screen and (min-width: 1280px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
`

const UserCardContainer = ({ users }) => {
	const [userArray, setUserArray] = useState(users)
	const [searchText, setSearchText] = useState('')

	useEffect(() => {
		const filterBySearch = () => {
			const updatedUsers = users.filter((u) => {
				return Object.keys(u).some((k) =>
					u[k].toLowerCase().includes(searchText.toLowerCase())
				)
			})
			setUserArray(updatedUsers)
		}
		filterBySearch()
	}, [searchText, users])

	return (
		<div>
			<div
				css={css`
					display: flex;
					align-items: center;
					padding: 1rem;
					background-color: #6b57cf;
				`}
			>
				<label
					css={css`
						margin-right: 1rem;
						color: #f0f0f0;
						font-size: 1.5rem;
					`}
					htmlFor='search'
				>
					Search:
				</label>
				<input
					id='search'
					type='text'
					css={css`
						border-radius: 0.25rem;
						height: 1.5rem;
						width: 50%;
						border: none;
						padding-left: 0.5rem;
						:focus {
							outline: none;
							box-shadow: 0 0 0.5rem 0 #1a1a1a;
						}
					`}
					value={searchText}
					onChange={({ currentTarget: { value } }) => setSearchText(value)}
				/>
			</div>
			<div css={styles}>
				{userArray.map((user, i) => {
					return <UserCard key={`user-${i}`} user={user} />
				})}
			</div>
		</div>
	)
}

export default UserCardContainer
