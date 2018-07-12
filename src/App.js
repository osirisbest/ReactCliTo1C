import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import logo from './omnic.png';
import './App.css';
import Client from '../node_modules/another-rest-client';

const username = 'Name', passw = 'Name'
//const x = new XMLHttpRequest();

class App extends Component {
  constructor(props) {
    super()
    this.onClick = this.onClick.bind(this)
    this.onClickClean = this.onClickClean.bind(this)
    this.onClickSimplest = this.onClickSimplest.bind(this)
    this.onClickReqPost = this.onClickReqPost.bind(this)
    this.onClickCreateDocumentRequest=this.onClickCreateDocumentRequest.bind(this)
    this.state = { log: 'log' }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
        </p>
        <ButtonGroup vertical>
        <form className="commentForm">
        <input type="text" placeholder="Your name" />
        <input type="text" placeholder="Say something..." />
        <input type="submit" value="Post" />      
      </form>
          <Button bsStyle='primary' onClick={this.onClick} >Тестовый onClick запрос выполнить</Button>
          <Button bsStyle='success' onClick={this.onClickClean} >XMLHttpRequest onClickClean запрос с авторизацией</Button>
          <Button bsStyle='success' onClick={this.onClickSimplest} >XMLHttpRequest onClickSimplest Простейший рабочий запрос к локалхосту</Button>
          <Button bsStyle='success' onClick={this.onClickReqPost} >XMLHttpRequest onClickReqPost создание справочника</Button>
          <Button bsStyle='success' onClick={this.onClickCreateDocumentRequest} >XMLHttpRequest onClickCreateDocumentRequest создание документа</Button>
          
        </ButtonGroup>
        <h2>{this.state.log}</h2>
      </div>
    );
  }

  onClick() {
    console.log('We are work!')
    var args = {
      data: { test: "hello" },
      headers: { 'Authorization': 'Basic ' + Buffer.from(username + ':' + passw).toString('base64') }
    };
    const client = new Client()
    client.get('http://localhost/SC/odata/standard.odata', args, function (data, response) {
      console.log(data)
      console.log(response)
    })
  }
 
  onClickClean() {
    let x = new XMLHttpRequest();
    x.open("GET", "http://localhost/SC/odata/standard.odata", true);
    x.setRequestHeader('Access-Control-Allow-Origin','http://localhost:3000')
    x.withCredentials = true;
    x.onload = () => {
      this.setState({ log: x.responseText })
    }
    x.send(null);
  }

  onClickSimplest() {
    let x = new XMLHttpRequest();
    x.open("GET", "http://localhost/", true);
    x.onload = () => {
      this.setState({ log: x.responseText })
    }
    x.onerror = () => {
      console.log(x.status)
      console.log(x.statusText)
      console.log(x.responseText);
      this.setState({ log: x.responseText })
    }
    x.send(null);
  }

  onClickReqPost() {
    let x = new XMLHttpRequest();
    x.withCredentials = true;
    x.open("POST", "http://localhost/SC/odata/standard.odata/Catalog_sampleref?$format=json", true);
    //x.setRequestHeader('Access-Control-Allow-Origin','http://localhost:3000')
    
    x.onload = () => {
      console.log(x.responseText);
      this.setState({ log: x.responseText })
    }
    x.onerror = () => {
      console.log(x.status)
      console.log(x.statusText)
      console.log(x.responseText);
      this.setState({ log: x.responseText })
    }
    x.send(JSON.stringify({ "Description": "Test" }));
  }

  onClickCreateDocumentRequest() {
    let x = new XMLHttpRequest();
    x.withCredentials = true;
    x.open("POST", "http://localhost/SC/odata/standard.odata/Document_СЦентр_Обращение?$format=json", true);
    
    //x.mozBackgroundRequest = true;
    
   // x.setRequestHeader('Content-type','application/json');
    //x.setRequestHeader('Access-Control-Allow-Origin','http://localhost:3000')
    //x.setRequestHeader('Authorization','Basic TmFtZTpOYW1l')
    //x.setRequestHeader('Authorization', 'Basic ' + Buffer.from(username + ':' + passw).toString('base64'))
    
    x.onload = () => {
      console.log(x.status)
      console.log(x.statusText)
      console.log(x.responseText);
      this.setState({ log: x.responseText })
    }
    x.onerror = () => {
      console.log(x.status)
      console.log(x.statusText)
      console.log(x.responseText);
      this.setState({ log: x.status })
    }
    x.send(JSON.stringify({"ОписаниеНеисправности": "Тестовое описание. Все поломалось,все плохо_","Контрагент_Key": "4f2cfe01-7f9d-11e8-8079-d46e0e0c6a39"}));
  }
}


export default App;