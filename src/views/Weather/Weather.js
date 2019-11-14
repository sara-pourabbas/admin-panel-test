import React, { Component} from 'react';
import {Row,Col,Container} from 'reactstrap';
import axios from 'axios';
import {CheckToken} from "../../Utility";

class Weather extends Component {
  constructor(props){
    super(props);
    CheckToken(props);
  }
  state={
    list:[]
  };

  componentDidMount(){
    this.WeatherByCityId();
  }
  WeatherByCityId=()=>{
    axios({
      //url: 'http://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=1ac0efe286664e3b359e7120b6881d6e',
      url:'http://api.openweathermap.org/data/2.5/forecast?id=112931&appid=1ac0efe286664e3b359e7120b6881d6e',
      post:'post'
    }).then(resp=>{
        this.setState({
          list:resp.data.list
        })
      }).catch(err=>{
        console.log(err)
    })
  };

  convertKelvinToCelsius=(kelvin)=> {
    if (kelvin < (0)) {
      return 'below absolute zero (0 K)';
    } else {
      return (kelvin-273.15);
    }
  };

  convertUnixTotext=element=> {
    let i = 0;
    let data = {list: [{dt: element.dt}]};
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dayNum = new Date(data.list[i].dt * 1000).getDay();
    let result = days[dayNum];
    return result;
  };

  render() {
   const {list}=this.state;
    return (
      <div className="animated fadeIn">
        <Container>
          <div>
            <h1> Weather </h1>
            <Row >
              {
                list.map((element,index)=>{
                  return(
                    <Col xs={2} key={index} className=' my-3'>
                      <div className='text-center'>
                        {this.convertUnixTotext(element)}
                      </div>
                      {
                        element.weather.map((el,i)=>(
                          <div className='text-center icon-temp ' key={i}>
                            <img src={`http://openweathermap.org/img/w/${el.icon}.png`} alt='temp' />
                          </div>
                        ))
                      }
                      <div className='text-center'>
                        <span className='mx-1 position-relative temp'>
                           {Math.round(this.convertKelvinToCelsius(element.main.temp_min))}
                          <img src={'assets/img/degree.png'} alt='degree' className='position-absolute' />
                        </span>
                        <span className='mx-1 position-relative temp'>
                          {Math.round(this.convertKelvinToCelsius(element.main.temp_max))}
                          <img src={'assets/img/degree.png'} alt='degree' className='position-absolute' />
                        </span>
                      </div>
                    </Col>
                  )
                })
              }
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default Weather;
