import React, { Component } from 'react'
import { Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover,Switch } from 'antd'
import { connect } from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import CandidateList from '../../components/CandidateList'
import {ImageComponent} from '../../axios/tools'
import FooterToolbar from '../../components/FooterToolbar'
import styles from './RetailStore.createform.less'
import {mapBackToImageValues, mapFromImageValues} from '../../axios/tools'
import GlobalComponents from '../../custcomponents';
import RetailStoreBase from './RetailStore.base'
import appLocaleName from '../../common/Locale.tool'
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input
const {fieldLabels} = RetailStoreBase
const testValues = {};
import PrivateImageEditInput from '../../components/PrivateImageEditInput'
import RichEditInput from '../../components/RichEditInput'
import SmallTextInput from '../../components/SmallTextInput'

const imageKeys = [
]


class RetailStoreCreateFormBody extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    convertedImagesValues: {},
  }

  componentDidMount() {



    const {initValue} = this.props
    if(!initValue || initValue === null){
      return
    }

    const formValue = RetailStoreBase.unpackObjectToFormValues(initValue)
    this.props.form.setFieldsValue(formValue);




  }

  handlePreview = (file) => {
    console.log('preview file', file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }




  handleImageChange = (event, source) => {

    const {handleImageChange} = this.props
    if(!handleImageChange){
      console.log('FAILED GET PROCESS FUNCTION TO HANDLE IMAGE VALUE CHANGE', source)
      return
    }

    const { convertedImagesValues } = this.state
    const { fileList } = event
    convertedImagesValues[source] = fileList
    this.setState({ convertedImagesValues })
    handleImageChange(event, source)


  }


  render() {
    const { form, dispatch, submitting, role } = this.props
    const { convertedImagesValues } = this.state
	const userContext = null
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form
    const { owner } = this.props
    const {RetailStoreService} = GlobalComponents

    const capFirstChar = (value)=>{
    	//const upper = value.replace(/^\w/, c => c.toUpperCase());
  		const upper = value.charAt(0).toUpperCase() + value.substr(1);
  		return upper
  	}
    

    const tryinit  = (fieldName) => {

      if(!owner){
      	return null
      }
      const { referenceName } = owner
      if(referenceName!=fieldName){
        return null
      }
      return owner.id
    }

    const availableForEdit= (fieldName) =>{

      if(!owner){
      	return true
      }
      const { referenceName } = owner
      if(referenceName!=fieldName){
        return true
      }
      return false

    }
	const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    }
    const switchFormItemLayout = {

      labelCol: { span: 6 },
      wrapperCol: { span: 12 },

    }

    const internalRenderTitle = () =>{
      const linkComp=<a onClick={goback}  > <Icon type="double-left" style={{marginRight:"10px"}} /> </a>
      return (<div>{linkComp}{appLocaleName(userContext,"CreateNew")}{window.trans('retail_store')}</div>)
    }

	return (
      <div>
        <Card title={!this.props.hideTitle&&appLocaleName(userContext,"BasicInfo")} className={styles.card} bordered={false}>
          <Form >
          	<Row gutter={16}>


              <Col lg={24} md={24} sm={24}>
                <Form.Item label={fieldLabels.name} {...formItemLayout}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(
                    <SmallTextInput minLength={3} maxLength={24} size="large"  placeholder={fieldLabels.name} />
                  )}
                </Form.Item>
              </Col>

              <Col lg={24} md={24} sm={24}>
                <Form.Item label={fieldLabels.telephone} {...formItemLayout}>
                  {getFieldDecorator('telephone', {
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(
                    <SmallTextInput minLength={4} maxLength={48} size="large"  placeholder={fieldLabels.telephone} />
                  )}
                </Form.Item>
              </Col>

              <Col lg={24} md={24} sm={24}>
                <Form.Item label={fieldLabels.owner} {...formItemLayout}>
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(
                    <SmallTextInput minLength={1} maxLength={8} size="large"  placeholder={fieldLabels.owner} />
                  )}
                </Form.Item>
              </Col>

              <Col lg={24} md={24} sm={24}>
                <Form.Item label={fieldLabels.founded} {...formItemLayout}>
                  {getFieldDecorator('founded', {
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(
                    <DatePicker size="large" format="YYYY-MM-DD"  placeholder={fieldLabels.founded}/>
                  )}
                </Form.Item>
              </Col>

              <Col lg={24} md={24} sm={24}>
                <Form.Item label={fieldLabels.latitude} {...formItemLayout}>
                  {getFieldDecorator('latitude', {
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(
                    <SmallTextInput minLength={-90.0} maxLength={90.0} size="large"  placeholder={fieldLabels.latitude} />
                  )}
                </Form.Item>
              </Col>

              <Col lg={24} md={24} sm={24}>
                <Form.Item label={fieldLabels.longitude} {...formItemLayout}>
                  {getFieldDecorator('longitude', {
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(
                    <SmallTextInput minLength={-180.0} maxLength={180.0} size="large"  placeholder={fieldLabels.longitude} />
                  )}
                </Form.Item>
              </Col>

              <Col lg={24} md={24} sm={24}>
                <Form.Item label={fieldLabels.description} {...formItemLayout}>
                  {getFieldDecorator('description', {
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(
                    <SmallTextInput minLength={6} maxLength={84} size="large"  placeholder={fieldLabels.description} />
                  )}
                </Form.Item>
              </Col>



 
              <Col lg={24} md={24} sm={24} style={{"display":"none"}}>
                <Form.Item label={fieldLabels.retailStoreCountryCenter} {...formItemLayout}>
                  {getFieldDecorator('retailStoreCountryCenterId', {
                  	initialValue: tryinit('retailStoreCountryCenter'),
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(


                  <CandidateList
		                 disabled={!availableForEdit('retailStoreCountryCenter')}
		                 ownerType={owner.type}
		                 ownerId={owner.id}
		                 scenarioCode={"assign"}
		                 listType={"retail_store"}
		                 targetType={"retail_store_country_center"}

                    requestFunction={RetailStoreService.queryCandidates}  />



                  )}
                </Form.Item>
              </Col>



              <Col lg={24} md={24} sm={24} >
                <Form.Item label={fieldLabels.cityServiceCenter} {...formItemLayout}>
                  {getFieldDecorator('cityServiceCenterId', {
                  	initialValue: tryinit('cityServiceCenter'),
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(


                  <CandidateList
		                 disabled={!availableForEdit('cityServiceCenter')}
		                 ownerType={owner.type}
		                 ownerId={owner.id}
		                 scenarioCode={"assign"}
		                 listType={"retail_store"}
		                 targetType={"retail_store_city_service_center"}

                    requestFunction={RetailStoreService.queryCandidates}  />



                  )}
                </Form.Item>
              </Col>



              <Col lg={24} md={24} sm={24} style={{"display":"none"}}>
                <Form.Item label={fieldLabels.creation} {...formItemLayout}>
                  {getFieldDecorator('creationId', {
                  	initialValue: tryinit('creation'),
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(


                  <CandidateList
		                 disabled={!availableForEdit('creation')}
		                 ownerType={owner.type}
		                 ownerId={owner.id}
		                 scenarioCode={"assign"}
		                 listType={"retail_store"}
		                 targetType={"retail_store_creation"}

                    requestFunction={RetailStoreService.queryCandidates}  />



                  )}
                </Form.Item>
              </Col>



              <Col lg={24} md={24} sm={24} style={{"display":"none"}}>
                <Form.Item label={fieldLabels.investmentInvitation} {...formItemLayout}>
                  {getFieldDecorator('investmentInvitationId', {
                  	initialValue: tryinit('investmentInvitation'),
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(


                  <CandidateList
		                 disabled={!availableForEdit('investmentInvitation')}
		                 ownerType={owner.type}
		                 ownerId={owner.id}
		                 scenarioCode={"assign"}
		                 listType={"retail_store"}
		                 targetType={"retail_store_investment_invitation"}

                    requestFunction={RetailStoreService.queryCandidates}  />



                  )}
                </Form.Item>
              </Col>



              <Col lg={24} md={24} sm={24} style={{"display":"none"}}>
                <Form.Item label={fieldLabels.franchising} {...formItemLayout}>
                  {getFieldDecorator('franchisingId', {
                  	initialValue: tryinit('franchising'),
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(


                  <CandidateList
		                 disabled={!availableForEdit('franchising')}
		                 ownerType={owner.type}
		                 ownerId={owner.id}
		                 scenarioCode={"assign"}
		                 listType={"retail_store"}
		                 targetType={"retail_store_franchising"}

                    requestFunction={RetailStoreService.queryCandidates}  />



                  )}
                </Form.Item>
              </Col>



              <Col lg={24} md={24} sm={24} style={{"display":"none"}}>
                <Form.Item label={fieldLabels.decoration} {...formItemLayout}>
                  {getFieldDecorator('decorationId', {
                  	initialValue: tryinit('decoration'),
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(


                  <CandidateList
		                 disabled={!availableForEdit('decoration')}
		                 ownerType={owner.type}
		                 ownerId={owner.id}
		                 scenarioCode={"assign"}
		                 listType={"retail_store"}
		                 targetType={"retail_store_decoration"}

                    requestFunction={RetailStoreService.queryCandidates}  />



                  )}
                </Form.Item>
              </Col>



              <Col lg={24} md={24} sm={24} style={{"display":"none"}}>
                <Form.Item label={fieldLabels.opening} {...formItemLayout}>
                  {getFieldDecorator('openingId', {
                  	initialValue: tryinit('opening'),
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(


                  <CandidateList
		                 disabled={!availableForEdit('opening')}
		                 ownerType={owner.type}
		                 ownerId={owner.id}
		                 scenarioCode={"assign"}
		                 listType={"retail_store"}
		                 targetType={"retail_store_opening"}

                    requestFunction={RetailStoreService.queryCandidates}  />



                  )}
                </Form.Item>
              </Col>



              <Col lg={24} md={24} sm={24} style={{"display":"none"}}>
                <Form.Item label={fieldLabels.closing} {...formItemLayout}>
                  {getFieldDecorator('closingId', {
                  	initialValue: tryinit('closing'),
                    rules: [{ required: true, message: appLocaleName(userContext,"PleaseInput") }],
                  })(


                  <CandidateList
		                 disabled={!availableForEdit('closing')}
		                 ownerType={owner.type}
		                 ownerId={owner.id}
		                 scenarioCode={"assign"}
		                 listType={"retail_store"}
		                 targetType={"retail_store_closing"}

                    requestFunction={RetailStoreService.queryCandidates}  />



                  )}
                </Form.Item>
              </Col>





			 </Row>
          </Form>
        </Card>









       </div>
    )
  }
}

export default connect(state => ({
  collapsed: state.global.collapsed,
}))(Form.create()(RetailStoreCreateFormBody))





