import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import styles from './index.less'
import { connect } from 'dva';
import router from 'umi/router';

class HomeTabbarCarousel extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
      slideIndex: 0
    }
  }
  bannerLink(link){
    router.push('/class')
  }
  render() {
    const { bannerItem } = this.props;
    // console.log(bannerItem[0].imageUrl)
    return (
      <div>
        {
          this.props.isClass ? <Carousel
          autoplay={true}
          infinite
          selectedIndex={0}
          className={styles.space_carousel}
        >
        {(this.props.bannerItem ? this.props.bannerItem : []).map((val,index)  => (
          <a
            key={index}
            onClick={() => this.bannerLink(val.url)}
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={require(index === 0 ? '../../../assets/商城轮播1.png' : '../../../assets/商城轮播2.png')}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel> :<Carousel
          autoplay={true}
          infinite
          selectedIndex={0}
          className={styles.space_carousel}
        >
        {(this.props.bannerItem ? this.props.bannerItem : []).map((val,index)  => (
          <a
            key={index}
            onClick={() => this.bannerLink(val.url)}
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={require(index === 0 ? '../../../assets/banner3.png' : '../../../assets/banner4.png')}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
        }
        
      </div>
    )
  }
}

export default HomeTabbarCarousel
