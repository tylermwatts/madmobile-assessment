/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faSave, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

const cardBodyStyles = css`
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

const avatarStyles = css`
	position: absolute;
	top: 5rem;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 100%;
	height: 10rem;
	width: 10rem;
	border: 4px solid white;
`

const infoTextStyles = css`
	color: #1a1a1a;
`

const inputContainerStyles = css`
	display: flex;
	justify-content: space-between;
	margin: 0.5rem 1rem;
`

const UserCard = (props) => {
	const { name, picture, email, phone, city, state } = props.user

	const [userInfo, setUserInfo] = useState({
		name,
		email,
		phone,
		city,
		state,
	})

	useEffect(() => {
		setUserInfo({ ...props.user })
	}, [props.user])

	const [isEditing, setIsEditing] = useState(false)

	const onChange = ({ currentTarget: { id, value } }) => {
		const updated = { ...userInfo, [id]: value }
		setUserInfo(updated)
	}

	return (
		<div css={cardBodyStyles}>
			<img css={avatarStyles} alt='avatar' src={picture} />
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
					background-color: #6b57cf;
					border-radius: 0.5rem 0.5rem 0 0;
					min-height: 125px;
				`}
			>
				{isEditing ? (
					<div
						css={css`
							display: flex;
							flex-direction: column;
						`}
					>
						<label
							css={css`
								color: #f0f0f0;
								margin-top: 0.25rem;
							`}
							htmlFor='name'
						>
							Name:{' '}
						</label>
						<input
							css={css`
								display: block;
								width: 50%;
								margin: 0.5rem auto;
								font-size: 1.25rem;
							`}
							id='name'
							type='text'
							value={userInfo.name}
							onChange={onChange}
						/>
					</div>
				) : (
					<p
						css={css`
							color: #f0f0f0;
							font-size: 1.5rem;
						`}
					>
						{userInfo.name}
					</p>
				)}
			</div>
			<div
				css={css`
					margin-top: auto;
					text-align: center;
				`}
			>
				{isEditing ? (
					<div
						css={css`
							margin: 1rem;
						`}
					>
						<div css={inputContainerStyles}>
							<label htmlFor='email'>Email: </label>
							<input
								id='email'
								type='text'
								value={userInfo.email}
								onChange={onChange}
							/>
						</div>
						<div css={inputContainerStyles}>
							<label htmlFor='phone'>Phone #: </label>
							<input
								id='phone'
								type='text'
								value={userInfo.phone}
								onChange={onChange}
							/>
						</div>
						<div css={inputContainerStyles}>
							<label htmlFor='city'>City: </label>
							<input
								id='city'
								type='text'
								value={userInfo.city}
								onChange={onChange}
							/>
						</div>
						<div css={inputContainerStyles}>
							<label htmlFor='state'>State: </label>
							<input
								id='state'
								type='text'
								value={userInfo.state}
								onChange={onChange}
							/>
						</div>
					</div>
				) : (
					<>
						<p css={infoTextStyles}>{userInfo.email}</p>
						<p css={infoTextStyles}>{userInfo.phone}</p>
						<p css={infoTextStyles}>{`${userInfo.city}, ${userInfo.state}`}</p>
					</>
				)}
			</div>
		</div>
	)
}

export default UserCard
