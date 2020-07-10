import React, { Component } from 'react'
import { connect } from 'dva';
import { SearchBar, Modal, Menu, Toast} from 'antd-mobile';
import HomeCarousel from '../../components/home-tabbar/home-tabber-carousel'
import router from 'umi/router';
import styles from './index.less';

class ClassPage extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
   const  bannerList = [
      {
        "isShow":1,
        "url":null,
        "imageUrl":"../../../assets/商城轮播1.png",
        "comment":"仅做展示"},
        {
          "isShow":1,
          "url":null,
          "imageUrl":"../../../assets/banner2.png",
          "comment":"仅做展示"}
      ];
    return (
      <div className={styles.classPage}>
        <div className={styles.homePage_search}>
            <div className={styles.homePage_input}>
              <SearchBar
                placeholder="搜索"
                ref={ref => this.manualFocusInst = ref}
                onFocus={() => router.push('/search')}
              />
            </div>
            <div className={styles.homePage_search_ico} onClick={() => router.push('/type')}>
              <img src={require('../../assets/icon-classify.png')}/>
            </div>
            {
            bannerList && bannerList.length !== 0 ?
              <HomeCarousel bannerItem={bannerList} isClass={true}/>
              : ""
            }
        </div>
        <div className={styles.classPageImg}>
           {/* iiii */}
        </div>
      </div>
    )
  }
}


export default ClassPage;
