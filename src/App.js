import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import logo from './omnic.png'
import './App.css'
//import Client from '../node_modules/another-rest-client';
const dev=false
const addr = 'http://192.168.200.139/sc/'
//let points=[]

class App extends Component {
  constructor(props) {
    super()
    this.onClickCreateDocumentRequest = this.onClickCreateDocumentRequest.bind(this)
    this.onChangeError = this.onChangeError.bind(this)
    this.onChangeComment = this.onChangeComment.bind(this)
    this.onClКонтрагент_Key=this.onClКонтрагент_Key.bind(this)
    this.onClТочкаОбслуживания_Key=this.onClТочкаОбслуживания_Key.bind(this)
    this.state = { log: '' ,Контрагент_Key:"",ТочкаОбслуживания_Key:"",points:[]}
    this.onPoints=this.onPoints.bind(this)
  }
 render() {
   const options=this.state.points.map(
     (item,index)=>{
       return <option key={item[1]} value={item[1]}>{item[0]}</option>
     }
   )
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
        </p>
        <h1>Опишите свою проблему и нажмите клавишу 'Создать обращение' для отправки в сервисный центр</h1>
        <h3>Для создания обращения поле `описание неисправности` должно быть уникально</h3>
        <form className="commentForm">
          <textarea type="text" placeholder="Комментарий" cols="78" rows="5" onChange={this.onChangeComment} />
        </form>
        <form>
          <textarea type="text" placeholder="Опишите проблему" cols="78" rows="5" onChange={this.onChangeError} />
        </form>
        <ButtonGroup vertical>
          <Button bsStyle='success' onClick={this.onClickCreateDocumentRequest} >Создать обращение</Button>
        </ButtonGroup>
        <h3>Ответ сервера информационной системы сервисного центра:</h3>
        <form>
        <textarea value={this.state.log} cols="78" rows="5"></textarea>
        </form>
        <label>Контрагент_Key:</label><input type='text' onChange={this.onClКонтрагент_Key} size='60' value={this.state.Контрагент_Key} id='Контрагент_Key'/>
        <br />
        <label>ТочкаОбслу_Key:</label><input type='text' onChange={this.onClТочкаОбслуживания_Key} size='60' value={this.state.ТочкаОбслуживания_Key} id='Контрагент_Key'/>
        <br />


        <select  value={this.state.ТочкаОбслуживания_Key} onChange={this.onPoints}>
          {options}}
        </select>
      </div>
    )
  } 
  componentDidMount(){
    let Контрагент_Key=localStorage.getItem('Контрагент_Key')
    if (Контрагент_Key) this.setState({ Контрагент_Key: Контрагент_Key})
    else this.setState({ Контрагент_Key: ''})

    let ТочкаОбслуживания_Key=localStorage.getItem('ТочкаОбслуживания_Key')
    if (ТочкаОбслуживания_Key) this.setState({ТочкаОбслуживания_Key:ТочкаОбслуживания_Key})
    else this.setState({ТочкаОбслуживания_Key:''})
  }
  onPoints(event){
    this.setState({ТочкаОбслуживания_Key:event.target.value})
  }
  onClКонтрагент_Key(event){
    let targetValue=event.target.value
    this.setState({ Контрагент_Key: targetValue })
    localStorage.setItem('Контрагент_Key',targetValue)
    let x = new XMLHttpRequest()
    x.withCredentials = true;
    //let OwnerKey=targetValue
    //'4f2cfe01-7f9d-11e8-8079-d46e0e0c6a39'
    let path=addr + 'odata/standard.odata/Catalog_СЦентр_ТочкиОбслуживания?$format=json&$filter=Owner_Key%20 eq guid\''+targetValue+"'"
    x.open("GET", path, true)

    x.onload = () =>{
      if (x.status!==200) {
        console.log(x.responseText)
        alert('Ошибка. Точек доставки для контрагента не существует?')
        return}
      //console.log(x.responseText)
      let resultJSON=JSON.parse(x.responseText)
      
      let points=  resultJSON.value.map(
        (item)=>{//alert(item)
        return ([item.Description,item.Ref_Key])        
      }      
      )
      this.setState({points:points})
     }
    x.send(null)
  }
  onClТочкаОбслуживания_Key(event){
    this.setState({ ТочкаОбслуживания_Key: event.target.value })
    localStorage.setItem('ТочкаОбслуживания_Key',event.target.value)
  }
  onChangeError(event) {
    this.setState({ error: event.target.value })
  }
  onChangeComment(event) {
    this.setState({ comment: event.target.value })
  }
  onClickCreateDocumentRequest() {
    let x = new XMLHttpRequest()
    x.withCredentials = true;

    x.open("POST", addr + 'odata/standard.odata/Document_СЦентр_Обращение?$format=json', true)

    x.onload = () => { if (dev){
      console.log('status:' + x.status)
      console.log('statusText:' + x.statusText)
      console.log('responseText:' + x.responseText)}
      // eslint-disable-next-line
      let messageValue=''
      // eslint-disable-next-line
      let resInJSON
      try{
      resInJSON=JSON.parse(x.responseText)
      //eslint-disable-next-line
      messageValue=resInJSON['odata.error'].message.value}
      catch(err){
        messageValue='Создан документ "Обращение" № '+resInJSON.Number +' от '+resInJSON.Date+'\nRef_Key:'+resInJSON.Ref_Key+'\n'
        alert('Инженеры службы сервиса уведомлены о Вашей проблеме и приступят к ее устранению \n'+messageValue)
      }
      this.setState({ log: messageValue })
    }
    x.onerror = () => { if (dev){
      console.log('status:' + x.status)
      console.log('statusText:' + x.statusText)
      console.log('responseText:' + x.responseText)}
      this.setState({ log: x.responseText +"\n"})
    }
    x.send(JSON.stringify({ "ОписаниеНеисправности": this.state.error, "Контрагент_Key":this.state.Контрагент_Key, "Комментарий": this.state.comment ,
    "ТочкаОбслуживания_Key": this.state.ТочкаОбслуживания_Key}
    ))
  }
}

export default App;