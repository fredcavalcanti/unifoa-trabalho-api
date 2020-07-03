import React, { useRef, useState } from 'react';
import L, { layerGroup, latLng } from 'leaflet';
import Sidebar from '../../Components/Sidebar';
import MainPainel from '../../Components/MainPainel'
import api from '../../Services/api';
import ModalInfos from '../../Components/ModalInfo'

let Home = () => {
  let newApi = api();
  const mapRef = useRef();
  const [searchTerm, setSearchTerm] = useState('')
  const [geojsonFeatures, setGeojsonFeatures] = useState({});
  const [boxEnv, setBoxEnv] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Nenhuma cidade selecionada');
  const [aging, setAging] = useState({});
  const [covidData, setCovidData] = useState([]);

  let agingRateStates = {}

  let classification = {}

  let estados = {
    "rondonia": 11,
    "acre": 12,
    "amazonas": 13,
    "roraima": 14,
    "para": 15,
    "amapa": 16,
    "tocantins": 17,
    "maranhao": 21,
    "piaui": 22,
    "ceara": 23,
    "rio grande do norte": 24,
    "paraiba": 25,
    "pernambuco": 26,
    "alagoas": 27,
    "sergipe": 28,
    "bahia": 29,
    "minas gerais": 31,
    "espirito santo": 32,
    "rio de janeiro": 33,
    "sao paulo": 35,
    "parana": 41,
    "santa catarina": 42,
    "rio grande do sul": 43,
    "mato grosso do sul": 50,
    "mato grosso": 51,
    "goias": 52,
    "distrito federal": 53,
  }

  let handleSearch = async evt => {
    try {
      evt.preventDefault();
      clearMap();
      setBoxEnv(false);
      if (searchTerm) {
        let textFormated = (searchTerm.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let map = mapRef.current.leafletElement;
        let [responseEstado, responseBrasil] = await Promise.all([newApi.local.get(`/geojsons/${textFormated}.json`), newApi.local.get(`/cordenadas/brasil.json`)]);
        let { data } = responseBrasil;
        setGeojsonFeatures(responseEstado.data.features);
        map.flyTo(data[`${textFormated}`], 7)
      } else {
        alert('Escolha um estado')
      }
    } catch{
      alert('Error, ao pesquisar estado, lembre-se somente estados brasileiros podem ser pesquisados')
    }
  }

  let handleChangeAging = async evt => {
    let map = mapRef.current.leafletElement;
    clearMap();
    let textFormated = (searchTerm.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (textFormated && !boxEnv && geojsonFeatures.length > 0) {
      setBoxEnv(true);
      let myStyle = {};
      let stateId = estados[textFormated];
      let res = await getAgingRate(stateId);
      setAging(res);
      let valores = Object.values(res);
      let keys = Object.keys(res);
      valores.map((value, index) => {
        let score = (value / 29) * 100;
        classification[`${keys[index]}`] = score.toFixed(2);
      })
      geojsonFeatures.map(elemento => {
        let nome = ((elemento.properties.name).toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let scoreClass = classification[nome];
        if (scoreClass <= 40.19) {
          myStyle = {
            "color": "#00ff44",
            "weight": 2.5,
            "opacity": 0.70
          };
        } else if (scoreClass > 40.19 && scoreClass <= 73.19) {
          myStyle = {
            "color": "#eeff00",
            "weight": 2.5,
            "opacity": 0.70
          };
        } else {
          myStyle = {
            "color": "#ff0000",
            "weight": 2.5,
            "opacity": 0.70
          };
        }
        L.geoJSON(elemento, { style: myStyle }).addTo(map).on('click' , async evt => {
          setSelectedCity(evt.sourceTarget.feature.properties.name);
          setShowModal(true)
          let response = await newApi.coronaVirus.get('/PortalMunicipio');
          setCovidData(response.data)
        })
      })
    } else if (!textFormated) {
      setBoxEnv(false);
      alert('Escolha um estado antes de aplicar o filtro')
    } else if (boxEnv) {
      setBoxEnv(false);
    }else{
      setBoxEnv(false);
      alert('Escolha um estado antes de aplicar o filtro')
    }
  }

  let clearMap = () => {
    let index = 0;
    let map = mapRef.current.leafletElement;
    map.eachLayer(layer => {
      if (index > 0) {
        map.removeLayer(layer);
      }
      index++;
    });
  }

  let getAgingRate = id => {
    return new Promise(async resolve => {
      try {
        agingRateStates = {}
        let response = await newApi.ibge.get(`/agregados/617/periodos/2010/variaveis/1000289?localidades=N3[${id}]|N6[N3[${id}]]&classificacao=303[0]|58[1152,1153,1154,1155,2503]`);
        let [responseJson] = response.status === 200 ? await response.data : [{ error: 'Request Error' }];
        (responseJson.resultados).map(result => {
          (result.series).map(a => {
            if (a.localidade.nivel.id === "N6") {
              let nomeCidadeApi = (((a.localidade.nome).split(' -')[0]).toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              let valor = parseFloat(a.serie['2010']);
              if (agingRateStates[`${nomeCidadeApi}`]) {
                agingRateStates[`${nomeCidadeApi}`] += valor;
              } else {
                agingRateStates[`${nomeCidadeApi}`] = valor;
              }
            }
          })
        })
        resolve(agingRateStates);
      } catch (err) {
        console.log(err);
        resolve(false)
      }
    });
  }


  return (
    <div className={ showModal ? "dark-edition modal-open" : "dark-edition"}>
      <div className="wrapper">
        <ModalInfos showModal={showModal} selectedCity={selectedCity} setShowModal={setShowModal} agingRateStates={aging} covidData={covidData}/>
        <Sidebar handleChangeAging={handleChangeAging} boxEnv={boxEnv} />
        <MainPainel handleSearch={handleSearch} setSearchTerm={setSearchTerm} mapRef={mapRef} />
      </div>
    </div>
  );
}
export default Home;