import React, { Component, PropTypes } from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { host, hosts } from 'config/constants';
import { generateAuthFields } from 'helpers/util';

export default class CardUploadPro extends Component {
  static propTypes = {
    type: PropTypes.number.isRequired,
    valuePic: PropTypes.string,
    onChange: PropTypes.func,
  }
  state = {
    fileList: [],
    uploadBox: null
  }
  componentDidMount() {

    this.initUploadBox(this.props.valuePic);
  }
  componentWillReceiveProps(nextProps) {

    const { valuePic } = nextProps;

    if (this.props.valuePic !== valuePic) {
      setTimeout(() => {
        this.initUploadBox(valuePic);
      }, 500);
    }
    
  }
  handleChange({file, fileList}) {
    const { onChange } = this.props;
    if (fileList.length === 0) { // 删除文件
      // onChange && onChange('');
      setTimeout(() => {
        this.showUploadBox();
      }, 500);
    } else { // 添加文件
      const response = file.response;
      if (response) {
        onChange && onChange(response.data);
        this.props.setImgKeyIn(response.data)
        return this.setState({fileList}, ::this.hideUploadBox);
      }
    }
    this.setState({fileList});
  }
  initUploadBox(valuePic) {
    const uploadBox = this._upload.getElementsByClassName('ant-upload ant-upload-select ant-upload-select-picture-card')[0];
    if (valuePic) {
      uploadBox.style.display = 'none';
      if (!this.state.fileList.length) {
        this.setState({uploadBox, fileList: [{
          uid: -1,
          name: valuePic,
          status: 'done',
          url: valuePic,
          thumbUrl: valuePic,
        }]});
      }
    } else {
      this.setState({uploadBox, fileList: []}, ::this.showUploadBox);
    }
  }
  showUploadBox() {
    this.state.uploadBox.style.display = 'inline-block';
  }
  hideUploadBox() {
    this.state.uploadBox.style.display = 'none';
  }
  getUrls() {
    return this.state.fileList.map(file => file.response.data.url).join(',');
  }
  clear() {
    this.setState({...this.state, fileList: []}, () => {
      setTimeout(::this.showUploadBox, 500);
    });
  }
  render() {
    const { type } = this.props;
    let authFields = generateAuthFields();
    const props = {
      action: `${hosts}/loadImagetoNgix`,
      listType: 'picture-card',
      name: 'img',
      data: { ...authFields, type },
      fileList: this.state.fileList,
      onChange: ::this.handleChange
    }
    return (
      <div className="clearfix" ref={upload => this._upload = upload} style={{width: '104px', position: 'relative'}}>
        <Upload {...props}>
          <Icon type="plus" />
          <div>上传照片</div>
          <div style={{width: '100%', height: '100%', position: 'absolute', top: '0', left: '0'}}></div>
        </Upload>
      </div>
    );
  }
}
