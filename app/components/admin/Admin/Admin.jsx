import React from 'react';
import {Footer} from 'components/admin';
import {HeaderContainer, MainContainer} from 'containers/admin';
import * as styles from './styles.css';

export default function Admin() {
    return (
        <div className={styles.container}>
            <HeaderContainer/>
            <div className={styles.content}>
                <MainContainer className={styles.main}/>
            </div>
            <Footer/>
        </div>
    );
}
