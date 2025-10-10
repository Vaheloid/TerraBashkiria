//-----------------КОНФИГУРАЦИЯ-------------------//
const OBJECT_TYPES = [
    { name: 'mountains', label: 'Гора', icon: 'Mount' },
    { name: 'waterfalls', label: 'Водопад', icon: 'Vodopad' },
    { name: 'rocks', label: 'Скала', icon: 'Skala' },
    { name: 'caves', label: 'Пещера', icon: 'Peshera' },
    { name: 'mausoleums', label: 'Мавзолей', icon: 'Mavz' },
    { name: 'lakes', label: 'Озеро', icon: 'Ozera' },
    { name: 'reservoirs', label: 'Водохранилище', icon: 'Vh' }
];

//-----------------ИНИЦИАЛИЗАЦИЯ_КАРТЫ-------------------//
var mbUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var real = L.tileLayer(mbUrl);
const map = L.map('map', {
    center: [54.234047, 56.551800],
    zoom: 7,
    layers: [real],
    defaultExtentControl: true,
    zoomControl: true,
});

//-----------------МАРШРУТИЗАЦИЯ-------------------//
var waypoints = [];
var savedLatLng;
var routingControl = L.Routing.control({
    waypoints: window.waypoints,
    position: 'topleft',
    routeWhileDragging: false,
    language: 'ru',
    collapsible: true,
    formatter: new L.Routing.Formatter({ language: 'ru' }),
    createMarker: function () {
        icon: L.icon({
            iconUrl: '../static/images/marker-icon.png',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
            shadowUrl: '../static/images/marker-icon.png',
            shadowSize: [0, 0],
            shadowAnchor: [0, 0]
        })
    },
});

//-----------------КОНТРОЛЫ-------------------//
function createButton(icon, title, onClick) {
    return L.easyButton({
        states: [{
            stateName: 'button',
            icon: `<img src="../static/images/${icon}.png" width="16" height="16">`,
            title: title,
            onClick: onClick
        }]
    }).addTo(map);
}

createButton('table', 'Информация об объектах', () => window.location.href = "/objects_info/");
createButton('route', 'Экскурсионные туры', () => dialog.open());

var scale = L.control.scale();
scale.addTo(map);

//-----------------МАРШРУТЫ-------------------//
const ROUTES = {
    route1: {
        name: 'Водопад Кук-караук и Шихан Торатау',
        waypoints: [
            L.latLng(54.724342, 55.945663),
            L.latLng(53.60129149179728, 56.6844642162323),
            L.latLng(53.55471399279764, 56.0976505279541),
            L.latLng(54.724342, 55.945663)
        ]
    },
    route2: {
        name: 'Однодневный тур «Нарыстау»',
        waypoints: [
            L.latLng(54.724342, 55.945663),
            L.latLng(53.556805, 56.086083),
            L.latLng(53.55471399279764, 56.0976505279541),
            L.latLng(54.724342, 55.945663)
        ]
    }
};

function createRoute(routeKey) {
    dialog.close();
    L.Routing.control({
        waypoints: ROUTES[routeKey].waypoints,
        position: 'topleft',
        routeWhileDragging: true,
        language: 'ru',
        collapsible: true,
        dragging: false,
        addWaypoints: false,
        lineOptions: {
            styles: [{ color: '#cd00cd', opacity: 1, weight: 5 }]
        }
    }).addTo(map);
}

var dialog = L.control.dialog({size: [300, 300], anchor: [250, 250], position: "topleft"})
    .setContent(`<button onClick='createRoute("route1")' class='infoButton'>${ROUTES.route1.name}</button>
                 <button onClick='createRoute("route2")' class='infoButton'>${ROUTES.route2.name}</button>`)
    .addTo(map);
dialog.setLocation([10, 50]);
dialog.hideResize();
dialog.showClose();

//-----------------ИКОНКИ-------------------//
const Icon = L.Icon.extend({ options: { iconSize: [38, 38] } });
const ICONS = {};

OBJECT_TYPES.forEach(type => {
    ICONS[type.name] = {
        normal: new Icon({ iconUrl: `../static/images/icons/${type.icon}.svg` }),
        click: new Icon({ iconUrl: `../static/images/icons/${type.icon}Click.svg` })
    };
});

//-----------------ГРАНИЦЫ_КАРТЫ-------------------//
var bounds = L.latLngBounds([[58.200891, 68.253995], [50.079248, 43.234323]]);
map.setMaxBounds(bounds);
map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: false });
});
map.options.minZoom = 7;

//-----------------ЗАГРУЗКА_ДАННЫХ-------------------//
async function load_objects(path) {
    const response = await fetch(path);
    return response.json();
}

async function render_markers() {
    const promises = OBJECT_TYPES.map(type => 
        load_objects(`/api/${type.name}/`)
    );
    return Promise.all(promises);
}

//-----------------ОСНОВНОЙ_КОД-------------------//
var kahim = [" "];
var kahim1 = [" "];

render_markers().then(data => {
    const objectsData = {};
    OBJECT_TYPES.forEach((type, index) => {
        objectsData[type.name] = data[index];
    });

    //-----------------НАСТРОЙКА_ПОИСКА-------------------//
    const ObjectOpts = {
        onEachFeature: function (feature) {
            var p = feature.properties;
            p.index = p.name + " | " + p.type;
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: L.divIcon({
                    className: feature.properties.amenity,
                    iconSize: L.point(1, 1),
                    html: feature.properties.amenity[0].toUpperCase(),
                })
            });
        }
    };

    const searchLayers = OBJECT_TYPES.map(type => 
        L.geoJson(objectsData[type.name], ObjectOpts)
    );
    const featurelayer = L.layerGroup(searchLayers);

    //-----------------СЛОЙ_АДМИНИСТРАТИВНЫХ_ГРАНИЦ-------------------//
    var admRB = L.geoJSON(Administrative_boundaries, {
        style: { color: '#ff8100', opacity: 0.5 },
        onEachFeature: LabelEachFeature
    }).addTo(map);

    //-----------------СЛОИ_ОБЪЕКТОВ-------------------//
    const objectLayers = {};
    
    OBJECT_TYPES.forEach(type => {
        const layerName = `${type.name.charAt(0).toUpperCase() + type.name.slice(1)}Info`;
        objectLayers[layerName] = L.geoJSON(objectsData[type.name], {
            onEachFeature: onEachFeatureEternalFlame,
            pointToLayer: createPointToLayer(type.name)
        }).addTo(map);
    });

    //-----------------ФУНКЦИИ_ДЛЯ_СЛОЕВ-------------------//
    function createPointToLayer(objectType) {
        return function(feature, latlng) {
            return L.marker(latlng, { icon: ICONS[objectType].normal });
        };
    }

    function onEachFeatureEternalFlame(feature, layer) {
        layer.on('click', function (e) {
            ChangeIcons();
            const amenity = e.target.feature.properties.amenity;
            const objectType = OBJECT_TYPES.find(type => type.label === amenity);
            if (objectType) {
                layer.setIcon(ICONS[objectType.name].click);
            }
            map.setView(e.latlng, 17);
            openSidebarObject(e);
        });
    }

    function LabelEachFeature(feature, layer) {
        layer.on('click', function (e) {
            ChangeIcons();
        });
        
        map.on('zoomstart', function () {
            if (map.getZoom() >= 7 && feature.properties.OSM_ID !== "77677") {
                layer.bindTooltip(feature.properties.NAME, { 
                    permanent: true, 
                    direction: "center", 
                    setZIndex: 5 
                });
            }
        });
        
        map.on('zoomend', function () {
            if (map.getZoom() < 8) {
                layer.unbindTooltip();
            }
        });
    }

    //-----------------БОКОВАЯ_ПАНЕЛЬ-------------------//
    function openSidebarObject(e) {
        if(sidebar.isVisible()==false){sidebar.show()};
        var popupContentReg=' ';
        kahim1=e.target.feature.properties.photo;
        
        photolength=0;
        if(kahim1!=null)
        {
            console.log(e.target.feature.properties.photo);
            popupContentReg+='<h3>Галерея фотографий и видео</h3><div>';
            
                
            if(kahim1!="")
            {
                popupContentReg+= '<div class="mySlides fade">\
                <img src="'+kahim1 +'" id="theImage" onClick="makeFullScreen()" class="Image"> </div>';
            }
                    

            popupContentReg+='</div>';
        }
        /*else if(kahimVideo1!="")
        {
            for(var i=0;i<kahimVideo1.length;i++) {
                popupContentReg+= '<div class="mySlides fade">\
                <video src="'+kahimVideo1[i]+'" controls class="Video"></video></div>';
            }
        }*/
        
        targeter = e.target;
        const props = e.target.feature.properties;
        
        sidebar.setContent(`<h1>${props.name}</h1>${popupContentReg}
            <p><b>Тип объекта:  </b>${props.type}<br></p><hr>
            <p><b>Краткое описание:  </b>${props.short_description}<br></p><hr>
            <p><b>Описание:  </b>${props.description}<br></p><hr>
            <p><b>Район:  </b>${props.district}<br></p><hr>`);
        showSlides();
    }

    //-----------------ФИЛЬТР_СЛОЕВ-------------------//
    const baseTree = {
        label: 'Карта',
        children: [{ label: ' Республика Башкортостан', layer: real }]
    };

    const layerChildren = OBJECT_TYPES.map(type => ({
        label: `<img src="../static/images/icons/${type.icon}.svg" class="imgtree"> ${type.label}`,
        layer: objectLayers[`${type.name.charAt(0).toUpperCase() + type.name.slice(1)}Info`]
    }));

    const overlaysTree = {
        label: 'Слои',
        children: [{
            label: 'Объекты',
            selectAllCheckbox: true,
            children: layerChildren
        }]
    };

    var lay = L.control.layers.tree(baseTree, overlaysTree, {
        namedToggle: false,
        selectorBack: false,
        collapseAll: 'Свернуть все',
        expandAll: 'Раскрыть все',
        collapsed: true,
    });
    lay.addTo(map);

    //-----------------ЛЕГЕНДА-------------------//
    const legendItems = OBJECT_TYPES.map(type => ({
        label: type.label,
        type: "image",
        url: `../static/images/icons/${type.icon}.svg`
    }));

    L.control.Legend({
        position: "bottomright",
        title: "Легенда",
        column: 1,
        legends: legendItems
    }).addTo(map);

    //-----------------ПОИСК-------------------//
    var controlSearch = new L.Control.Search({
        layer: featurelayer,
        initial: false,
        propertyName: 'index',
        zoom: 17,
        marker: false,
        buildTip: function (text, val) {
            var type = val.layer.feature.properties.amenity;
            var engltype = val.layer.feature.properties.amenity1;
            return `<a href="#" class="${engltype}">${text}<b>${type}</b></a>`;
        }
    });
    map.addControl(controlSearch);
});