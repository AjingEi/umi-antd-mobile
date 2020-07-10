import React, { Component } from 'react';
import { connect } from 'dva';
import { SearchBar, Modal, Flex, Tabs, WhiteSpace, Badge, Tag } from 'antd-mobile';
import HomeCarousel from '../../components/home-tabbar/home-tabber-carousel'
import Link from 'umi/link';
import router from 'umi/router';
import styles from './index.less';

@connect(({ home }) => ({ home }))
class Home extends Component {
  constructor(props) {
      super(props)
      this.state = {
        banner: [],
        icon: [],
        tab: [],
        bottomBanner: [],
        loinBannerList: [],
        cardLists: [],
        tofobanner: [],
        visible: false,
        dogList: [],
        catList: [],
        otherList: [],
      }
    }
  componentDidMount = () => {
    if(!localStorage.getItem('userList')){
      localStorage.setItem('userList',JSON.stringify(['15868872751','15868857694']))
    }
    if(!localStorage.getItem('catlist')){
      localStorage.setItem('catlist',JSON.stringify([{"userId":15868872751,"animalName":"当当","animalType":["猫猫","美国短毛猫"],"year":["1到3岁"],"getType":["家养"],"sex":["MM"],"noAfter":["否"],"noInsect":["是"],"mianyi":["是"],"getMoney":["无偿"],"animalDescribe":"纯种短毛猫，有点怕人，很安静。很漂亮。","fileUrls":["MD1.jpg","cat2.jpg"],"city":["浙江省","杭州市","富阳市"],"sendType":["个人"],"phone":"158 6885 7694","weChat":"yuzeyan0328","date":"2020/6/2","id":31},{"userId":15868872751,"animalName":"小不点","animalType":["猫猫","英国短毛猫"],"year":["3个月以下"],"getType":["家养"],"sex":["GG"],"noAfter":["是"],"noInsect":["是"],"mianyi":["是"],"getMoney":["有偿"],"animalDescribe":"超级可爱的短毛猫，性格活波，喜欢可以快速入手，我有鼻炎，实在不行了。","fileUrls":["yj1.jpg","yj2.jpg"],"city":["浙江省","杭州市","富阳市"],"sendType":["个人"],"phone":"158 6887 2751","weChat":"ajingwechat","date":"2020/6/3","id":32}]))
    }
    if(!localStorage.getItem('doglist')){
      localStorage.setItem('doglist',JSON.stringify([{"userId":15868872751,"animalName":"拆家哈士奇","animalType":["狗狗","哈士奇"],"year":["3个月以下"],"getType":["家养"],"sex":["GG"],"noAfter":["是"],"noInsect":["是"],"mianyi":["是"],"getMoney":["无偿"],"animalDescribe":"很可爱的哈士奇，虽然有点爱拆家，需要经常遛狗。","fileUrls":["hsq1.jpg","hsq2.jpg"],"city":["北京市","北京市"],"sendType":["个人"],"phone":"158 6887 2751","weChat":"ajingWechat","date":"2020/6/3","id":"1"}]))
    }
    if(!localStorage.getItem('otherlist')){
      localStorage.setItem('otherlist',JSON.stringify([{"userId":15868872751,"animalName":"hakuna","animalType":["其它","仓鼠"],"year":["3-6个月"],"getType":["家养"],"sex":["GG"],"noAfter":["是"],"noInsect":["是"],"mianyi":["是"],"getMoney":["无偿"],"animalDescribe":"姚琛同款貂/你值得拥有。","fileUrls":["cs1.jpg","cs2.jpg"],"city":["重庆市","重庆市","万州区"],"sendType":["个人"],"phone":"158 6887 2751","weChat":"yaochenline","date":"2020/6/3","id":"61"}]))
    }
    let dogList = localStorage.getItem('doglist') ? Array.from(JSON.parse(localStorage.getItem('doglist'))) : [];
    dogList.forEach((item)=>{
      item.tags = []
      item.tags.push(item.animalType[1])
      if(item.year[0] === '3-6个月'){
        item.tags.push(item.year[0])
      } 
      if(item.getMoney[0] === '无偿') {
        item.tags.push(item.getMoney[0])
      }
      if(item.noAfter[0] === '是' && item.tags.length<3) {
        item.tags.push('已绝育')
      }
      if(item.noInsect[0] === '是' && item.tags.length<3) {
        item.tags.push('已驱虫')
      }
      if(item.mianyi[0] === '是' && item.tags.length<3) {
        item.tags.push('已打疫苗')
      }
    })
    this.setState({
        dogList: dogList
    })
    let catList = localStorage.getItem('catlist') ? Array.from(JSON.parse(localStorage.getItem('catlist'))) : [];
    catList.forEach((item)=>{
      item.tags = []
      item.tags.push(item.animalType[1])
      if(item.year[0] === '3-6个月'){
        item.tags.push(item.year[0])
      } 
      if(item.getMoney[0] === '无偿') {
        item.tags.push(item.getMoney[0])
      }
      if(item.noAfter[0] === '是' && item.tags.length<3) {
        item.tags.push('已绝育')
      }
      if(item.noInsect[0] === '是' && item.tags.length<3) {
        item.tags.push('已驱虫')
      }
      if(item.mianyi[0] === '是' && item.tags.length<3) {
        item.tags.push('已打疫苗')
      }
    })
    this.setState({
      catList,
    })
    let otherList = localStorage.getItem('otherlist') ? Array.from(JSON.parse(localStorage.getItem('otherlist'))) : [];
    otherList.forEach((item)=>{
      item.tags = []
      item.tags.push(item.animalType[1])
      if(item.year[0] === '3-6个月'){
        item.tags.push(item.year[0])
      } 
      if(item.getMoney[0] === '无偿') {
        item.tags.push(item.getMoney[0])
      }
      if(item.noAfter[0] === '是' && item.tags.length<3) {
        item.tags.push('已绝育')
      }
      if(item.noInsect[0] === '是' && item.tags.length<3) {
        item.tags.push('已驱虫')
      }
      if(item.mianyi[0] === '是' && item.tags.length<3) {
        item.tags.push('已打疫苗')
      }
    })
    this.setState({
      otherList,
    })
  }
  render() {
    const { home } = this.props;
    // console.log(home,2)
    const { dogList, catList, otherList} = this.state;
    const tabs = [
      { title: '狗狗', sub: 1 },
      { title: '猫猫', sub: 2 },
      { title: '其他', sub: 3 },
    ];
    // const dogList = [{
    //   id: 11,
    //   animalName: '串串',
    //   tags: ['家养','无偿','3个月'],
    //   imgUrl: 'dog1.jpeg',
    // },{
    //   id: 12,
    //   animalName: '萨摩耶',
    //   tags: ['1岁','同城自提','无偿'],
    //   imgUrl: 'dog2.jpeg',
    // },{
    //   id: 13,
    //   animalName: '哈士奇',
    //   tags: ['已驱虫','已免疫','3岁'],
    //   imgUrl: 'dog3.jpeg',
    // },{
    //   id: 14,
    //   animalName: '柯基',
    //   tags: ['1岁','已免疫','有偿'],
    //   imgUrl: 'dog4.jpg',
    // },{
    //   id: 15,
    //   animalName: '比熊',
    //   tags: ['3岁','已驱虫','有偿'],
    //   imgUrl: 'dog5.jpg',
    // },{
    //   id: 16,
    //   animalName: '雪纳瑞',
    //   tags: ['2岁','家养','有偿'],
    //   imgUrl: 'dog6.jpg',
    // }];
    // const catList = [{
    //   id: 21,
    //   animalName: '纯种长毛哈士奇二哈拆家够哈哈哈',
    //   tags: ['已打疫苗','同城自提'],
    //   imgUrl: 'dog1.png',
    // },{
    //   id: 22,
    //   animalName: '纯种长毛哈士奇二哈拆家够哈哈哈',
    //   tags: ['已打疫苗','同城自提'],
    //   imgUrl: 'dog1.png',
    // },{
    //   id: 23,
    //   animalName: '拉布拉多',
    //   tags: ['已打疫苗','同城自提','同城自提'],
    //   imgUrl: 'dog1.png',
    // }];
    // const othersList = [{
    //   id: 31,
    //   animalName: '拉布拉多',
    //   tags: ['已打疫苗','同城自提'],
    //   imgUrl: 'dog1.png',
    // },{
    //   id: 32,
    //   animalName: '纯种长毛哈士奇二哈拆',
    //   tags: ['已打疫苗','同城自提'],
    //   imgUrl: 'dog1.png',
    // },{
    //   id: 33,
    //   animalName: '拉布拉多',
    //   tags: ['已打疫苗','同城自提','同城自提'],
    //   imgUrl: 'dog1.png',
    // },{
    //   id: 34,
    //   animalName: '拉布拉多',
    //   tags: ['已打疫苗','同城自提'],
    //   imgUrl: 'dog1.png',
    // }]
    return (
      <div className='homePage'>
        <div className='homePage_search'>
            <div className='homePage_input'>
              <SearchBar
                placeholder="搜索你想要的宠物"
                ref={ref => this.manualFocusInst = ref}
                onFocus={() => router.push('/search')}
              />
            </div>
            <div className='homePage_search_ico' onClick={() => router.push('/class')}>
              <img src={require('../../assets/icon-classify.png')}/>
            </div>
            {
            home.list.bannerList && home.list.bannerList.length !== 0 ?
              <HomeCarousel bannerItem={home.list.bannerList} />
              : ""
            }
        </div>
        {/* <div className='stepBlock'>
          <div className='stepBlocktitle'>四步变现</div>
          <img className='stepBlockimg' onClick={() => router.push('/class')} src={require('../../assets/recycleH5_01.png')} alt="" />
        </div>
        <div className='stepBlock hotMobileBlock'>
          <div className='stepBlocktitle'>热门机型</div>
          <Flex className='hotMobile_block'>
            <Flex.Item><div className='hotMobile' onClick={() => router.push('/class?brand=52')}><div  className='hotMobile_icon'></div>苹果</div></Flex.Item>
            <Flex.Item><div className='hotMobile' onClick={() => router.push('/class?brand=4')}><div  className='hotMobile_icon oppo'></div>OPPO</div></Flex.Item>
            <Flex.Item><div className='hotMobile' onClick={() => router.push('/class?brand=16')}><div  className='hotMobile_icon vivo'></div>VIVO</div></Flex.Item>
            <Flex.Item><div className='hotMobile' onClick={() => router.push('/class?brand=9')}><div  className='hotMobile_icon huawei'></div>华为</div></Flex.Item>
          </Flex>
        </div> */}
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => {}}
          onTabClick={(tab, index) => {  }}
          className='tabColor'
        >
          <div style={{ backgroundColor: '#fff' }}>
                <div className='itemList itemList2'>
                  <div className='hotlist'>
                    {
                        dogList.map((val)=>(
                        <div className='itemBlock' key={val.id} onClick={() => router.push(`/detail/${val.id}/home`)}>
                          <div className='product_img'>
                            <img className='img' src={require(`../../assets/${val.fileUrls[0]}`)} />
                          </div>
                          <span className='text_ellipsis'>{val.animalName}</span>
                          <div className='tagsList'>
                            { val.tags.map((item) => (
                                <div className='tagItem'>{item}</div>
                              ))
                            }
                          </div>
                          <div className='btn' >了解详情</div>
                        </div>
                      ))
                    }
                  </div>
                 </div>
            </div>
          <div style={{  backgroundColor: '#fff' }}>
          <div className='itemList itemList2'>
                  <div className='hotlist'>
                    {
                        catList.map((val)=>(
                        <div className='itemBlock' key={val.id} onClick={() => router.push(`/detail/${val.id}/home`)}>
                          <div className='product_img'>
                            <img className='img' src={require(`../../assets/${val.fileUrls[0]}`)} />
                          </div>
                          <span className='text_ellipsis'>{val.animalName}</span>
                          <div className='tagsList'>
                            { val.tags.map((item) => (
                                <div className='tagItem'>{item}</div>
                              ))
                            }
                          </div>
                          <div className='btn' >了解详情</div>
                        </div>
                      ))
                    }
                  </div>
                 </div>
          </div>
          <div style={{ backgroundColor: '#fff' }}>
          <div className='itemList itemList2'>
                  <div className='hotlist'>
                    {
                        otherList.map((val)=>(
                        <div className='itemBlock' key={val.id} onClick={() => router.push(`/detail/${val.id}/home`)}>
                          <div className='product_img'>
                            <img className='img' src={require(`../../assets/${val.fileUrls[0]}`)} />
                          </div>
                          <span className='text_ellipsis'>{val.animalName}</span>
                          <div className='tagsList'>
                            { val.tags.map((item) => (
                                <div className='tagItem'>{item}</div>
                              ))
                            }
                          </div>
                          <div className='btn' >了解详情</div>
                        </div>
                      ))
                    }
                  </div>
                 </div>
          </div>
        </Tabs>
        {/* <div className='itemList itemList2'>
          <div className='itemListtitle'>热门回收<div className='gotoMore' onClick={() => router.push('/class')}>更多<img src="https://res.zudeapp.com/wximage/right_arrow.png" alt=""/></div></div>
          <div className='hotlist'>
            {
              home.list.productList && home.list.productList.length !== 0 ? home.list.productList.map((val)=>(
                <div className='itemBlock' key={val.id} onClick={() => {console.log('去商品')}}>
                  <div className='product_img'>
                    <img className='img' src={require('../../assets/timg2.gif')} />
                  </div>
                  <span className='text_ellipsis'>{val.productName}</span>
                  <div className='priceBox'>最高回收价 <span className='price'>¥{val.topPrice}</span></div>
                  <div className='btn' >立即回收</div>
                </div>
              ))
             : ""
            }
          </div>
        </div> */}
        <Modal
            visible={this.state.visible}
            transparent
            closable={true}
            maskClosable={true}
            className="modal-shool"
            onClose={() => this.onClose()}
          >
          <img src="http://res.zudeapp.com/allh5/buyput-renew-icon.png" alt="" onClick={() => router.push("/indexActivity")} />
        </Modal>
      </div>
    )
  }
}


export default Home;
