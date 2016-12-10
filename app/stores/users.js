import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { API } from '../constants'

class UsersStore {
	@observable users

	constructor () {
		this.users = [
			{ email: 'alekiller21@gmail.com', username: 'alekiller21', firstname: "Alejandro", lastname: "Ferrera", age: 21, birthday: "1995-5-15", avatar: 'http://i.imgur.com/fxjAn60.jpg?2' },
			{ email: 'astrothing@gmail.com', username: 'astrothing', firstname: "Andres", lastname: "Rodriguez", age: 19, birthday: "1997-3-5", avatar: 'http://i.imgur.com/eI876Lg.jpg' },
			{ email: 'kelvinosse@gmail.com', username: 'kelvinosse', firstname: "Kelvin", lastname: "Chinchilla", age: 20, birthday: "1996-4-16", avatar: 'http://data.whicdn.com/images/123313634/superthumb.jpg' },
			{ email: 'david1@gmail.com', username: 'davidch', firstname: "David", lastname: "Chavarria", age: 21, birthday: "1995-6-15", avatar: 'https://s-media-cache-ak0.pinimg.com/564x/0f/96/ca/0f96cacbdd3a845f10c50d70417257de.jpg' },
			{ email: 'coco@gmail.com', username: 'coconapky', firstname: "Brandon", lastname: "Napky", age: 22, birthday: "1994-4-15", avatar: 'http://orig00.deviantart.net/9f3a/f/2014/056/2/5/profile_picture_by_anime_alyssa-d780int.png' },
			{ username: 'David Canales', avatar: 'http://images.akamai.steamusercontent.com/ugc/394423611546967578/0A399E484999EC17F0EE6F90276745BA57BAFABF/' },
			{ username: 'Ahmed Castro', avatar: 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=121862518' },
			{ username: 'Carlos Castro', avatar: 'http://orig06.deviantart.net/3d54/f/2011/364/a/1/profile_picture_by_shironekoix-d4ks8nx.jpg' },
			{ username: 'Roberto Melara', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0r67dMWlWdagBfhGUthQ-PCjTlPrMbFNjOWgylp5k7j5Q_1a' },
			{ username: 'Roberto Melara', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0r67dMWlWdagBfhGUthQ-PCjTlPrMbFNjOWgylp5k7j5Q_1a' },
			{ username: 'Roberto Melara', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0r67dMWlWdagBfhGUthQ-PCjTlPrMbFNjOWgylp5k7j5Q_1a' },
			{ username: 'Roberto Melara', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0r67dMWlWdagBfhGUthQ-PCjTlPrMbFNjOWgylp5k7j5Q_1a' },
		]
	}

}

export default new UsersStore