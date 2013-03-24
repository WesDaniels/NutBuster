				var cities = new L.LayerGroup();

				obj.forEach(function(nm) {
					alert(obj);
				})

				L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities),
				L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities),
				L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities),
				L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);

				var latlngs=new Array(); 
				latlngs[0] = new L.LatLng(39.61, -105.02);
				latlngs[1] = new L.LatLng(39.74, -104.99);
				
				
				var cmAttr = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
					cmUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/{styleId}/256/{z}/{x}/{y}.png';

				var minimal   = L.tileLayer(cmUrl, {styleId: 22677, attribution: cmAttr}),
					midnight  = L.tileLayer(cmUrl, {styleId: 999,   attribution: cmAttr}),
					motorways = L.tileLayer(cmUrl, {styleId: 46561, attribution: cmAttr});

				var map = L.map('map', {
					center: [39.73, -104.99],
					zoom: 10,
					layers: [minimal, motorways, cities]
				});
				
				var baseLayers = {
					"Minimal": minimal,
					"Night View": midnight
				};

				var overlays = {
					"Motorways": motorways,
					"Cities": cities
				};

				L.control.layers(baseLayers, overlays).addTo(map);

				
				// create a red polyline from an arrays of LatLng points
				var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

				// zoom the map to the polyline
				map.fitBounds(polyline.getBounds());