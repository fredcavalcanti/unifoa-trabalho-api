import React, { useState } from 'react';
import './Modal.css';

let ModalInfos = params => {
    const [deaths, setDeaths] = useState(-1)
    const [casos, setCasos] = useState(-1)
    let { showModal, selectedCity, covidData, setShowModal, agingRateStates } = params;
    let closeModal = () => setShowModal(false);
    let getAging = () => !agingRateStates[`${(selectedCity.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`] ? "Valor não encontrado" : (agingRateStates[`${(selectedCity.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`]).toFixed(2);;
    let getCovidData = () => {
        let [city] = covidData.map(data => {
            let nomeNormalized = ((data.nome).toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            let nomeSelectedNormalized = (selectedCity.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (nomeNormalized == nomeSelectedNormalized) {
                return data;
            }
        }).filter(a => a);
        return city;
    }
    let getDeaths = async () => {
        let cidade = await getCovidData();
        if (cidade) {
            setDeaths(cidade.obitosAcumulado)
        }
    }
    let getCases = async () => {
        let cases = await getCovidData();
        if (cases) {
            setCasos(cases.casosAcumulado);
        }
    }
    getCases();
    getDeaths();
    return (
        <div className={showModal ? "modal fade show lock" : "modal fade"} tabIndex={-1} id="exampleModal" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">{selectedCity}</h2>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h4 > Covid Data </h4>
                        <div className="row justify-content-center">
                            <div className="col-md-5 col-sm-5">
                                <div className="card card-stats" >
                                    <div className="card-header  card-header-warning card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">fact_check</i>
                                        </div>
                                        <p className="card-category" >Total Cases</p>
                                        <h3 className="card-title" id="totalCases"  > {casos == -1 ? 'Carregando...' : `${casos} Cases` }  </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-5 col-sm-5">
                                <div className="card card-stats" >
                                    <div className="card-header card-header-danger card-header-icon">
                                        <div className="card-icon" >
                                            <i className="material-icons">cancel_presentation</i>
                                        </div>
                                        <p className="card-category" > Total Deaths</p>
                                        <h3 className="card-title" id="deaths" > {deaths == -1 ? 'Carregando...' : `${deaths} Deaths` }  </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-5">
                                <div className="card card-stats">
                                    <div className="card-header card-header-info card-header-icon">
                                        <div className="card-icon" >
                                            <i className="material-icons">star_rate</i>
                                        </div>
                                        <p className="card-category" >Aging Rate</p>
                                        <h3 className="card-title" id="indiceEnv">{getAging()}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal} >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalInfos;