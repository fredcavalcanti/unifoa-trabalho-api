import React from 'react';
import { Link } from 'react-router-dom'

let Sidebar = params => {
  let { handleChangeAging, boxEnv } = params;
  return (<div className="sidebar" data-color="green" data-background-color="black" data-image="/images/corona-background.jpg">
    <div className="logo">
      <div className="row justify-content-md-center">
        <img src="/images/logo2.png" className="img1Style" />
      </div>
    </div>
    <div className="sidebar-wrapper">
      <ul className="nav">
        <li id="filtros" className="nav-item">
          <a className="nav-link cs-default" href="#">
            <i className="material-icons">tune</i>
            <p>Filters</p>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input inputGreen" type="checkbox" name="boxEnvelhecimento" value="" onChange={handleChangeAging} checked={boxEnv} />
                <span className="form-check-sign">
                  <span className="check"></span>
                </span>
                  Aging rate
                </label>
            </div>
          </a>
        </li>
        <li className="nav-item" >
          <a className="nav-link" href="#">
            <label className="form-check-label">
              Map Legend
            </label>
          </a>
        </li>
        <li className="nav-item" >
          <a className="nav" href="#">
            <div className="labels labelEdited">
              <span>Bad</span>
              <span>Good</span>
            </div>
            <div id="progress-bar-container">
              <div className="progress-bar-child progress"></div>
              <div className="progress-bar-child shrinker timelapse"></div>
            </div>
          </a>
        </li>
        <li className="nav-item" >
          <Link to="/sobre" className="nav-link">
            <label className="form-check-label">
              Sobre
            </label>
          </Link>
        </li>
      </ul>
    </div>
  </div>)
}

export default Sidebar;