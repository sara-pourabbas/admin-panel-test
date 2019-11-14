import React,{Component} from 'react';
import {Row,Col,Card,CardBody,CardHeader} from 'reactstrap';
import {Link} from 'react-router-dom';
import {CheckToken, Icon} from '../../Utility';
import axios from 'axios';
import {API_URL} from "../../configs/config";
class Detail extends Component{
  constructor(props){
    super(props);
    CheckToken(props);
  }
  state={
    backPath:'/'+window.location.pathname.split('/')[1],
    id:null,
    userName:'',
    phone:'',
    // cover:null,
    startDate:null
  };
  getUserDetail=()=>{
    axios({
      url:API_URL+'posts/'+this.props.match.params.id,
      method:'get'
    }).then(resp=>{
        console.log('viewResp',resp);
        this.setState({
          userName:resp.data.userName,
          phone:resp.data.phone,
          // cover:resp.data.cover,
          startDate:resp.data.startDate,
        })
    }).catch(err=>{
        console.log(err)
    })
  };
  componentDidMount(){
    this.getUserDetail()
  }
render(){

  return(
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="12" className="mb-4">
          <Card>
            <CardHeader>
              User Details
              <Link className='btn btn-info btn-sm pull-right' to={this.state.backPath} > Back To Users </Link>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs={12} sm={6} lg={4}>
                  <Card>
                    <CardBody className="clearfix p-0">
                      <Icon icon={'phone bg-warning p-4 px-5 font-2xl mr-3 float-left'}/>
                      <div className="h5 mb-0 text-warning pt-3">{this.state.userName}</div>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">UserName</div>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs={12} sm={6} lg={4}>
                  <Card>
                    <CardBody className="clearfix p-0">
                      <Icon icon={'user-plus bg-success p-4 px-5 font-2xl mr-3 float-left'}/>
                      <div className="h5 mb-0 text-success pt-3">{this.state.phone}</div>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Phone Number</div>
                    </CardBody>
                  </Card>
                </Col>
                  {/*<Col xs={12} sm={6} lg={4}>
                    <Card>
                      <CardBody className="clearfix p-0">
                        <Icon icon={'image bg-danger p-4 px-5 font-2xl mr-3 float-left'}/>
                        <div className="h5 mb-0 text-danger pt-3">{this.state.cover}</div>
                        <div className="text-muted text-uppercase font-weight-bold font-xs">Cover</div>
                      </CardBody>
                    </Card>
                </Col>*/}
                <Col xs={12} sm={6} lg={4}>
                  <Card>
                    <CardBody className="clearfix p-0">
                      <Icon icon={'calendar icons bg-info p-4 px-5 font-2xl mr-3 float-left'}/>
                      <div className="h5 mb-0 text-info pt-3">{this.state.startDate ? this.state.startDate.slice(0,10):''}</div>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Start Date</div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
}

export default Detail;
