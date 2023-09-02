mapboxgl.accessToken = mapToken

const point = campground.geometry.coordinates.length
   ? campground.geometry.coordinates
   : [139.5577317304603, 35.70407437075822]

const map = new mapboxgl.Map({
   container: "map", // container ID
   style: "mapbox://styles/mapbox/dark-v11", // style URLx
   center: point, // starting position [lng, lat]
   zoom: 9, // starting zoom
})

map.addControl(new mapboxgl.NavigationControl())

const popup = new mapboxgl.Popup().setHTML(campground.properties.popupBody)

new mapboxgl.Marker({ color: "#6F2CF4" }).setLngLat(point).setPopup(popup).addTo(map)
