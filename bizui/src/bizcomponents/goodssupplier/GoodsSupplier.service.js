
import { get,put,postForm,PREFIX,joinParameters,joinPostParameters } from '../../axios/tools'

const view = (targetObjectId) => {
  return get({
    url: `${PREFIX}goodsSupplierManager/view/${targetObjectId}/`,
  })
}
const analyze = (targetObjectId) => {
  return get({
    url: `${PREFIX}goodsSupplierManager/analyze/${targetObjectId}/`,
  })
}



const load = (targetObjectId, parameters) => {
  const parametersExpr = joinParameters(parameters)
  return get({
    url: `${PREFIX}goodsSupplierManager/loadGoodsSupplier/${targetObjectId}/${parametersExpr}/`,
  })
}


const queryCandidates = ({scenarioCode,ownerType,ownerId,listType,groupBy,filterKey,targetType}) => {
  
  const url = `${PREFIX}goodsSupplierManager/queryCandidates/`
  const data = JSON.stringify({scenarioCode,ownerType,ownerId,listType,groupBy,targetType,filterKey})
  console.log("requestParameters",data)
  return put({url,data})
} 


const requestCandidateBelongTo = (ownerClass, id, filterKey, pageNo) => {
 
  const url = `${PREFIX}goodsSupplierManager/requestCandidateBelongTo/ownerClass/id/filterKey/pageNo/`
  const requestParameters = {id, ownerClass,filterKey, pageNo}
  return postForm({url,requestParameters})
}	

const transferToAnotherBelongTo = (id, parameters) => {
  const url = `${PREFIX}goodsSupplierManager/transferToAnotherBelongTo/id/anotherBelongToId/`
  const requestParameters = {id, ...parameters}
  return postForm({url,requestParameters})
}







const addSupplierProduct = (targetObjectId, parameters) => {
  const url = `${PREFIX}goodsSupplierManager/addSupplierProduct/goodsSupplierId/productName/productDescription/productUnit/tokensExpr/`
  const goodsSupplierId = targetObjectId
  const requestParameters = { ...parameters, goodsSupplierId, tokensExpr: 'none' }
  return postForm({ url,requestParameters})
}

const updateSupplierProduct = (targetObjectId, parameters) => {
  const url = `${PREFIX}goodsSupplierManager/updateSupplierProductProperties/goodsSupplierId/id/productName/productDescription/productUnit/tokensExpr/`
  const goodsSupplierId = targetObjectId
  const requestParameters = { ...parameters, goodsSupplierId, tokensExpr: 'none' }
  return postForm({ url,requestParameters})
}

const removeSupplierProductList = (targetObjectId, parameters) => {
  const url = `${PREFIX}goodsSupplierManager/removeSupplierProductList/goodsSupplierId/supplierProductIds/tokensExpr/`
  const requestParameters = { ...parameters, goodsSupplierId: targetObjectId, tokensExpr: 'none' }
  return postForm({ url,requestParameters})
}



const addSupplyOrder = (targetObjectId, parameters) => {
  const url = `${PREFIX}goodsSupplierManager/addSupplyOrder/goodsSupplierId/buyerId/title/totalAmount/tokensExpr/`
  const goodsSupplierId = targetObjectId
  const requestParameters = { ...parameters, goodsSupplierId, tokensExpr: 'none' }
  return postForm({ url,requestParameters})
}

const updateSupplyOrder = (targetObjectId, parameters) => {
  const url = `${PREFIX}goodsSupplierManager/updateSupplyOrderProperties/goodsSupplierId/id/title/totalAmount/tokensExpr/`
  const goodsSupplierId = targetObjectId
  const requestParameters = { ...parameters, goodsSupplierId, tokensExpr: 'none' }
  return postForm({ url,requestParameters})
}

const removeSupplyOrderList = (targetObjectId, parameters) => {
  const url = `${PREFIX}goodsSupplierManager/removeSupplyOrderList/goodsSupplierId/supplyOrderIds/tokensExpr/`
  const requestParameters = { ...parameters, goodsSupplierId: targetObjectId, tokensExpr: 'none' }
  return postForm({ url,requestParameters})
}



const addAccountSet = (targetObjectId, parameters) => {
  const url = `${PREFIX}goodsSupplierManager/addAccountSet/goodsSupplierId/name/yearSet/effectiveDate/accountingSystem/domesticCurrencyCode/domesticCurrencyName/openingBank/accountNumber/countryCenterId/retailStoreId/tokensExpr/`
  const goodsSupplierId = targetObjectId
  const requestParameters = { ...parameters, goodsSupplierId, tokensExpr: 'none' }
  return postForm({ url,requestParameters})
}

const updateAccountSet = (targetObjectId, parameters) => {
  const url = `${PREFIX}goodsSupplierManager/updateAccountSetProperties/goodsSupplierId/id/name/yearSet/effectiveDate/accountingSystem/domesticCurrencyCode/domesticCurrencyName/openingBank/accountNumber/tokensExpr/`
  const goodsSupplierId = targetObjectId
  const requestParameters = { ...parameters, goodsSupplierId, tokensExpr: 'none' }
  return postForm({ url,requestParameters})
}

const removeAccountSetList = (targetObjectId, parameters) => {
  const url = `${PREFIX}goodsSupplierManager/removeAccountSetList/goodsSupplierId/accountSetIds/tokensExpr/`
  const requestParameters = { ...parameters, goodsSupplierId: targetObjectId, tokensExpr: 'none' }
  return postForm({ url,requestParameters})
}



// Filter this out when no functions

const  listFunctions = () => {
  return get({
    url: `${PREFIX}goodsSupplierService/listFunctions/`,
  })
}


const  initRequest = (data) => {

  return put({
    url: `${PREFIX}goodsSupplierService/init/`,
    data,
  })
}

const  saveRequest = (data) => {

  return put({
    url: `${PREFIX}goodsSupplierService/save/`,
    data,
  })
}


const  processRequest = (data) => {

  return put({
    url: `${PREFIX}goodsSupplierService/process/`,
    data,
  })
}

const GoodsSupplierService = { view,
  load,
  analyze,
  addSupplierProduct,
  addSupplyOrder,
  addAccountSet,
  updateSupplierProduct,
  updateSupplyOrder,
  updateAccountSet,
  removeSupplierProductList,
  removeSupplyOrderList,
  removeAccountSetList,
  requestCandidateBelongTo,
  transferToAnotherBelongTo, listFunctions, saveRequest,initRequest, processRequest, queryCandidates}
export default GoodsSupplierService

