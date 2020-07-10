import React, { Component } from 'react';
import { connect } from 'dva';
import { SearchBar, Modal, Flex, Tabs, WhiteSpace, Badge, Tag, Icon } from 'antd-mobile';
import HomeCarousel from '../../components/home-tabbar/home-tabber-carousel'
import Link from 'umi/link';
import router from 'umi/router';
import styles from './index.less';

class Type extends Component {
  constructor(props) {
      super(props)
      this.state = {
        
      }
    }
  componentDidMount = () => {
   
  }
  render() {
    return (
      <div className={styles.carPage}>
        <a onClick={() => router.push('/catFood')}>
          <div className={styles.shopCar}></div>
        </a>
      </div>
    )
  }
}


export default Type;
