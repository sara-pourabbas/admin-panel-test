import React, { Component} from 'react';
import { Line } from 'react-chartjs-2';
import { Button,ButtonGroup, ButtonToolbar,Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Progress,
  Row
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import axios from 'axios';
import {API_URL} from '../../configs/config';
import {CheckToken} from "../../Utility";

const brandInfo = getStyle('--info');

class Dashboard extends Component {
  constructor(props){
    super(props);
    CheckToken(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      mainChart:{},
      mainChartOpts:{},
      listChartProgress:[]
    };
  }

  componentDidMount(){
    let dataChart;
    let labels=[];
    let data1 = [];
    axios({
      url:API_URL+'chartData/',
      method: 'get'
    }).then(resp=>{
      dataChart=resp.data;
      dataChart.map(a=>{
        labels.push(a.label);
        data1.push(a.value)
      });

      this.setState({
        mainChart : {
/*          // labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo',
          //   'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We',
          //   'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],*/
          labels:labels,
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: hexToRgba(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: data1,
            },

          ],
        }
      });
      this.setState({
        mainChartOpts : {
          tooltips: {
            enabled: false,
            custom: CustomTooltips,
            intersect: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
              labelColor: function(tooltipItem, chart) {
                return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
              }
            }
          },
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false,
                },
              }],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  maxTicksLimit: 5,
                  stepSize: Math.ceil(250 / 5),
                  max: 250,
                },
              }],
          },
          elements: {
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }
      });

      this.getChartProgress();

    }).catch(err=>{
      console.log(err)
    });
  }

  getChartProgress=()=>{
    axios({
      url:API_URL+'chartProgress/',
      method: 'get'
    }).then(resp=> {
      console.log('res',resp);
      this.setState({
        listChartProgress:resp.data
      })
    }).catch(err=>{

    });
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {

    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Traffic</CardTitle>
                    <div className="small text-muted">November 2015</div>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    <Button color="primary" className="float-right"><i className="icon-cloud-download" /></Button>
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={this.state.mainChart} options={this.state.mainChartOpts} height={80} />
                </div>
              </CardBody>
              <CardFooter>
                <Row className="text-center">
                  {
                    this.state.listChartProgress.map((prog,index)=>{
                      return(
                        <Col sm={12} md className="mb-sm-2 mb-0" key={index}>
                          <div className="text-muted">{prog.title}</div>
                          <strong>{prog.data} {prog.type} {prog.percent+'%'}</strong>
                          <Progress className="progress-xs mt-2" value={prog.percent}  color={`${(()=>{if(prog.percent<20){
                                          return "danger"
                                        }else if(prog.percent>=20 && prog.percent<50){
                                          return "yellow"
                                        }else if(prog.percent>=50 && prog.percent<80){
                                          return "info"
                                        }else {
                                          return "success"
                                        }
                                          })()}
                                    `}
                          />
                        </Col>
                      )
                  })
                  }
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Dashboard;
