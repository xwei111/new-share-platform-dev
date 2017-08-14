import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as marketingActionCreators from 'redux/modules/marketing';
import {USER_TYPE} from 'config/constants';
import {AddTag} from 'components/admin/Marketing';
import {removeByValue} from 'helpers/util';

@connect(({marketing}) => ({
    moudleName: marketing.moudleName,
    tagData: marketing.tagData,
    selectData: marketing.selectData,
    tagVisible: marketing.tagVisible,
    selectedKeys: marketing.selectedKeys,
    targetKeys: marketing.targetKeys,
    tagDone: marketing.tagDone,
}), dispatch => bindActionCreators(marketingActionCreators, dispatch),)

export default class AddTagContainer extends Component {
    static propTypes = {
        moudleName: PropTypes.string.isRequired,
        couponVisible: PropTypes.bool.isRequired
    }

    handleTagVisible(visible) {
        const {setTagVisible} = this.props;
        setTagVisible(visible);
    }

    handleChange = (nextTargetKeys, direction, moveKeys) => {

        const {setTargetKey} = this.props;

        setTargetKey(nextTargetKeys);

    }

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {

        const {setSelectKey} = this.props;
        const keyArr = [...sourceSelectedKeys,...targetSelectedKeys]
        setSelectKey(keyArr);

    }

    deleteTag(name) {
        const {targetKeys, setTargetKey} = this.props;
        const nextKey = [];
        removeByValue(nextKey,name);
        setTargetKey(nextKey);
    }

    onAddTag() {
        const { setTagDone, closeMoudleBox, targetKeys, tagDone } = this.props;
        closeMoudleBox();
        setTagDone(targetKeys);
    }

    render() {
        return (<AddTag {...this.props} onTagVisible={:: this.handleTagVisible} onOpenMoudle={:: this.props.openMoudleBox} onCloseMoulde={:: this.onAddTag} onTreeChange={:: this.handleChange} onTreeSelect={:: this.handleSelectChange}/>);
    }
}
