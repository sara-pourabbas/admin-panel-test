import React from 'react';
import {Form, FormGroup, Col, InputGroup, Input, InputGroupAddon, Button} from 'reactstrap';

export const Icon = props => {
  const {icon, className, ...other} = props;
  return <i className={`fa fa-${icon} ${className || ''}`} {...other} />
};
export const SearchBar = props =>{
  return(
    <Form action="/" method="post" className="form-horizontal">
      <FormGroup row>
        <Col md="12">
          <InputGroup>
            <Input  type="search" id="input2-group2" name="input2-group2" placeholder="Search"
                    value={props.value || ''} onChange={e=>props.Change(e.target.value)}/>
            <InputGroupAddon addonType="append">
              <Button onClick={props.onSearch} type="button" color="primary"><i className="fa fa-search" /> Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </FormGroup>
    </Form>
  )
};

export const CheckToken = props =>{
  !localStorage.getItem('Token') && props.history.push('/login')
};

export const Loading = ()=>{
  return(
      <div className='text-center'>
      <img src='../../assets/img/load.gif'/>
      </div>
  )
};