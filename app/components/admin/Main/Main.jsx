import React, {PropTypes} from 'react';
import {Match} from 'react-router';
import {USER_TYPE} from 'config/constants';
import store from 'config/store';
import * as styles from './styles.css';

import {
    HomeContainer,
    SidebarContainer,
    InitActivitiesContainer,
    LaunchContainer,
    ActivilistContainer,
    MarketManageContainer,
    MonitorContainer
} from 'containers/admin';

import { MemberTagContainer,CommodityTagContainer,MarketTagContainer, AddNewTagContainer, AddNewNameContainer } from 'containers/admin/TagManagement';

import { DataExpressionContainer } from 'containers/admin/DataReports';

import {
    BuyerSimilarContainer,
    GoodsClassSimilarContainer,
} from 'containers/admin/FansProfile';

import {
    ShopperPortrait,
    ChannelAnalysis,
    ProductAnalysis,
    TicketUsageAnalysis
} from 'components/admin/DataReports';

import {
    Fans,
    FansType
} from 'components/admin/FansReports';

import {
  FansContrastContainer,

  EffectContrastContainer
} from 'containers/admin/ActivityAnalysis';

import { CouponPublish, ActivityInfo } from 'components/admin';

import { SubResultContainer, PredictionContainer, ResultContainer } from 'containers/admin/Marketing';
import {MarketUpsertFormContainer} from 'containers/admin/MarketManage';

const {BRANDLER, RETAILER, MIYA} = USER_TYPE;

const MatchWhenIsNotBrandler = ({
    component: Component,
    userType,
    ...rest
}) => (
    <Match {...rest} render={props => userType !== BRANDLER.value
        ? <Component {...props}/>
        : null}/>
);

const MatchWhenIsNotRetailer = ({
    component: Component,
    userType,
    ...rest
}) => (
    <Match {...rest} render={props => userType !== RETAILER.value
        ? <Component {...props}/>
        : null}/>
);

const MatchWhenIsMiya = ({
    component: Component,
    userType,
    ...rest
}) => (
    <Match {...rest} render={props => userType === MIYA.value
        ? <Component {...props}/>
        : null}/>
);


const MatchWhenPath = ({
    component: Component,
    returnConfig,
    ...rest
}) => (
    <Match {...rest}
        render={ props => <Component {...props} returnConfig={returnConfig}/> }
    />
);


export default function Main({userType, tabKey, className, handleReturn}) {
    return (
        <div className={className}>

            <Match exactly pattern="/admin" component={HomeContainer}/>
            <Match pattern="/admin/analysis/select" component={ActivityInfo}/>
            <Match pattern="/admin/monitor/monitor" component={MonitorContainer}/>


            <div className={styles.content}>
                {
                    tabKey == 'home' || tabKey == 'monitor' ? null : <SidebarContainer/>
                }

                <div className={styles.main}>

                    <Match pattern="/admin/activity/activity" component={InitActivitiesContainer}/>
                    <MatchWhenPath pattern="/admin/activity/forecast" component={PredictionContainer} returnConfig={handleReturn}/>
                    <MatchWhenPath pattern="/admin/activity/result" component={ResultContainer} returnConfig={handleReturn}/>
                    <MatchWhenPath pattern="/admin/activity/launch" component={LaunchContainer} returnConfig={handleReturn}/>
                    <Match pattern="/admin/activity/list" component={ActivilistContainer}/>
                    <Match pattern="/admin/activity/success" component={SubResultContainer}/>
                    <MatchWhenPath pattern="/admin/activity/publish" component={CouponPublish} returnConfig={handleReturn}/>


                    <Match pattern="/admin/analysis/expression" component={DataExpressionContainer}/>
                    <Match pattern="/admin/analysis/precipitation" component={ShopperPortrait} userType={userType}/>
                    <Match pattern="/admin/analysis/layout" component={ChannelAnalysis} userType={userType}/>
                    <Match pattern="/admin/analysis/habits" component={TicketUsageAnalysis} userType={userType}/>
                    <Match pattern="/admin/analysis/optimization" component={ProductAnalysis} userType={userType}/>





                    <Match pattern="/admin/analysis/totalFlow" component={EffectContrastContainer}/>
                    <Match pattern="/admin/analysis/contrasts" component={FansContrastContainer}/>





                    <Match pattern="/admin/management/goods" component={CommodityTagContainer}/>
                    <MatchWhenIsNotBrandler exactly pattern="/admin/management/markets" component={MarketTagContainer} userType={userType}/>
                    <MatchWhenIsNotBrandler pattern="/admin/manage/market/new" component={MarketUpsertFormContainer}/>
                    <MatchWhenIsNotBrandler pattern="/admin/manage/market/edit/:id" component={MarketUpsertFormContainer}/>


                    <Match pattern="/admin/fans/fansOverData" component={Fans}/>
                    <Match pattern="/admin/fans/fanstype" component={FansType}/>
                    <Match pattern="/admin/fans/fanstag" component={MemberTagContainer}/>
                    <MatchWhenPath pattern="/admin/fans/tagmanage" component={AddNewTagContainer} returnConfig={handleReturn}/>
                    <MatchWhenPath pattern="/admin/fans/tagaddname" component={AddNewNameContainer} returnConfig={handleReturn}/>
                
                    <Match pattern="/admin/fans/buyerSimilar" component={BuyerSimilarContainer}/>
                    <Match pattern="/admin/fans/classSimilar" component={GoodsClassSimilarContainer}/>
                    
                    
                </div>

            </div>

        </div>
    );
}
