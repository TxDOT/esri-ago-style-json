# esri-ago-style-json
ArcGIS Online vector tile basemap service Style JSON builder for default layer URL definition with relative paths.

## Overview
Vector tile basemaps published to, and hosted by ESRI ArcGIS Online are accessed via their generic service URL, e.g. `https://tiles.arcgis.com/tiles/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Vector_Tile_Basemap/VectorTileServer` but when coding web maps within Javascript applications this requires using the official ESRI JS API or plugins for a Open Source or MVT standard web mapping GL.

A basemap service URL like this may contain multiple styled maps to used in creating web maps. Non-default ones work as expected in Open Source web mapping GL packages because they can be accessed using their unique service layer ID within an alternative URL, e.g. `https://www.arcgis.com/sharing/rest/content/items/507a9905e7154ce484617c7327ee8bc4/resources/styles/root.json`, returning standard Vector Tile style JSON. Unfortunately, the default map of the service cannot be utilized with this serivce layer ID URL, e.g. `https://www.arcgis.com/sharing/rest/content/items/360b5af61e614182a2db9e088193be8d/resources/styles/root.json`, because it returns a 404 error; while only their generic service URL can be used to access this map. Furthermore, constructing a standard '.../resources/styles/root.json' URL using the generic service URL, e.g. `https://tiles.arcgis.com/tiles/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Vector_Tile_Basemap/VectorTileServer/resources/styles/root.json`, we can access the default map vector tile style JSON but it utilizes relative paths and fails to render wtih web map GL packages.

In summary, the cause of issue for accessing the default map in the service:
1. The generic service URL returns JSON metadata and not a standard JSON vector tile style object
2. The alternative service layer ID URL (for the default map only) returns a 404 error
3. The generic service URL permits access to the '/resources/styles/root.json' object but fails due to relative paths

This package serves to resolve this problem by accepting the generic service URL for an ESRI ArcGIS Online Vector Tile Service and returning an web map GL usable styles object. 

## Usage

### Install
```
npm install @txdot-gis/esri-ago-style-json --save
```

### Basic Usage
```javascript
import { Map } from 'maplibre-gl'
import esriAgoStyleJson from '@txdot-gis/esri-ago-style-json'

function buildMap() {
    const url = 'https://tiles.arcgis.com/tiles/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Vector_Tile_Basemap/VectorTileServer'
    esriAgoStyleJson(url)
    .then(styleJson => {
		const map = new Map({
			container: 'map',
			style: styleJson,
			center: [-99.341389, 31.132222],
            zoom: 9
		})
	})
}
```

### Response
Returns `Promise` object which resolves to the [MVT Standard](https://github.com/mapbox/vector-tile-spec) style object, or `Error` object when failed to retrieve or parse service JSON.

Once resolved, the style object can be used for the `style` property when initiating a Map object.
