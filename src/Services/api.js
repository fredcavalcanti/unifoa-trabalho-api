import axios from 'axios'

const api = () => {
   let local = axios.create({baseURL: 'https://trabalho-api-foa.herokuapp.com'});
   let ibge = axios.create({baseURL:'https://servicodados.ibge.gov.br/api/v3'});
   let coronaVirus = axios.create({baseURL:'https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod'});
   return { local, ibge, coronaVirus }
}

export default api;
