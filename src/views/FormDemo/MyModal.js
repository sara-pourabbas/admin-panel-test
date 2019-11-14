import React , {Component} from 'react';
import {Container,Modal, ModalHeader,ModalBody,Row,Col,InputGroup,ModalFooter,
  InputGroupAddon,InputGroupText,Input,Button} from 'reactstrap';
 import { Icon} from '../../Utility';
import {connect} from 'react-redux';
import {GetFormDemo} from "../../redux/ActionCreators/FormDemo";
import {  DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';

class MyModal extends Component{
  state={
    id:null,
    userName:'',
    phone:'',
    // cover:null,
    startDate:null,
    edit_detail:{}
  };
  edit_mode = false;

  onChange = (jsDate) => {
    this.setState({startDate:jsDate})
  };

  save=()=>{
    let{id,userName,phone,startDate} = this.state;
    this.props.onSave({id,userName,phone,startDate},this.edit_mode);
    this.edit_mode = false;
  };

  getUserDetail = (postId) =>{
    const edit_detail = this.props.FormDemoReducer.list.find(a=>a.id===postId);
      this.setState({
        //edit_detail,
        id:edit_detail.id,
        userName:edit_detail.userName,
        phone:edit_detail.phone,
        startDate:edit_detail.startDate
      });
  };
  editMode=()=>{
    if(typeof this.props.editData === 'object' && Object.keys(this.props.editData).length > 0 && !this.edit_mode) {
      this.edit_mode = true;
      this.getUserDetail(this.props.editData.id)
    }
  };
  componentDidMount(){
    this.editMode()
  }
  componentDidUpdate(){
    this.editMode()
  }
  render(){
    return(
      <div className="animated fadeIn">
        <Container>
          <React.Fragment>
            <Modal size='lg' isOpen={this.props.isOpen} toggle={()=>{this.props.toggle();this.edit_mode=false}}>
              <ModalHeader toggle={()=>{this.props.toggle();this.edit_mode=false}}>
                Add new User
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Icon icon='close'/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="User Name"  name='userName' value={this.state.userName}
                             onChange={e=>this.setState({userName:e.target.value})}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Icon icon='phone'/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Phone" name='Phone' value={this.state.phone}
                             onChange={e=>this.setState({phone:e.target.value})}  />
                    </InputGroup>
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col md={6}>
                    <DatePickerInput
                      onChange={this.onChange}
                      value={this.state.startDate}
                      className='my-custom-datepicker-component'
                    />
                  </Col>
                  <Col md={6}>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color='success' onClick={this.save}>Save</Button>
                <Button color='danger' onClick={()=>{this.props.toggle();this.edit_mode=false}}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </React.Fragment>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  FormDemoReducer : state.FormDemoReducer
});
const mapDispatchToProps = dispatch =>({
  GetFormDemo : (query)=> dispatch(GetFormDemo(query))
});
export default connect (mapStateToProps,mapDispatchToProps) (MyModal);
