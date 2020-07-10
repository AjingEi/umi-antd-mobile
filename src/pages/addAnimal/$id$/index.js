import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Toast,InputItem, List,Picker,TextareaItem, Button, ImagePicker  } from 'antd-mobile';
import CopyToClipboard from 'react-copy-to-clipboard';
import Link from 'umi/link';
import address from "../../address.json";
import { createForm } from 'rc-form';
import router from 'umi/router';
import styles from './index.less';
import { file } from '@babel/types';

const options = address;

@connect(({ home }) => ({ home }))
@createForm() 
class Home extends Component {
  constructor(props) {
      super(props)
      this.state = {
        item: [],
        message: '',
        animalName: '',
        city: '',
        year: '',
        getType: '',
        sex: '',
        noAfter: '',
        noInsect: '',
        mianyi: '',
        getMoney: '',
        sendType: '',
        animalDescribe: '',
        phone: '',
        weChat: '',
        files: [],
        imageUrl: '',
        sendButtonShow: false,
        animalType: '',
        fileUrls: [],
        animalId: '',
        item: {},
        list: [],
        index: '',
      }
  }
  componentDidMount = () => {
      const animalId = this.props.match.params.id;
      if(animalId) {
        let list = [];
        if(animalId<30) {
        list = Array.from(JSON.parse(localStorage.getItem("doglist")));
        } else if(animalId<60) {
        list = Array.from(JSON.parse(localStorage.getItem("catlist")));
        } else{ 
        list = Array.from(JSON.parse(localStorage.getItem("otherlist")));
        }
        list.some((item,index)=>{
        if(item.id == animalId){
            const {animalName,animalType,city, year,getType, sex,noAfter,noInsect,getMoney,sendType, mianyi, animalDescribe, phone, weChat,fileUrls } = item;
            let files = [];
            fileUrls.forEach((item,index) => {
                files.push({
                    url: require('../../../assets/'+item),
                    id: index,
                })
            });
            this.setState({
                //   imageUrl: localStorage.getItem('imageUrl') ? localStorage.getItem('imageUrl'): ''
                animalName,animalType,city, year,getType, sex,noAfter,noInsect,getMoney,sendType, mianyi, animalDescribe, phone, weChat,fileUrls,files,
                animalId,
                list, // 设置当前分类列表
                index,
                sendButtonShow: true,
            })
            return true;
        }
        })
      }
     
  }

  onChange= (val,type) => {
      this.setState({
          [type]: val
      },()=>{
        
        const {animalName,animalType,city, year,getType, sex,noAfter,noInsect,getMoney,sendType, mianyi, animalDescribe, phone, weChat,files } = this.state
        // console.log(year)
        if(animalName==='' || animalType==='' || city==='' || year==='' || getType==='' || sex ==='' || noAfter===''  ||noInsect==='' || getMoney==='' || sendType==='' || mianyi==='' || animalDescribe==='' || phone==='' || weChat==='' || files.length===0) {
            // console.log(animalName,animalType,city, year,getType, sex,noAfter,noInsect,getMoney,sendType, mianyi, animalDescribe, phone, weChat,files.length===0)
            this.setState({
                sendButtonShow: false,
            })
        } else {
            // console.log(2)
            this.setState({
                sendButtonShow: true,
            })
        }
      })
     
  }

  onimageChange = (files, type, index) => {
    // console.log(files, type, index);
    if(files.length !== 0) {
        let fileUrls = this.state.fileUrls;
        fileUrls.push(files[files.length-1].url)
        this.setState({
            fileUrls: fileUrls,
        })
        // console.log(fileUrls)
    }
    // localStorage.setItem('imageUrl',files[0].url)
    this.setState({
      files,
    },()=>{
        const {animalName,animalType,city, year,getType, sex,noAfter,noInsect,getMoney,sendType, mianyi, animalDescribe, phone, weChat,files } = this.state
        if(animalName==='' || animalType==='' || city==='' || year==='' || getType==='' || getType===''|| sex ==='' || noAfter===''  ||noInsect==='' || getMoney==='' || sendType==='' || mianyi==='' || animalDescribe==='' || phone==='' || weChat==='' || files.length===0) {
            // console.log(animalName,city, year,getType, sex,noAfter,noInsect,getMoney,sendType, mianyi, animalDescribe, phone, weChat,files)
            this.setState({
                sendButtonShow: false,
            })
        } else {
            this.setState({
                sendButtonShow: true,
            })
        }
      });
  }
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1,
    });
  }

  sendAnimal = () => {
    const {animalName,animalType,city, year,getType, sex,noAfter,noInsect,getMoney,sendType, mianyi, animalDescribe, phone, weChat,fileUrls, animalId, list, index } = this.state
    let animalItem = {
        userId: Number(JSON.parse(localStorage.getItem('user'))),
        animalName,
        animalType,
        year,
        getType, 
        sex,
        noAfter,
        noInsect,
        mianyi,
        getMoney,
        animalDescribe, 
        fileUrls,
        city, 
        sendType,
        phone, 
        weChat,
        date: new Date().toLocaleDateString() 
     }
     animalItem.fileUrls = ['jj1.jpg', 'jj2.jpg']
    //  let arr = [];
    //  arr.push(animalItem)
     if(animalId) {
        animalItem.id = animalId;
        if(animalId<30) {
            list.splice(index,1,animalItem);
            // console.log(list,'list')
            localStorage.setItem("doglist",JSON.stringify(list))
        } else if(animalId<60) {
            list.splice(index,1,animalItem);
            localStorage.setItem("catlist",JSON.stringify(list))
        } else{ 
            list.splice(index,1,animalItem);
            localStorage.setItem("otherlist",JSON.stringify(list))
        }
        Toast.success('编辑成功', 1);
        router.push('/animalList')
     } else {
        if(animalType[0] === '狗狗') {
            let dogarr = Array.from(JSON.parse(localStorage.getItem("doglist")));
            animalItem.id = dogarr[dogarr.length-1].id+1;
            
            dogarr.push(animalItem)
            localStorage.setItem("doglist",JSON.stringify(dogarr))
        } else if(animalType[0] === '猫猫') {
           let catarr = Array.from(JSON.parse(localStorage.getItem("catlist")));
           animalItem.id = catarr[catarr.length-1].id+1;
           // let catarr = [];
           // animalItem.id = 31;
           
           catarr.push(animalItem)
           localStorage.setItem("catlist",JSON.stringify(catarr))
       } else if(animalType[0] === '其它') {
           let otherlist = Array.from(JSON.parse(localStorage.getItem("otherlist")));
           animalItem.id = otherlist[otherlist.length-1].id+1;
           // let otherlist = []
           // animalItem.id = 61;
           
           otherlist.push(animalItem)
           localStorage.setItem("otherlist",JSON.stringify(otherlist))
       }
       Toast.success('添加成功', 1);
       router.push('/animalList')
     }
  }

  render() {
    const { item, message,animalName,animalType,city, year,getType, sex,noAfter,noInsect,getMoney,sendType, mianyi, animalDescribe, phone, weChat,files, sendButtonShow, animalId } = this.state
    const { getFieldProps } = this.props.form;
    const years = [
        {
            label: '3个月以下',
            value: '3个月以下',
          },
          {
            label: '3-6个月',
            value: '3-6个月',
          },
          {
            label: '6到12个月',
            value: '6到12个月',
          },
          {
            label: '1到3岁',
            value: '1到3岁',
          },
          {
            label: '3岁以上',
            value: '3岁以上',
          },
    ]
    const animalTypes = [{
        "value": "狗狗",
        "label": "狗狗",
        "children": [{
          "value": "中华田园犬",
          "label": "中华田园犬"
        },{
            "value": "串串",
            "label": "串串"
        },{
            "value": "泰迪犬",
            "label": "泰迪犬"
        },{
            "value": "哈士奇",
            "label": "哈士奇"
        },{
            "value": "金毛犬",
            "label": "金毛犬"
        },{
            "value": "阿拉斯加雪橇犬",
            "label": "阿拉斯加雪橇犬"
        },{
            "value": "萨摩耶犬",
            "label": "萨摩耶犬"
        },{
            "value": "比熊犬",
            "label": "比熊犬"
        },{
            "value": "柯基犬",
            "label": "柯基犬"
        },{
            "value": "柴犬",
            "label": "柴犬"
        },{
            "value": "吉娃娃犬",
            "label": "吉娃娃犬"
        },{
            "value": "博美犬",
            "label": "博美犬"
        },{
            "value": "德国牧羊犬",
            "label": "德国牧羊犬"
        },{
            "value": "巴哥犬",
            "label": "巴哥犬"
        },{
            "value": "法国斗牛犬",
            "label": "法国斗牛犬"
        },{
            "value": "其他（宠物描述中填写）",
            "label": "其他（宠物描述中填写）"
        }]
    },{
        "value": "猫猫",
        "label": "猫猫",
        "children": [{
          "value": "中华田园猫",
          "label": "中华田园猫"
        },{
            "value": "中国狸花猫",
            "label": "中国狸花猫"
        },{
            "value": "英国短毛猫",
            "label": "英国短毛猫"
        },{
            "value": "美国短毛猫",
            "label": "美国短毛猫"
        },{
            "value": "布偶猫",
            "label": "布偶猫"
        },{
            "value": "猩逻猫",
            "label": "猩逻猫"
        },{
            "value": "斯芬克斯猫",
            "label": "斯芬克斯猫"
        },{
            "value": "苏格兰折耳猫",
            "label": "苏格兰折耳猫"
        },{
            "value": "加菲猫",
            "label": "加菲猫"
        },{
            "value": "虎斑猫",
            "label": "虎斑猫"
        },{
            "value": "橘猫",
            "label": "橘猫"
        },{
            "value": "缅因猫",
            "label": "缅因猫"
        },{
            "value": "金吉拉",
            "label": "金吉拉"
        },{
            "value": "异国短毛猫",
            "label": "异国短毛猫"
        },{
            "value": "重点色短毛猫",
            "label": "重点色短毛猫"
        },{
            "value": "其他（宠物描述中填写）",
            "label": "其他（宠物描述中填写）"
        }]
    },
    {
        "value": "其它",
        "label": "其它",
        "children": [{
          "value": "兔子",
          "label": "兔子"
        },{
            "value": "仓鼠",
            "label": "仓鼠"
        },{
            "value": "龙猫",
            "label": "龙猫"
        },{
            "value": "刺猬",
            "label": "刺猬"
        },{
            "value": "布偶猫",
            "label": "布偶猫"
        },{
            "value": "香猪",
            "label": "香猪"
        },{
            "value": "荷兰猪",
            "label": "荷兰猪"
        },{
            "value": "乌龟",
            "label": "乌龟"
        },{
            "value": "鱼",
            "label": "鱼"
        },{
            "value": "鸟",
            "label": "鸟"
        },{
            "value": "蛇",
            "label": "蛇"
        },{
            "value": "蜥蜴",
            "label": "蜥蜴"
        },{
            "value": "其他（宠物描述中填写）",
            "label": "其他（宠物描述中填写）"
        }]
    }]
    const getTypes = [ { label: '家养', value: '家养', }, { label: '流浪', value: '流浪', }, { label: '收养所', value: '收养所', }, ] 
    const sexs = [ { label: 'MM', value: 'MM', }, { label: 'GG', value: 'GG', }, ] 
    const isJudges = [ { label: '是', value: '是', }, { label: '否', value: '否', }, { label: '不确定', value: '不确定', }, ] 
    // const noInsect = [ { label: '是', value: '是', }, { label: '否', value: '否', }, { label: '不确定', value: '不确定', }, ] 
    // const mianyi = [ { label: '是', value: '是', }, { label: '否', value: '否', }, { label: '不确定', value: '不确定', }, ] 
    const getMoneys = [ { label: '无偿', value: '无偿', }, { label: '收押金', value: '收押金', }, { label: '有偿', value: '有偿', }, ]
    const sendTypes = [ { label: '个人', value: '个人', }, { label: '机构', value: '机构', }, ]
    const img = 'dog1.png'
     return (
      <div className={styles.addPage}>
         <div className={styles.addText}>
             {/* <img src={require('../../../assets/dog1.jpeg')}></img> */}
           <a className={styles.leftIconPar} onClick={() => router.push(animalId?'/animalList' : '/my')}>
             <Icon className={styles.leftIcon}  type='left'></Icon>
           </a>
           <div className={styles.sendText}>{animalId ? '编辑' : '发布'}</div>
        </div>
         {/* 宠物信息 */}
         <div>
         <List renderHeader={() => '宠物信息'}>
            <InputItem
                {...getFieldProps('animalName')}
                clear
                value={animalName}
                placeholder="请输入昵称"
                onChange ={(val)=>{this.onChange(val, 'animalName')}}
                ref={el => this.inputRef = el}
            >
                昵称
            </InputItem>
            <Picker 
                extra="请选择宠物品种"
                data={animalTypes}
                {...getFieldProps('animalType')}
                value={animalType}
                disabled={animalId? true : false}
                cols={2} 
                format={(e)=>{return e.join('/')}}
                onOk={(val)=>{this.onChange(val, 'animalType')}}
                onDismiss={e => console.log('dismiss', e)}
                >
                <List.Item arrow="horizontal">宠物品种</List.Item>
            </Picker>
            <Picker 
                extra="请选择年龄"
                data={years} 
                value={year}
                error={true}
                cols={1} 
                {...getFieldProps('year', {initialValue: year})}
                onOk={(val)=>{this.onChange(val, 'year')}}
            >
                <List.Item  arrow="horizontal">年龄</List.Item>
            </Picker>
            <Picker 
                extra="请选择收养类型"
                data={getTypes} 
                value={getType}
                cols={1} 
                {...getFieldProps('getType', {initialValue: getType})}
                onOk={(val)=>{this.onChange(val, 'getType')}}
            >
                <List.Item  arrow="horizontal">收养类型</List.Item>
            </Picker>
            <Picker 
                extra="请选择性别"
                data={sexs} 
                value={sex}
                cols={1} 
                {...getFieldProps('sex', {initialValue: sex})}
                onOk={(val)=>{this.onChange(val, 'sex')}}
            >
                <List.Item  arrow="horizontal">性别</List.Item>
            </Picker>
            <Picker 
                extra="请选择绝育状况"
                data={isJudges} 
                value={noAfter}
                cols={1} 
                {...getFieldProps('noAfter', {initialValue: noAfter})}
                onOk={(val)=>{this.onChange(val, 'noAfter')}}
            >
                <List.Item  arrow="horizontal">绝育状况</List.Item>
            </Picker>
            <Picker 
                extra="请选择驱虫状况"
                data={isJudges} 
                value={noInsect}
                cols={1} 
                {...getFieldProps('noInsect', {initialValue: noInsect})}
                onOk={(val)=>{this.onChange(val, 'noInsect')}}
            >
                <List.Item  arrow="horizontal">驱虫状况</List.Item>
            </Picker>
            <Picker 
                extra="请选择免疫状况"
                data={isJudges} 
                value={mianyi}
                cols={1} 
                {...getFieldProps('mianyi', {initialValue: mianyi})}
                onOk={(val)=>{this.onChange(val, 'mianyi')}}
            >
                <List.Item  arrow="horizontal">免疫状况</List.Item>
            </Picker>
            <Picker 
                extra="请选择收费状况"
                data={getMoneys} 
                value={getMoney}
                cols={1} 
                {...getFieldProps('getMoney', {initialValue: getMoney})}
                onOk={(val) =>{this.onChange(val, 'getMoney')}}
            >
                <List.Item  arrow="horizontal">收费状况</List.Item>
            </Picker>
        {/* </List>
        <List renderHeader={() => '宠物描述'}> */}
            <TextareaItem
                {...getFieldProps('animalDescribe', {
                initialValue: '',
                })}
                title="宠物描述"
                value={animalDescribe}
                placeholder="请输入宠物描述"
                onChange ={(val)=>{this.onChange(val, 'animalDescribe')}}
                rows={5}
                count={100}
            />
        </List>

        <List renderHeader={() => '上传照片（最多三张）'}>
            <ImagePicker
                files={files}
                onChange={this.onimageChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 3}
                multiple={false}
                />
        </List>

        <List renderHeader={() => '发布人信息'}>
            <Picker 
                extra="请选择所在城市"
                data={options}
                {...getFieldProps('city')}
                value={city}
                format={(e)=>{return e.join('/')}}
                onOk={(val)=>{this.onChange(val, 'city')}}
                onDismiss={e => console.log('dismiss', e)}
                >
                <List.Item arrow="horizontal">所在城市</List.Item>
            </Picker>
            <Picker 
                extra="请选发布者类型"
                data={sendTypes}
                value={sendType}
                cols={1} 
                {...getFieldProps('sendType', {initialValue: sendType})}
                onOk={(val)=>{this.onChange(val, 'sendType')}}
            >
                <List.Item  arrow="horizontal">发布者类型</List.Item>
            </Picker>
            <InputItem
                {...getFieldProps('phone')}
                type="phone"
                value={phone}
                placeholder="请输入手机号码"
                onChange ={(val)=>{this.onChange(val, 'phone')}}
            >
                手机号码
            </InputItem>
            <InputItem
                {...getFieldProps('weChat')}
                clear
                value={weChat}
                placeholder="请输入微信号"
                onChange ={(val)=>{this.onChange(val, 'weChat')}}
                ref={el => this.inputRef = el}
            >
                微信号
            </InputItem>
           
        </List>
            <Button className={styles.sendButton} onClick={this.sendAnimal} disabled={!sendButtonShow} type="primary">{animalId ? '保存编辑' : '立即发布'}</Button>
         </div>
      </div>
    )
  }
}


export default Home;
