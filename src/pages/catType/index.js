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
      <div className={styles.typePage}>
          <div className={styles.searchTop}>
            <a onClick={() => router.push('/class')}>
                <Icon 
                    type='left' 
                    className={styles.backIcon}
                />
            </a>
            <SearchBar placeholder="搜索宠物商品" maxLength={8}  className={styles.searchInput} onFocus={() => router.push('/search')} />
          </div>
          <a onClick={() => router.push('/catFood')}>
                <div className={styles.typePageImg1}>
                </div>
          </a>
      </div>
    )
  }
}


export default Type;
