import React, { Component} from 'react';
import {Row,Col,Card,CardHeader,CardBody,Table,Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {CheckToken, Icon, SearchBar,Loading} from '../../Utility';
import {API_URL} from '../../configs/config';
import axios from 'axios';
import {connect} from 'react-redux';
import {GetFormDemo,FormReload} from "../../redux/ActionCreators/FormDemo";
import MyModal from './MyModal';

class FormDemo extends Component {
  constructor(props){
    super(props);
    CheckToken(props);
  }
  state={
    search_keyword:'',
    modal_open:false,
    edit_data:{}
  };
  add=()=>{
    this.setState(prevState=>({ modal_open:!prevState.modal_open, edit_data:{} }))
  };
  edit=(postId)=>{
    const edit_data = this.props.FormDemoReducer.list.find(a=>a.id===postId);
    this.setState({
      modal_open:true,
      edit_data
    });
  };
  deleteUser=(postId)=>{
    const Prompt = window.confirm('Are you sure to delete ?');
    if(Prompt){
      axios({
        url:API_URL+'posts/'+postId,
        method:'delete'
      }).then(resp=>{
          this.props.GetFormDemo()
      }).catch(err=>{
        console.log(err)
      })
    }
  };
  onSaveModal=(data,edit_mode=false)=>{
    let reqData = {};
    reqData={
      userName:data.userName,
      phone:data.phone,
      startDate:data.startDate,
    };
    axios({
      url:edit_mode?API_URL+'posts/'+data.id:API_URL+'posts',
      method:edit_mode?'put':'post',
      data:reqData
    }).then( resp=>{
       this.add();
       this.props.GetFormDemo()
    }).catch(err=>{
      console.log(err)
    })
  };


  search=()=>{
      this.props.FormReload();
    this.props.GetFormDemo(this.state.search_keyword)
  };

    reload=()=>{
           this.setState({search_keyword:''});
           this.props.FormReload();
           this.props.GetFormDemo();
    };

  componentDidMount(){
    this.props.GetFormDemo()
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={6} className='my-3'>
            <SearchBar value={this.state.search_keyword}
                       Change={search_keyword => {this.setState({search_keyword})}}
                       onSearch={this.search}
            />
          </Col>
          <Col md={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col md={6}>
                    <span> <i className="fa fa-align-justify pr-3"/>All User</span>
                  </Col>
                  <Col md={6} className='text-right'>
                    <Button  className='mr-1' color='info' size='sm' onClick={this.reload}><Icon icon='refresh'/> Reload</Button>
                    <Button color='success' size='sm' onClick={this.add}><Icon icon='plus'/> Add new user</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                      <Row>
                        <Col md={12}>
                            {this.props.FormDemoReducer.loading?<Loading/>:
                                <Table hover bordered striped responsive size="sm" className='table-custom'>
                                <thead>
                                <tr>
                                <th className='text-center' >User Name</th>
                                <th className='text-center' style={{width: 150}}>Phone</th>
                                <th className='text-center' style={{width: 150}}>Start Date</th>
                                <th className='text-center' style={{width: 250}}>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.FormDemoReducer.list.map((element, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='text-center'>{element.userName}</td>
                                                <td className='text-center'>{element.phone}</td>
                                                <td className='text-center'>{element.startDate.slice(0, 10)}</td>
                                                <td className='text-center'>
                                                    <Link className={'btn btn-secondary btn-sm m-1'}
                                                          to={`/formdemo/${element.id}`}>
                                                        View <Icon icon='eye'/>
                                                    </Link>
                                                    <Button className='m-1' size={'sm'} color={'info'}
                                                            onClick={() => this.edit(element.id)}>Edit <Icon
                                                        icon='pencil'/></Button>
                                                    <Button className='m-1' size={'sm'} color={'danger'}
                                                            onClick={() => this.deleteUser(element.id)}>Delete <Icon
                                                        icon='trash'/></Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                                </Table>
                            }
                        </Col>
                        <Col md={12}>
                        </Col>
                      </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {
        this.state.modal_open &&(
          <MyModal editData={Object.keys(this.state.edit_data).length>0?this.state.edit_data:undefined}
                   isOpen={this.state.modal_open}
                   toggle={this.add} onSave={this.onSaveModal}
          />
        )
        }

      </div>
    );
  }
}
const mapStateToProps = state=>({
  FormDemoReducer : state.FormDemoReducer
});

const mapDispatchToProps = dispatch=>({
  GetFormDemo : (query)=>dispatch(GetFormDemo(query)),
  FormReload  : ()=>dispatch(FormReload())
});
export default connect(mapStateToProps,mapDispatchToProps)(FormDemo);
