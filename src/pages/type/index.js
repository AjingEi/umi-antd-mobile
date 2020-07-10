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
    const tabs = [
        { title: '狗狗', sub: 1 },
        { title: '猫猫', sub: 2 },
        { title: '其他', sub: 3 },
      ];
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
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => {}}
          onTabClick={(tab, index) => {  }}
          className={styles.tabColor} 
        >
          
                <div className={styles.typePageImg1}>
                </div>
          
          <a onClick={() => router.push('/catType')}>
                <div className={styles.typePageImg2}>
                </div>
                </a>
          <div style={{ backgroundColor: '#fff' }}>
                <div className={styles.typePageImg3}>
                </div>
          </div>
        </Tabs>
      </div>
    )
  }
}


export default Type;
