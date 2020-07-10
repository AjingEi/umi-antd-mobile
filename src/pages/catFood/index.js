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
      <div className={styles.foodPage}>
        <a onClick={() => router.push('/catType')} className={styles.backImgA}>
                <div className={styles.backImg}>
                </div>
          </a>
          <a onClick={() => router.push('/shopCar')} className={styles.shopCarImgA}>
                <div className={styles.shopCarImg}>
                </div>
          </a>
          <div className={styles.detailImg}></div>
          <a onClick={() => router.push('/shopCar')}>
             <div className={styles.addShopCar}></div>
          </a>
      </div>
    )
  }
}


export default Type;
