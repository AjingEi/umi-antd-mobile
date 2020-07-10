import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Toast,InputItem, List,Picker,TextareaItem, Button, ImagePicker,Modal  } from 'antd-mobile';
import CopyToClipboard from 'react-copy-to-clipboard';
import Link from 'umi/link';
import address from "../address.json";
import { createForm } from 'rc-form';
import router from 'umi/router';
import styles from './index.less';

const options = address;

const alert = Modal.alert;

@connect(({ home }) => ({ home }))
@createForm() 
class Home extends Component {
  constructor(props) {
      super(props)
      this.state = {
        list: [],
      }
  }
  componentDidMount = () => {
    this.getAnimalList()
  }
  getAnimalList = () => {
    let list = [];
    let userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
    // console.log(userId)
    let dogList = localStorage.getItem('doglist') ? Array.from(JSON.parse(localStorage.getItem('doglist'))) : [];
    let catList = localStorage.getItem('catlist') ? Array.from(JSON.parse(localStorage.getItem('catlist'))) : [];
    let otherList = localStorage.getItem('otherlist') ? Array.from(JSON.parse(localStorage.getItem('otherlist'))) : [];
    dogList.forEach((item)=>{
        // console.log(item.userId,  userId)
        if(item.userId == userId) {
            list.push(item)
        }
    })
    catList.forEach((item)=>{
        if(item.userId == userId) {
            list.push(item)
        }
    })
    otherList.forEach((item)=>{
        if(item.userId == userId) {
            list.push(item)
        }
    })
    this.setState({
        list,
    })
  }

  showAlert = (id) => {
    const alertInstance = alert('删除', '确定要删除吗?', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => this.delItem(id) },
    ]);
    setTimeout(() => {
      // 可以调用close方法以在外部close
    //   console.log('auto close');
      alertInstance.close();
    }, 500000);
};

  delItem = (id) => {
    // console.log(id)
    let list = [];
    if(id<30) {
    list = Array.from(JSON.parse(localStorage.getItem("doglist")));
    } else if(id<60) {
    list = Array.from(JSON.parse(localStorage.getItem("catlist")));
    } else{ 
    list = Array.from(JSON.parse(localStorage.getItem("otherlist")));
    }
    list.some((item,index)=>{
    if(item.id == id){
        if(id<30) {
            list.splice(index,1);
            // console.log(list)
            localStorage.setItem("doglist",JSON.stringify(list))
        } else if(id<60) {
            list.splice(index,1);
            localStorage.setItem("catlist",JSON.stringify(list))
        } else{ 
            list.splice(index,1);
            localStorage.setItem("otherlist",JSON.stringify(list))
        }
        Toast.success('删除成功', 1);
        this.getAnimalList()
        return true;
    }
    })
  }

  render() {
    const { list } = this.state;
     return (
      <div className={styles.listPage}>
        <div className={styles.addText}>
             <img src={this.state.imageUrl}></img>
           <a className={styles.leftIconPar} onClick={() => router.push('/my')}>
             <Icon className={styles.leftIcon}  type='left'></Icon>
           </a>
           <div className={styles.sendText}>发布宠物列表</div>
        </div>
        {
            list.map((item)=>(
                <div className={styles.animalItem}>
                        <a onClick={() => router.push(`/detail/${item.id}/animalList`)}>
                        <div className={styles.animalInfo}>
                            <img className={styles.animalImg} src={require(`../../assets/${item.fileUrls[0]}`)} />
                            <div className={styles.animalText}>
                                <div className={styles.animalText1}>{item.animalName}</div>
                                <div className={styles.animalText2}>{item.animalType[0]}</div>
                                <div className={styles.animalDes}>{item.animalDescribe}</div>
                            </div>
                        </div>
                        </a>
                    <div className={styles.animalButtons}>
                    
                        <a onClick={() => {this.showAlert(item.id)}} className={styles.animalButton2}>删除</a>
                        <a onClick={() => router.push(`/addAnimal/${item.id}`)} className={styles.animalButton1}>编辑</a>
                    </div>    
                </div>  
            ))
        }
      </div>
    )
  }
}


export default Home;
