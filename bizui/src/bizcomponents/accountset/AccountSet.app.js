import React from 'react'
import PropTypes from 'prop-types'
import {
  Layout,
  Menu,
  Icon,
  Avatar,
  Dropdown,
  Tag,
  message,
  Spin,
  Breadcrumb,
  AutoComplete,Row, Col,
  Input,Button,Tooltip,
} from 'antd'

import DocumentTitle from 'react-document-title'
import { connect } from 'dva'
import { Link, Route, Redirect, Switch } from 'dva/router'
import moment from 'moment'
import groupBy from 'lodash/groupBy'
import { ContainerQuery } from 'react-container-query'
import classNames from 'classnames'
import styles from './AccountSet.app.less'
import {sessionObject} from '../../utils/utils'

import HeaderSearch from '../../components/HeaderSearch';
import NoticeIcon from '../../components/NoticeIcon';
import GlobalFooter from '../../components/GlobalFooter';
import TopMenu from '../../launcher/TopMenu'
import SwitchAppMenu from '../../launcher/SwitchAppMenu'

import GlobalComponents from '../../custcomponents';

import PermissionSettingService from '../../permission/PermissionSetting.service'
import appLocaleName from '../../common/Locale.tool'
import BizAppTool from '../../common/BizApp.tool'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu
const {
  defaultFilteredNoGroupMenuItems,
  defaultFilteredMenuItemsGroup,
  defaultRenderMenuItem,

} = BizAppTool


const filteredNoGroupMenuItems = defaultFilteredNoGroupMenuItems
const filteredMenuItemsGroup = defaultFilteredMenuItemsGroup
const renderMenuItem=defaultRenderMenuItem


const naviBarResponsiveStyle = {
  xs: 10,
  sm: 10,
  md: 10,
  lg: 8,
  xl: 8,

};



const searchBarResponsiveStyle = {
  xs: 4,
  sm: 4,
  md: 4,
  lg: 8,
  xl: 8,

};

const userBarResponsiveStyle = {
  xs: 10,
  sm: 10,
  md: 10,
  lg: 8,
  xl: 8,

};



const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
}

/*
const currentAppName=()=>{

  const targetApp = sessionObject('targetApp')
  return targetApp.title

}
*/

const currentAppName=()=>{

  const sysConfig=window.sysConfig
  const targetApp = sessionObject('targetApp')
  const {logo}=sysConfig()
  return <span><img width="25px" src={logo} style={{marginRight:"10px"}}/>{targetApp.title}</span>

}





class AccountSetBizApp extends React.PureComponent {
constructor(props) {
    super(props)
     this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
      showSearch: false,
      searchKeyword:''
    }
  }

  componentDidMount() {}
  componentWillUnmount() {
    clearTimeout(this.resizeTimeout)
  }
  onCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    })
  }

  getDefaultCollapsedSubMenus = (props) => {
    const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)]
    currentMenuSelectedKeys.splice(-1, 1)
    if (currentMenuSelectedKeys.length === 0) {
      return ['/accountSet/']
    }
    return currentMenuSelectedKeys
  }
  getCurrentMenuSelectedKeys = (props) => {
    const { location: { pathname } } = props || this.props
    const keys = pathname.split('/').slice(1)
    if (keys.length === 1 && keys[0] === '') {
      return [this.menus[0].key]
    }
    return keys
  }

 getNavMenuItems = (targetObject, style, customTheme) => {


    const menuData = sessionObject('menuData')
    const targetApp = sessionObject('targetApp')
    const mode =style || "inline"
    const theme = customTheme || "light"
	const {objectId}=targetApp;
  	const userContext = null
  	const viewGroupIconNameOf=window.viewGroupIconNameOf
    return (
	  <Menu
        theme="dark"
        mode="inline"

        onOpenChange={this.handleOpenChange}
        defaultOpenKeys={['firstOne']}

       >

       <Menu.Item key="workbench">
        <Link to={`/accountSet/${this.props.accountSet.id}/workbench`}><Icon type="solution" style={{marginRight:"20px"}}/><span>工作台</span></Link>
      </Menu.Item>

        
        {filteredNoGroupMenuItems(targetObject,this).map((item)=>(renderMenuItem(item)))}
        {filteredMenuItemsGroup(targetObject,this).map((groupedMenuItem,index)=>{
          return(
    <SubMenu id={`submenu-vg${index}`}  key={`vg${index}`} title={<span><Icon type={viewGroupIconNameOf('account_set',`${groupedMenuItem.viewGroup}`)} style={{marginRight:"20px"}} /><span>{`${groupedMenuItem.viewGroup}`}</span></span>} >
      {groupedMenuItem.subItems.map((item)=>(renderMenuItem(item)))}  
    </SubMenu>

        )}
        )}



           </Menu>
    )
  }

  getSelectedRows=()=>{
    const {state} = this.props.location

    if(!state){
      return null
    }
    if(!state.selectedRows){
      return null
    }
    if(state.selectedRows.length === 0){
      return null
    }
    return state.selectedRows[0]

  }

  getOwnerId=()=>{
    const {state} = this.props.location

    if(!state){
      return null
    }
    if(!state.ownerId){
      return null
    }

    return state.ownerId

  }



  getAccountingSubjectSearch = () => {
    const {AccountingSubjectSearch} = GlobalComponents;
    const userContext = null
    return connect(state => ({
      rule: state.rule,
      name: window.mtrans('accounting_subject','account_set.accounting_subject_list',false),
      role: "accountingSubject",
      data: state._accountSet.accountingSubjectList,
      metaInfo: state._accountSet.accountingSubjectListMetaInfo,
      count: state._accountSet.accountingSubjectCount,
      returnURL: `/accountSet/${state._accountSet.id}/workbench`,
      currentPage: state._accountSet.accountingSubjectCurrentPageNumber,
      searchFormParameters: state._accountSet.accountingSubjectSearchFormParameters,
      searchParameters: {...state._accountSet.searchParameters},
      expandForm: state._accountSet.expandForm,
      loading: state._accountSet.loading,
      partialList: state._accountSet.partialList,
      owner: { type: '_accountSet', id: state._accountSet.id,
      referenceName: 'accountSet',
      listName: 'accountingSubjectList', ref:state._accountSet,
      listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(AccountingSubjectSearch)
  }

  getAccountingSubjectCreateForm = () => {
   	const {AccountingSubjectCreateForm} = GlobalComponents;
   	const userContext = null
    return connect(state => ({
      rule: state.rule,
      initValue: this.getSelectedRows(),
      role: "accountingSubject",
      data: state._accountSet.accountingSubjectList,
      metaInfo: state._accountSet.accountingSubjectListMetaInfo,
      count: state._accountSet.accountingSubjectCount,
      returnURL: `/accountSet/${state._accountSet.id}/list`,
      currentPage: state._accountSet.accountingSubjectCurrentPageNumber,
      searchFormParameters: state._accountSet.accountingSubjectSearchFormParameters,
      loading: state._accountSet.loading,
      owner: { type: '_accountSet', id: state._accountSet.id || this.getOwnerId(), referenceName: 'accountSet', listName: 'accountingSubjectList', ref:state._accountSet, listDisplayName: appLocaleName(userContext,"List")}, // this is for model namespace and
    }))(AccountingSubjectCreateForm)
  }

  getAccountingSubjectUpdateForm = () => {
    const userContext = null
  	const {AccountingSubjectUpdateForm} = GlobalComponents;
    return connect(state => ({
      selectedRows: state._accountSet.selectedRows,
      role: "accountingSubject",
      currentUpdateIndex: state._accountSet.currentUpdateIndex || 0,
      owner: { type: '_accountSet', id: state._accountSet.id || this.getOwnerId(), listName: 'accountingSubjectList', ref:state._accountSet, listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(AccountingSubjectUpdateForm)
  }

  getAccountingPeriodSearch = () => {
    const {AccountingPeriodSearch} = GlobalComponents;
    const userContext = null
    return connect(state => ({
      rule: state.rule,
      name: window.mtrans('accounting_period','account_set.accounting_period_list',false),
      role: "accountingPeriod",
      data: state._accountSet.accountingPeriodList,
      metaInfo: state._accountSet.accountingPeriodListMetaInfo,
      count: state._accountSet.accountingPeriodCount,
      returnURL: `/accountSet/${state._accountSet.id}/workbench`,
      currentPage: state._accountSet.accountingPeriodCurrentPageNumber,
      searchFormParameters: state._accountSet.accountingPeriodSearchFormParameters,
      searchParameters: {...state._accountSet.searchParameters},
      expandForm: state._accountSet.expandForm,
      loading: state._accountSet.loading,
      partialList: state._accountSet.partialList,
      owner: { type: '_accountSet', id: state._accountSet.id,
      referenceName: 'accountSet',
      listName: 'accountingPeriodList', ref:state._accountSet,
      listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(AccountingPeriodSearch)
  }

  getAccountingPeriodCreateForm = () => {
   	const {AccountingPeriodCreateForm} = GlobalComponents;
   	const userContext = null
    return connect(state => ({
      rule: state.rule,
      initValue: this.getSelectedRows(),
      role: "accountingPeriod",
      data: state._accountSet.accountingPeriodList,
      metaInfo: state._accountSet.accountingPeriodListMetaInfo,
      count: state._accountSet.accountingPeriodCount,
      returnURL: `/accountSet/${state._accountSet.id}/list`,
      currentPage: state._accountSet.accountingPeriodCurrentPageNumber,
      searchFormParameters: state._accountSet.accountingPeriodSearchFormParameters,
      loading: state._accountSet.loading,
      owner: { type: '_accountSet', id: state._accountSet.id || this.getOwnerId(), referenceName: 'accountSet', listName: 'accountingPeriodList', ref:state._accountSet, listDisplayName: appLocaleName(userContext,"List")}, // this is for model namespace and
    }))(AccountingPeriodCreateForm)
  }

  getAccountingPeriodUpdateForm = () => {
    const userContext = null
  	const {AccountingPeriodUpdateForm} = GlobalComponents;
    return connect(state => ({
      selectedRows: state._accountSet.selectedRows,
      role: "accountingPeriod",
      currentUpdateIndex: state._accountSet.currentUpdateIndex || 0,
      owner: { type: '_accountSet', id: state._accountSet.id || this.getOwnerId(), listName: 'accountingPeriodList', ref:state._accountSet, listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(AccountingPeriodUpdateForm)
  }

  getAccountingDocumentTypeSearch = () => {
    const {AccountingDocumentTypeSearch} = GlobalComponents;
    const userContext = null
    return connect(state => ({
      rule: state.rule,
      name: window.mtrans('accounting_document_type','account_set.accounting_document_type_list',false),
      role: "accountingDocumentType",
      data: state._accountSet.accountingDocumentTypeList,
      metaInfo: state._accountSet.accountingDocumentTypeListMetaInfo,
      count: state._accountSet.accountingDocumentTypeCount,
      returnURL: `/accountSet/${state._accountSet.id}/workbench`,
      currentPage: state._accountSet.accountingDocumentTypeCurrentPageNumber,
      searchFormParameters: state._accountSet.accountingDocumentTypeSearchFormParameters,
      searchParameters: {...state._accountSet.searchParameters},
      expandForm: state._accountSet.expandForm,
      loading: state._accountSet.loading,
      partialList: state._accountSet.partialList,
      owner: { type: '_accountSet', id: state._accountSet.id,
      referenceName: 'accountingPeriod',
      listName: 'accountingDocumentTypeList', ref:state._accountSet,
      listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(AccountingDocumentTypeSearch)
  }

  getAccountingDocumentTypeCreateForm = () => {
   	const {AccountingDocumentTypeCreateForm} = GlobalComponents;
   	const userContext = null
    return connect(state => ({
      rule: state.rule,
      initValue: this.getSelectedRows(),
      role: "accountingDocumentType",
      data: state._accountSet.accountingDocumentTypeList,
      metaInfo: state._accountSet.accountingDocumentTypeListMetaInfo,
      count: state._accountSet.accountingDocumentTypeCount,
      returnURL: `/accountSet/${state._accountSet.id}/list`,
      currentPage: state._accountSet.accountingDocumentTypeCurrentPageNumber,
      searchFormParameters: state._accountSet.accountingDocumentTypeSearchFormParameters,
      loading: state._accountSet.loading,
      owner: { type: '_accountSet', id: state._accountSet.id || this.getOwnerId(), referenceName: 'accountingPeriod', listName: 'accountingDocumentTypeList', ref:state._accountSet, listDisplayName: appLocaleName(userContext,"List")}, // this is for model namespace and
    }))(AccountingDocumentTypeCreateForm)
  }

  getAccountingDocumentTypeUpdateForm = () => {
    const userContext = null
  	const {AccountingDocumentTypeUpdateForm} = GlobalComponents;
    return connect(state => ({
      selectedRows: state._accountSet.selectedRows,
      role: "accountingDocumentType",
      currentUpdateIndex: state._accountSet.currentUpdateIndex || 0,
      owner: { type: '_accountSet', id: state._accountSet.id || this.getOwnerId(), listName: 'accountingDocumentTypeList', ref:state._accountSet, listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(AccountingDocumentTypeUpdateForm)
  }


  getRequestTypeStepForm = () => {
    const userContext = null
  	 const {ChangeRequestStepForm} = GlobalComponents
    return connect(state => ({
      selectedRows: state._accountSet.selectedRows,
      role: "cq",
      currentUpdateIndex: state._accountSet.currentUpdateIndex,
      owner: { type: '_accountSet', id: state._accountSet.id, listName: 'nolist', ref:state._accountSet, listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(ChangeRequestStepForm)
  }



  getPageTitle = () => {
    // const { location } = this.props
    // const { pathname } = location
    const title = '双链小超全流程供应链系统'
    return title
  }

  buildRouters = () =>{
    const {AccountSetWorkbench} = GlobalComponents

    const {AccountSetDashboard} = GlobalComponents
  	const {AccountSetPermission} = GlobalComponents
  	const {AccountSetProfile} = GlobalComponents


    const routers=[
    {path:"/accountSet/:id/workbench", component: AccountSetWorkbench},
    {path:"/accountSet/:id/dashboard", component: AccountSetDashboard},
  	{path:"/accountSet/:id/profile", component: AccountSetProfile},
  	{path:"/accountSet/:id/permission", component: AccountSetPermission},



  	{path:"/accountSet/:id/list/accountingSubjectList", component: this.getAccountingSubjectSearch()},
  	{path:"/accountSet/:id/list/accountingSubjectCreateForm", component: this.getAccountingSubjectCreateForm()},
  	{path:"/accountSet/:id/list/accountingSubjectUpdateForm", component: this.getAccountingSubjectUpdateForm()},
 
  	{path:"/accountSet/:id/list/accountingPeriodList", component: this.getAccountingPeriodSearch()},
  	{path:"/accountSet/:id/list/accountingPeriodCreateForm", component: this.getAccountingPeriodCreateForm()},
  	{path:"/accountSet/:id/list/accountingPeriodUpdateForm", component: this.getAccountingPeriodUpdateForm()},
 
  	{path:"/accountSet/:id/list/accountingDocumentTypeList", component: this.getAccountingDocumentTypeSearch()},
  	{path:"/accountSet/:id/list/accountingDocumentTypeCreateForm", component: this.getAccountingDocumentTypeCreateForm()},
  	{path:"/accountSet/:id/list/accountingDocumentTypeUpdateForm", component: this.getAccountingDocumentTypeUpdateForm()},
 

  	]

  	const {extraRoutesFunc} = this.props;
  	const extraRoutes = extraRoutesFunc?extraRoutesFunc():[]
  	const finalRoutes = routers.concat(extraRoutes)

  	return (<Switch>
             {finalRoutes.map((item)=>(<Route key={item.path} path={item.path} component={item.component} />))}
  	  	</Switch>)


  }


  handleOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    this.setState({
      openKeys: latestOpenKey ? [latestOpenKey] : [],
    })
  }
   toggle = () => {
     const { collapsed } = this.props
     this.props.dispatch({
       type: 'global/changeLayoutCollapsed',
       payload: !collapsed,
     })
   }

   toggleSwitchText=()=>{
    const { collapsed } = this.props
    if(collapsed){
      return "打开菜单"
    }
    return "关闭菜单"

   }

    logout = () => {

    console.log("log out called")
    this.props.dispatch({ type: 'launcher/signOut' })
  }
   render() {
     // const { collapsed, fetchingNotices,loading } = this.props
     const { collapsed } = this.props


     const targetApp = sessionObject('targetApp')
     const currentBreadcrumb =targetApp?sessionObject(targetApp.id):[];
     const userContext = null
     const renderBreadcrumbText=(value)=>{
     	if(value==null){
     		return "..."
     	}
     	if(value.length < 10){
     		return value
     	}

     	return value.substring(0,10)+"..."


     }
     const menuProps = collapsed ? {} : {
       openKeys: this.state.openKeys,
     }
     const renderBreadcrumbMenuItem=(breadcrumbMenuItem)=>{

      return (
      <Menu.Item key={breadcrumbMenuItem.link}>
      <Link key={breadcrumbMenuItem.link} to={`${breadcrumbMenuItem.link}`} className={styles.breadcrumbLink}>
        <Icon type="heart" style={{marginRight:"10px",color:"red"}} />
        {renderBreadcrumbText(breadcrumbMenuItem.name)}
      </Link></Menu.Item>)

     }
     const breadcrumbMenu=()=>{
      const currentBreadcrumb =targetApp?sessionObject(targetApp.id):[];
      return ( <Menu mode="vertical">
      {currentBreadcrumb.map(item => renderBreadcrumbMenuItem(item))}
      </Menu>)


     }
     const breadcrumbBar=()=>{
      const currentBreadcrumb =targetApp?sessionObject(targetApp.id):[];
      return ( <div mode="vertical">
      {currentBreadcrumb.map(item => renderBreadcrumbBarItem(item))}
      </div>)


     }


	const jumpToBreadcrumbLink=(breadcrumbMenuItem)=>{
      const { dispatch} = this.props
      const {name,link} = breadcrumbMenuItem
      dispatch({ type: 'breadcrumb/jumpToLink', payload: {name, link }} )

     }

	 const removeBreadcrumbLink=(breadcrumbMenuItem)=>{
      const { dispatch} = this.props
      const {link} = breadcrumbMenuItem
      dispatch({ type: 'breadcrumb/removeLink', payload: { link }} )

     }

     const renderBreadcrumbBarItem=(breadcrumbMenuItem)=>{

      return (
     <Tag
      	key={breadcrumbMenuItem.link} color={breadcrumbMenuItem.selected?"#108ee9":"grey"}
      	style={{marginRight:"1px",marginBottom:"1px"}} closable onClose={()=>removeBreadcrumbLink(breadcrumbMenuItem)} >
        <span onClick={()=>jumpToBreadcrumbLink(breadcrumbMenuItem)}>
        	{renderBreadcrumbText(breadcrumbMenuItem.name)}
        </span>
      </Tag>)

     }



     const { Search } = Input;
     const showSearchResult=()=>{

        this.setState({showSearch:true})

     }
     const searchChange=(evt)=>{

      this.setState({searchKeyword :evt.target.value})

    }
    const hideSearchResult=()=>{

      this.setState({showSearch:false})

    }

    const {searchLocalData}=GlobalComponents.AccountSetBase

    const renderMenuSwitch=()=>{
      const  text = collapsed?"开启左侧菜单":"关闭左侧菜单"
      const icon = collapsed?"pic-left":"pic-center"

      return (

        <Tooltip placement="bottom" title={text}>


      <a  className={styles.menuLink} onClick={()=>this.toggle()} style={{marginLeft:"20px",minHeight:"20px"}}>
        <Icon type={icon} style={{marginRight:"10px"}}/>
      </a>  </Tooltip>)

     }


       const layout = (
     <Layout>
 		<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>

        <Row type="flex" justify="start" align="bottom">

        <Col {...naviBarResponsiveStyle} >
          <a className={styles.menuLink}  style={{fontSize:"20px"}}>{currentAppName()}</a>

        </Col>
        <Col  className={styles.searchBox} {...searchBarResponsiveStyle}  >
         <Search size="default" placeholder="请输入搜索条件, 查找功能，数据和词汇解释，关闭请点击搜索结果空白处"
            enterButton onFocus={()=>showSearchResult()} onChange={(evt)=>searchChange(evt)}
            style={{ marginLeft:"10px",marginTop:"7px",width:"100%"}} />
          </Col>
          <Col  {...userBarResponsiveStyle}  >
          <Row>
          <Col  span={10}  > </Col>
          <Col  span={2}  >  {renderMenuSwitch()}</Col>
          <Col  span={6}  >
	          <Dropdown overlay={<SwitchAppMenu {...this.props} />} style={{marginRight:"100px"}} className={styles.right}>
                <a  className={styles.menuLink} >
                <Icon type="appstore" style={{marginRight:"5px"}}/>切换应用
                </a>
              </Dropdown>
          </Col>

          <Col  span={6}  >
            <Dropdown overlay= { <TopMenu {...this.props} />} className={styles.right}>
                <a  className={styles.menuLink}>
                <Icon type="user" style={{marginRight:"5px"}}/>账户
                </a>
            </Dropdown>
            </Col>

          </Row>
            </Col>
         </Row>
        </Header>
       <Layout style={{  marginTop: 44 }}>


       <Layout>

      {this.state.showSearch&&(

        <div style={{backgroundColor:'black'}}  onClick={()=>hideSearchResult()}  >{searchLocalData(this.props.accountSet,this.state.searchKeyword)}</div>

      )}
       </Layout>


         <Layout>
       <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="md"
          onCollapse={() => this.onCollapse(collapsed)}
          collapsedWidth={50}
          className={styles.sider}
        >

         {this.getNavMenuItems(this.props.accountSet,"inline","dark")}

        </Sider>

         <Layout>
         <Layout><Row type="flex" justify="start" align="bottom">{breadcrumbBar()} </Row></Layout>

           <Content style={{ margin: '24px 24px 0', height: '100%' }}>

           {this.buildRouters()}
           </Content>
          </Layout>
          </Layout>
        </Layout>
      </Layout>
     )
     return (
       <DocumentTitle title={this.getPageTitle()}>
         <ContainerQuery query={query}>
           {params => <div className={classNames(params)}>{layout}</div>}
         </ContainerQuery>
       </DocumentTitle>
     )
   }
}

export default connect(state => ({
  collapsed: state.global.collapsed,
  fetchingNotices: state.global.fetchingNotices,
  notices: state.global.notices,
  accountSet: state._accountSet,
  ...state,
}))(AccountSetBizApp)



