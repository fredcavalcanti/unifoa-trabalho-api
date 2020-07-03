import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

let MainPainel = params => {
    let { handleSearch, setSearchTerm, mapRef } = params;
    return (
    <div className="main-panel">
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top " id="navigation-example">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation" data-target="#navigation-example">
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end">
            <form id="formSearch" className="navbar-form col-12 mt-2" onSubmit={handleSearch}>
              <div className="input-group no-border">
                <input type="text" id="inpSearchEstados" name="searchEstados" onChange={e => setSearchTerm  (e.target.value)} className="form-control inputGreen" placeholder="Search by state" />
                <button type="submit" className="btn btn-default btn-round btn-just-icon">
                  <i className="material-icons">search</i>
                  <div className="ripple-container"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <Map ref={mapRef} center={[0,0]} zoom={2} className="ajustMap leaflet-container leaflet-fade-anim leaflet-grab leaflet-touch-drag">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
  </div>
  )
}

export default MainPainel;