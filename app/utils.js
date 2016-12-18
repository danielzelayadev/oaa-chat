export const trimTime = jsonDate => {
	return jsonDate.slice(0, jsonDate.length - 14)
}

export const getUserProfileProps = user => ({
	avatar: user.avatar,
	details: [
		{ name: "Email", value: user.email },
		{ name: "Username", value: user.username },
		{ name: "Name", value: `${user.firstname} ${user.lastname}` },
		{ name: "Age", value: user.age },
		{ name: "Birthday", value: user.birthday }
	]
})

export const getRoomProfileProps = room => ({
	avatar: room.avatar,
	details: [
		{ name: "Admin", value: room.admin }
	]
})

export const drawerIsOpen = (id, drawers) => id > 0 && id <= drawers

export const auth = token => ({
  headers: { 'Authorization': `Token ${token}` }
})

export const cache = (store, data) => window.localStorage[store] = JSON.stringify(data)

export const get = store => {
	const data = window.localStorage[store]
	return data && data !== "" && data !== `""` ? JSON.parse(data) : null
}