import React, { Component } from 'react';
import { connect } from 'dva';
import { SearchBar, Button, WhiteSpace, WingBlank, Icon } from 'antd-mobile';
import HomeCarousel from '../../components/home-tabbar/home-tabber-carousel'
import Link from 'umi/link';
import router from 'umi/router';
import styles from './index.less';

@connect(({ home }) => ({ home }))
class Home extends Component {
  constructor(props) {
      super(props)
      this.state = {
        value: '',
        list: [],
      }
    }
      componentDidMount() {
        this.autoFocusInst.focus();
      }
      onChange= (value) => {
        this.setState({ value });
        if(value === '') {
          this.onCancel();
        }
      };
      clear = () => {
        this.setState({ value: '' });
        this.onCancel();
      };
      searchSUbmit = () => {
        const value = this.state.value;
        let list = [];
        // if(value === '猫' ||value ===  '猫猫') {
        //   list = Array.from(JSON.parse(localStorage.getItem("catlist")));
        // } else if(value === '狗' ||value ===  '狗狗'){
        //   list = Array.from(JSON.parse(localStorage.getItem("doglist")));
        // } else{
          let alllist = Array.from(JSON.parse(localStorage.getItem("catlist")));
          alllist = alllist.concat(Array.from(JSON.parse(localStorage.getItem("doglist"))), Array.from(JSON.parse(localStorage.getItem("otherlist"))))
          let alllist2 = []
          let lastList = alllist;
          let valuearr = value.trim().split(/\s+/);
          // console.log(valuearr,888)
          valuearr.forEach((val) => {
            alllist2 = [...lastList];
            // 循环整个字符串
            alllist2.forEach((item,index)=>{
              if(item.animalName.indexOf(val) !== -1 || item.animalDescribe.indexOf(val) !== -1 || item.animalType[0].indexOf(val) !== -1 || item.animalType[1].indexOf(val) !== -1) {
                list.push(item)
                lastList.splice(index,1)
              }
            })
            // 循环字符串中的单个字符
            alllist2 = [...lastList];
            // console.log(val,val.charAt(0))
            for(let i=0;i<val.length;i++){
              alllist2 = [...lastList];
              alllist2.forEach((item,index)=>{
                if(item.animalName.indexOf(val.charAt(0)) !== -1 || item.animalDescribe.indexOf(val.charAt(0)) !== -1 || item.animalType[0].indexOf(val.charAt(0)) !== -1 || item.animalType[1].indexOf(val.charAt(0)) !== -1)  {
                  list.push(item)
                  lastList.splice(index,1)
                }
              })
              // console.log(list,888)
              // alert();
            }
            // console.log(lastList,99)
          });
          // list = alllist
        // }
        this.setState({
          list,
        })

      }
      onCancel = () => {
        this.setState({
          list: [],
          value: ''
        })
      }
  render() {
    const { value, list } = this.state;
    return (
      <div className={styles.searchPage}>
        <div className={styles.searchTop}>
          <a onClick={() => router.push('/home')}>
            <Icon 
                type='left' 
                className={styles.backIcon}
            />
          </a>
          <SearchBar 
            className={styles.searchInput}
            placeholder="请输入你想要的宠物" 
            ref={ref => this.autoFocusInst = ref} 
            onClear={this.clear}
            onSubmit = {this.searchSUbmit}
            value={this.state.value}
            onChange={this.onChange}
            onCancel={this.onCancel}
          />
          <WhiteSpace />
        </div>
      {
            list.map((item)=>(
                <div className={styles.animalItem}>
                        <a onClick={() => router.push(`/detail/${item.id}/search`)}>
                        <div className={styles.animalInfo}>
                            <img className={styles.animalImg} src={require(`../../assets/${item.fileUrls[0]}`)} />
                            <div className={styles.animalText}>
                                <div className={styles.animalText1}>{item.animalName}</div>
                                <div className={styles.animalText2}>{item.animalType[0]}</div>
                                <div className={styles.animalDes}>{item.animalDescribe}</div>
                            </div>
                        </div>
                        </a>
                </div>  
            ))
        }
      </div>
    )
  }
}


export default Home;
