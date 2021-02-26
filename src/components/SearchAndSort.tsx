/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react'

const searchBarStyles: SerializedStyles = css`
	border-radius: 0.25rem;
	height: 3rem;
	font-size: 1.5rem;
	width: 100%;
	border: none;
	padding-left: 0.5rem;
	:focus {
		outline: none;
		box-shadow: 0 0 0.5rem 0 #1a1a1a;
	}
	@media only screen and (min-width: 768px) {
		width: 50%;
		margin: auto;
	}
`

const radioContainerStyles: SerializedStyles = css`
	margin: 0.5rem;
`

type Props = {
	searchText: string
	setSearchText: Function
	sortOrder: string
	setSortOrder: Function
	sortCriteria: string
	setSortCriteria: Function
}

const SearchAndSort: React.FunctionComponent<Props> = ({
	searchText,
	setSearchText,
	sortOrder,
	setSortOrder,
	sortCriteria,
	setSortCriteria
}) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				padding: 1rem;
				background-color: #00227b;
			`}
		>
			<div
				css={css`
					display: flex;
					align-items: center;
				`}
			>
				<input
					placeholder='Search Contacts'
					id='search'
					type='text'
					css={searchBarStyles}
					value={searchText}
					onChange={({ currentTarget: { value } }) => setSearchText(value)}
				/>
			</div>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					margin-top: 0.5rem;
					@media only screen and (min-width: 768px) {
						width: 50%;
						margin: auto;
					}
				`}
			>
				<label
					htmlFor='sortBy'
					css={css`
						text-align: center;
						color: #f0f0f0;
						font-size: 1.5rem;
						margin: 0.5rem auto;
					`}
				>
					Sort Contacts:
				</label>
				<div
					css={css`
						margin: 0.5rem 0;
						background-color: #3949ab;
						box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
					`}
				>
					<select
						id='sortBy'
						css={css`
							border-radius: 0.25rem;
							width: 100%;
							padding: 0.5rem;
							font-size: 1.25rem;
						`}
						value={sortCriteria}
						onChange={({ currentTarget: { value } }) => setSortCriteria(value)}
					>
						<option value='lastName'>Last name</option>
						<option value='firstName'>First name</option>
						<option value='city'>City</option>
						<option value='state'>State</option>
					</select>
					<div
						css={css`
							display: flex;
							flex-direction: column;
							justify-content: space-evenly;
							margin: 0.5rem 0;
							padding: 0.5rem;
							color: #f0f0f0;
							@media only screen and (min-width: 768px) {
								flex-direction: row;
							}
						`}
					>
						<fieldset
							css={css`
								border: none;
								width: 100%;
							`}
						>
							<legend
								css={css`
									text-decoration: underline;
									font-size: 1.25rem;
								`}
							>
								Sort Oder
							</legend>
							<div css={radioContainerStyles}>
								<input
									css={css`
										transform: scale(1.5);
										margin: 0 0.5rem;
									`}
									type='radio'
									id='ascending'
									name='sortOrder'
									value='ascending'
									checked={sortOrder === 'ascending'}
									onChange={({ currentTarget: { value } }) =>
										setSortOrder(value)
									}
								/>
								<label
									css={css`
										font-weight: bold;
									`}
									htmlFor='ascending'
								>
									Alphabetical
								</label>
							</div>
							<div css={radioContainerStyles}>
								<input
									css={css`
										transform: scale(1.5);
										margin: 0 0.5rem;
									`}
									type='radio'
									id='descending'
									name='sortOrder'
									value='descending'
									checked={sortOrder === 'descending'}
									onChange={({ currentTarget: { value } }) =>
										setSortOrder(value)
									}
								/>
								<label
									css={css`
										font-weight: bold;
									`}
									htmlFor='descending'
								>
									Reverse Alphabetical
								</label>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchAndSort
