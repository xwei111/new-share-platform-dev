import React, { PropTypes, Component } from 'react';
import { Form, Select, Row, Col, DatePicker } from 'antd';
import { QueryTable } from 'components/admin';
import { queriable, cardable } from 'hoc';
import { FORM_ITEM_LAYOUT, host } from 'config/constants';
import { ActivityAndMarketSelectionContainer } from 'containers/admin/ReportTables';
import { formatFrontDate, formatBackendDate } from 'helpers/util';
import { ReportDatePicker } from 'components/admin/ReportTables';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

function getQueryForm(form) {
  return (
    <Row>
      <Col span={16}>
        <ActivityAndMarketSelectionContainer form={form}/>
      </Col>
      <Col span={8}>
        <ReportDatePicker form={form}/>
      </Col>
    </Row>
  );
}

function getColumns() {
  return [
    {
      title: '单品名称',
      dataIndex: 'goodname',
      key: 'goodname'
    },
    {
      title: '销售量',
      dataIndex: 'sales',
      key: 'sales'
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date'
    }
  ];
}

const formatData = data => data.data.map(item => ({...item, date: formatFrontDate(item.date)}));
const formatTotal = data => data.totalcount;

@cardable(['单品销售量查询'])
@queriable({url: `${host}/cp/coupon/query!queryErpActiveUsedByGoods.action`, formatData, formatTotal, formatDate: true})
export default class ProductSale extends Component {
  render() {
    return (
      <QueryTable
        {...this.props}
        exportUrl={`${host}/cp/coupon/query!exportErpActiveUsedByGoods.action`}
        getQueryForm={getQueryForm}
        columns={getColumns()}/>
    );
  }
}
