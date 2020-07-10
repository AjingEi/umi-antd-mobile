import React, { Component } from 'react';
import { connect } from 'dva';
import { SearchBar, Modal, Flex, Tabs, WhiteSpace, Badge, Tag, Carousel, Icon, Toast } from 'antd-mobile';
import CopyToClipboard from 'react-copy-to-clipboard';
import Link from 'umi/link';
import router from 'umi/router';
import styles from './index.less';

@connect(({ home }) => ({ home }))
class Home extends Component {
  constructor(props) {
      super(props)
      this.state = {
        item: [],
        message: '',
      }
  }
  componentDidMount = () => {
    // this.setState({
    //   message:  localStorage.getItem("list")
    // })
    // console.log(Array.from(JSON.parse(localStorage.getItem("list"))))
    // localStorage.setItem("list",JSON.stringify([{
    //   id: 11,
    //   headImg: 'default-pic.png',
    //   userName: '用户124', // 用户昵称
    //   date: '5-31',  // 日期
    //   isFollow: true, // 是否关注
    //   isGeted: true, // 是否领养
    //   animalName: '拉布拉多', // 宠物信息 昵称
    //   yimiao: '是', // 是否打疫苗
    //   year: '小于三个月', // 年龄
    //   city: '浙江杭州', // 城市
    //   getType: '家养', // 收养类型
    //   getMoney: '无偿', // 领养金额
    //   NoAfter: '是', //是否绝育
    //   NoInsect: '否', // 是否驱虫
    //   getNeeds: '只吃狗粮，有点调皮。喜欢和人互动，经过了社会化的培训，很聪明很懂事。本人因为工作原因无法继续领养了，希望同城好人', //  宠物描述
    //   phone: '15868872751', // 电话
    //   weChat: 'ajingwechat', // 微信
    //   imgUrl: ['dog1.jpeg','dog1.jpeg','dog1.jpeg',],
    // }]))
    // 'id': '11',
    //   'headImg': 'default-pic.png',
    //   'userName': '用户124',
    //   'date': '5-31',  // 日期
    //   'isFollow': 'true', // 是否关注
    //   'isGeted': 'true', // 是否领养
    //   'animalName': '拉布拉多', // 宠物信息 昵称
    //   'yimiao': '是', // 是否打疫苗
    //   'year': '小于三个月', // 年龄
    //   'city': '浙江杭州', // 城市
    //   'getType': '家养', // 收养类型
    //   'getMoney': '无偿', // 领养金额
    //   'NoAfter': '是', //是否绝育
    //   'NoInsect': '否', // 是否驱虫
    //   'getNeeds': '只吃狗粮，有点调皮。喜欢和人互动，经过了社会化的培训，很聪明很懂事。本人因为工作原因无法继续领养了，希望同城好人', //  宠物描述
    //   'phone': '15868872751', // 电话
    //   'weChat': 'ajingwechat', // 微信
    //   'imgUrl': "['dog1.jpeg','dog1.jpeg','dog1.jpeg',]",
    const id = this.props.match.params.id;
    let list = [];
    if(id<30) {
      // console.log(id)
      list = Array.from(JSON.parse(localStorage.getItem("doglist")));
    } else if(id<60) {
      // console.log(id)
      list = Array.from(JSON.parse(localStorage.getItem("catlist")));
    } else{ 
      // console.log(id)
      list = Array.from(JSON.parse(localStorage.getItem("otherlist")));
    }
    // list.length = 1;
    list.some((item)=>{
      // console.log(item.id,id)
      if(item.id == id){
        this.setState({
          item,
        })
        // console.log(item)
        return true;
      }
    })
   
  }
  onCopy = () => {
    Toast.success('复制成功', 1)
  }

  changeFollow = () => {
    let item = this.state.item;
    let arr = [];
    if(item.isFollow === true) {
      item.isFollow = false;
      arr[0] = item
      localStorage.setItem("list",JSON.stringify(arr))
      this.setState({
        item,
      },()=>{
        Toast.success('取消关注成功', 1)
      })
    } else {
      item.isFollow = true;
      arr[0] = item
      localStorage.setItem("list",JSON.stringify(arr))
      this.setState({
        item,
      },()=>{
        Toast.success('关注成功', 1)
      })
    }
  }

  render() {
    const { item, message } = this.state
    const img = 'dog1.png'
     return (
      <div className={styles.detailPage}>
           <a className={styles.leftIconPar} onClick={() => router.push(`/${this.props.match.params.page}`)}>
             <Icon className={styles.leftIcon}  type='left'></Icon>
           </a>
        <Carousel
          autoplay={false}
          infinite
          height='400px'
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
        >
          {item.fileUrls && item.fileUrls.length!=0 && item.fileUrls.map(val => (
              
              <img
                src={val? require(`../../../../assets/${val}`) : ''}
                alt=""
                style={{ verticalAlign: 'top', height: '400px',objectFit: 'cover' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
          ))}
        </Carousel>
        {/* 用户基本信息 */}
        <div className={styles.userInfo}>
          {/* 头像 */}
          <img className={styles.headImg} src={require(`../../../../assets/default-pic.png`)}></img>
          <div className={styles.userNameDate}>
            <div className={styles.userName}>{item.userId}</div>
            <div className={styles.date}>{item.date}</div>
          </div>
          <a onClick={this.changeFollow} className={styles.isFollow}>{item.isFollow ? '已关注' : '+关注'}</a>
          {/* <a onClick={()=>{
            localStorage.setItem("1","hi 我是第二条数据");
            this.setState({
              message: 'hi 我是第二条数据'
            })
          }}>++++</a>
          {message} */}
        </div>

       {/* 宠物信息线 */}
       <div className={styles.animalInfoTitle}>
         <div className={styles.animalInfoText}>宠物信息</div>
         <div className={styles.animalIsGeted}>
           <span className={item.isGeted ? '' : styles.animalGet}>待领养</span>/
           <span className={item.isGeted ? styles.animalGet : ''}>已领养</span>
          </div>
       </div>
        {/* 宠物信息 */}
        <div className={styles.animalInfo}>
          <div  className={styles.leftInfo}>
            <div>昵称: {item.animalName}</div>
            <div>年龄: {item.year}</div>
            <div>收养类型: {item.getType}</div>
            <div>绝育: {item.noAfter}</div>
            <div>驱虫: {item.noInsect}</div>
          </div>
          <div  className={styles.rightInfo}>
            <div>疫苗: {item.mianyi}</div>
            <div>城市: {item.city}</div>
            <div>领养金额: {item.getMoney}</div>
          </div>
        </div>

        {/* 宠物描述线 */}
       <div className={styles.animalInfoTitle}>
         <div className={styles.animalInfoText}>宠物描述&领养要求</div>
       </div>
       {/* 宠物具体描述 */}
       <div className={styles.animalDetail}>
         {item.animalDescribe}
       </div>

       {/* 用户联系方式 */}
       <div className={styles.userChat}>
          <img className={styles.headImg} src={require(`../../../../assets/default-pic.png`)}></img>
          <div className={styles.userNameDate}>{item.userId}</div>
          <div className={styles.phone}>
            <div className={styles.phoneNum}>电话: {item.phone}</div>
            <CopyToClipboard text={item.phone} onCopy={this.onCopy}  className={styles.copy}>
                <div>复制</div>
            </CopyToClipboard>
          </div>
          <div className={styles.phone}>
            <div className={styles.phoneNum}>微信: {item.weChat}</div> 
            <CopyToClipboard text={item.weChat} onCopy={this.onCopy} className={styles.copy}>
              <div>复制</div>
            </CopyToClipboard>
          </div>
       </div>
      </div>
    )
  }
}


export default Home;
