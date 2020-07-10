import React, { Component } from 'react'
import { connect } from 'dva';
import { Modal, Toast } from 'antd-mobile';
import NameCard from '../../components/name-card';
import OrderStatus from '../../components/order-status';
import router from 'umi/router';
import styles from './index.less';

@connect(({ my }) => ({ my }))
class MyIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowdata: 0,
      name: '登录/注册',
      avatar:'',
      not_login: false,
      userId: '',
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      userId: localStorage.getItem('user') ? Number(JSON.parse(localStorage.getItem('user'))): ''
    })
    // console.log(Number(JSON.parse(localStorage.getItem('user'))))

  }
  quitAccount = () => {
    localStorage.removeItem('user');
    Toast.success('退出登陆成功', 1)
    this.setState({
      userId: ''
    })
  }
  linkurl(v){
    if (v === 'address') {
      console.log('去地址管理咯')
    } else {
      console.log('去支付账户管理咯')
    }
  }
  render() {
    const { my } = this.props;
    const { userId } = this.state;
    return (
      <div className={styles.content_me}>
        <NameCard
          name={userId ? userId : '登录/注册'}
          avatar={this.state.avatar}
          notLogin={userId ? 1 : 0}
        />
        {/* { !userId && <OrderStatus countList={0} />}
        { userId && <OrderStatus countList={my.list.data} />} */}
        {
          userId && (
            <div className={styles.service_info + ' ' + 'box_shadow'}>
              <div className={styles.service_title + ' ' + 'border_bottommin'}>我的服务</div>
              <div className={styles.service_content}>
                <div className={styles.service_item} onClick={() => router.push("/shopCar")}>
                  <img
                    className={styles.service_img}
                    src={require('../../assets/购物车icon.png')}
                    alt=""
                  />
                  <div className={styles.service_text}>购物车</div>
                </div>
                <div className={styles.service_item} onClick={() => router.push("/animalList")}>
                  <img
                    className={styles.service_img}
                    src={require('../../assets/recycleH5_18.png')}
                    alt=""
                  />
                  <div className={styles.service_text}>宠物列表</div>
                </div>
                <div className={styles.service_item} onClick={() => router.push("/addAnimal")}>
                  <img
                    className={styles.service_img}
                    src={require('../../assets/recycleH5_19.png')}
                    alt=""
                  />
                  <div className={styles.service_text}>发布宠物</div>
                </div>
              </div>
            </div>
          )
        }
        
        { userId && 
        <a onClick={this.quitAccount}>
          <div className={styles.service_info + ' ' + 'box_shadow'}>
            <div className={styles.quit_Button}>退出登陆</div>
          </div>
        </a>}
       
      </div>
    )
  }
}
export default MyIndex;
