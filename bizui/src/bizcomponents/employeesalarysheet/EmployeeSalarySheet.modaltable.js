
import React, { PureComponent } from 'react'
import moment from 'moment'
import { Table, Alert, Badge } from 'antd'
import styles from './EmployeeSalarySheet.table.less'
import ImagePreview from '../../components/ImagePreview'
import EmployeeSalarySheetBase from './EmployeeSalarySheet.base'
import appLocaleName from '../../common/Locale.tool'

class EmployeeSalarySheetModalTable extends PureComponent {
  render() {
    // const { data,count,current, owner } = this.props
    const { data } = this.props
	const {displayColumns} = EmployeeSalarySheetBase
	const userContext = null
	if(!data){
		return null
	}
	if(!data.length){
		return null
	}
	
    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <p>
                {appLocaleName(userContext,"Totally")} <a style={{ fontWeight: 600 }}>{data.length}</a> {appLocaleName(userContext,"Items")} 
              </p>
            )}
            type="warning"
            showIcon
          />
        </div>
        <Table
          rowKey={record => record.id}
          dataSource={data}
          columns={displayColumns}
          size="small"
          scroll={{ x: 1320 }}
        />
      </div>
    )
  }
}

export default EmployeeSalarySheetModalTable

