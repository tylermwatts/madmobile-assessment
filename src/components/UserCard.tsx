/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react'
import { faSave, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	ChangeEvent,
	FunctionComponent,
	useContext,
	useEffect,
	useState,
} from 'react'
import { User, UserContext } from '../App'

type EditInputProps = {
	value: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	id: string
	labelText: string
}

const EditInput: FunctionComponent<EditInputProps> = ({
	value,
	onChange,
	id,
	labelText,
}) => {
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
	userInfo: User
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const EditFields: FunctionComponent<EditFieldsProps> = ({
	userInfo,
	onChange,
}) => {
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
			{(Object.keys(fields) as Array<keyof Omit<User, 'id' | 'picture'>>).map(
				(k) => (
					<EditInput
						key={`input-${k}`}
						value={userInfo[k]}
						onChange={onChange}
						id={k}
						labelText={fields[k]}
					/>
				)
			)}
		</div>
	)
}

const cardBodyStyles: SerializedStyles = css`
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	width: 340px;
	text-align: center;
	margin: 1rem auto;
	border-radius: 0.5rem;
	background-color: #f0f0f0;
	min-height: 24rem;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
`

const avatarStyles: (isEditing: boolean) => SerializedStyles = (
	isEditing: boolean
) => css`
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

const UserCard: FunctionComponent<{ user: User }> = ({ user }) => {
	const [userInfo, setUserInfo] = useState<User>({
		...user,
	})
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const userContext = useContext(UserContext)

	useEffect(() => {
		// update displayed info when props.user changes
		setUserInfo({ ...user })
	}, [user])

	const onChange = ({
		currentTarget: { id, value },
	}: {
		currentTarget: { id: string; value: string }
	}) => {
		const updated: User = { ...userInfo, [id]: value }
		setUserInfo(updated)
	}

	const onSave = () => {
		// Context is consumed here to update the user in the original array
		// Normally this would execute a DB call/GraphQL mutation so I did this to shallowly "mock" that behavior
		const filteredUsers = userContext.users.filter((u) => u.id !== userInfo.id)
		userContext.setUsers([userInfo, ...filteredUsers])
		setIsEditing(false)
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
					aria-label='edit'
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
					onClick={isEditing ? () => onSave() : () => setIsEditing(true)}
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
						id='user-name'
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
								padding-bottom: 0.5rem;
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
						<p id='user-email'>{userInfo.email}</p>
						<p id='user-phone'>{userInfo.phone}</p>
						<p id='user-location'>{`${userInfo.city}, ${userInfo.state}`}</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default UserCard
