import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/WeatherListItem';
import GoogleMap from '../components/google_map';


class WeatherList extends Component {

    renderWeather(cityData){
        const temps = cityData.list.map(weather => weather.main.temp);
        const himidity = cityData.list.map(weather => weather.main.humidity);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const { lon, lat } = cityData.city.coord;

        return(
            <tr key={cityData.city.id}>
                <td>
                    <GoogleMap lon={lon} lat={lat} />
                </td>
                <td>
                    <Chart data={temps} color="orange" units="K" />
                </td>
                <td>
                    <Chart data={himidity} color="green" units="hPa" />
                </td>
                <td>
                    <Chart data={pressures} color="black" units="%"/>
                </td>
            </tr>
        );
    }

    render(){
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature(K)</th>
                        <th>Pressure(hPa)</th>
                        <th>Humidity(%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state) {
    return {
        weather: state.weather
    };
}

export default connect(mapStateToProps)(WeatherList);