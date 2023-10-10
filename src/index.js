import axios from 'axios'

async function esriAgoStyleJson(url) {
	return axios.get(`${url}/resources/styles/root.json`)
		.then((res) => {
			const esriJson = { ...res.data }
			const resourcesPath = `${url}/resources`

			const serviceStyle = { ...esriJson }
			serviceStyle.sprite = esriJson.sprite.replace('..', resourcesPath)
			serviceStyle.glyphs = esriJson.glyphs.replace('..', resourcesPath)
			serviceStyle.sources.esri.tiles = [`${url}/tile/{z}/{y}/{x}.pbf`]
			delete serviceStyle.sources.esri.url
			return serviceStyle
		})
}

export default esriAgoStyleJson
