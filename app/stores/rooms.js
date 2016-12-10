import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { API } from '../constants'

class RoomsStore {
	@observable rooms

	constructor () {
		this.rooms = [
			{ admin: 'kelvinosse', name: 'MI LIBRO', avatar: 'http://www.estampas.com/2015/09/14/dross-libro.jpg' },
			{ admin: 'carloscastroy', name: 'La TribuAnal', avatar: 'https://yt3.ggpht.com/-CT9iQjmWakE/AAAAAAAAAAI/AAAAAAAAAAA/Q-1_HyHxVzY/s900-c-k-no-mo-rj-c0xffffff/photo.jpg' },
			{ admin: 'coconapky', name: 'Segfaults Chillones', avatar: 'http://www.woolic.com/wp-content/uploads/2010/05/bebe-lloron-620x330.jpg' },
			{ admin: 'kelvinosse', name: 'Ffgh is the topic', avatar: 'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/14650543_1441423959218569_1387223375556503727_n.jpg?oh=d86e468845ce1c699c5ca840f1e731b6&oe=58F494E6' },
			{ admin: 'coconapky', name: 'Me Gusta +2QLo', avatar: 'http://www1.pictures.zimbio.com/fp/Stars+Set+American+Horror+Story+2Qlo-Ruxye3x.jpg' },
			{ admin: 'kelvinosse', name: 'Mara Comida', avatar: 'https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg' },
			{ admin: 'astrothing', name: '#ForgetRoberto', avatar: 'https://cdn.thisiswhyimbroke.com/images/dog-mask-alt-640x533.jpg' },
		]
	}

}

export default new RoomsStore