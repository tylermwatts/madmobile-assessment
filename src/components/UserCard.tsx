/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react'
import { faSave, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, useEffect, useState } from 'react'
import { User } from './UserCardContainer'

type EditInputProps = {
	value: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	id: string
	labelText: string
}

const EditInput: React.FunctionComponent<EditInputProps> = ({ value, onChange, id, labelText }) => {
	const inputContainerStyles = css`
		display: flex;
		justify-content: space-between;
		margin: 0.5rem;
		input {
			border-radius: 0.25rem;
			padding: 0.25rem;
			border: 1px solid #1a1a1a;
			margin-left: 0.5rem;
		}
	`
	return (
		<div css={inputContainerStyles}>
			<label htmlFor={id}>{labelText}: </label>
			<input id={id} type='text' value={value} onChange={onChange} />
		</div>
	)
}

type EditFieldsProps = {
	userInfo: any
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const EditFields: React.FunctionComponent<EditFieldsProps> = ({ userInfo, onChange }) => {
	const fields = {
		firstName: 'First Name',
		lastName: 'Last Name',
		email: 'Email',
		phone: 'Phone #',
		city: 'City',
		state: 'State',
	}
	return (
		<div
			css={css`
				@media only screen and (min-width: 500px) {
					max-width: fit-content;
					margin: auto;
				}
			`}
		>
			{(Object.keys(fields) as Array<keyof Omit<User, 'picture'>>).map((k) => (
				<EditInput
					key={`input-${k}`}
					value={userInfo[k]}
					onChange={onChange}
					id={k}
					labelText={fields[k]}
				/>
			))}
		</div>
	)
}

const cardBodyStyles: SerializedStyles = css`
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	text-align: center;
	margin: 1rem;
	border-radius: 0.5rem;
	background-color: #f0f0f0;
	min-height: 24rem;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
`

const avatarStyles: (isEditing: boolean) => SerializedStyles = (isEditing: boolean) => css`
	position: absolute;
	top: ${isEditing ? '.5rem' : '5rem'};
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 100%;
	height: ${isEditing ? '6rem' : '10rem'};
	width: ${isEditing ? '6rem' : '10rem'};
	border: 4px solid white;
`

const UserCard: React.FunctionComponent<{user: User}> = ({user}) => {
	const [userInfo, setUserInfo] = useState<User>({
		...user,
	})
	const [isEditing, setIsEditing] = useState<boolean>(false)

	useEffect(() => {
		// update user info when props.user changes
		setUserInfo({ ...user })
	}, [user])

	const onChange = ({ currentTarget: { id, value } } : { currentTarget: { id: string, value: string } }) => {
		const updated = { ...userInfo, [id]: value }
		setUserInfo(updated)
	}

	return (
		<div css={cardBodyStyles}>
			<img
				css={() => avatarStyles(isEditing)}
				alt='avatar'
				src={userInfo.picture}
			/>
			<div
				css={css`
					position: absolute;
					top: 1rem;
					left: 1rem;
				`}
			>
				<button
					css={css`
						padding: 0.5rem;
						background: none;
						border: none;
						border-radius: 0.5rem;
						outline: inherit;
						color: #f0f0f0;
						font-size: 1.5rem;
						:focus {
							outline: #f0f0f0 auto 1px;
						}
					`}
					onClick={() => setIsEditing(!isEditing)}
				>
					{isEditing ? (
						<FontAwesomeIcon icon={faSave} />
					) : (
						<FontAwesomeIcon icon={faUserEdit} />
					)}
				</button>
			</div>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					background-color: #3949ab;
					border-radius: 0.5rem 0.5rem 0 0;
					min-height: 125px;
				`}
			>
				{!isEditing && (
					<p
						css={css`
							color: #f0f0f0;
							font-size: 1.325rem;
						`}
					>
						{`${userInfo.firstName} ${userInfo.lastName}`}
					</p>
				)}
			</div>
			<div
				css={
					isEditing
						? css`
								margin: auto 0.5rem;
						  `
						: css`
								margin-top: auto;
								text-align: center;
						  `
				}
			>
				{isEditing ? (
					<EditFields userInfo={userInfo} onChange={onChange} />
				) : (
					<div
						css={css`
							p {
								color: #1a1a1a;
							}
						`}
					>
						<p>{userInfo.email}</p>
						<p>{userInfo.phone}</p>
						<p>{`${userInfo.city}, ${userInfo.state}`}</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default UserCard
