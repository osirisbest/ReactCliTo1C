import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import logo from './omnic.png';
import './App.css';
import Client from '../node_modules/another-rest-client';

const username = 'Name', passw = 'Name'
class App extends Component {
  constructor(props) {
    super()
    this.onClick = this.onClick.bind(this)
    this.onClickClean = this.onClickClean.bind(this)
    this.onClickSimplest = this.onClickSimplest.bind(this)
    this.onClickReqPost=this.onClickReqPost.bind(this)
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
          <Button bsStyle='primary' onClick={this.onClick} >Тестовый запрос выполнить</Button>
          <Button bsStyle='success' onClick={this.onClickClean} >XMLHttpRequest запрос с авторизацией</Button>
          <Button bsStyle='success' onClick={this.onClickSimplest} >XMLHttpRequest Простейший рабочий запрос к локалхосту</Button>
          <Button bsStyle='success' onClick={this.onClickReqPost} >XMLHttpRequest onClickReqPost создание справочника</Button>
          
        </ButtonGroup>
      </div>
    );
  }

  onClick() {

    console.log('We are work!')
    //const api = new RestClient('https://api.github.com');
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

  onClickReqPost() {

    let x = new XMLHttpRequest();

    x.open("POST", "http://localhost/SC/odata/standard.odata/Catalog_sampleref?$format=json", true);
    x.withCredentials = true;
    
    x.onload = function () {
      console.log(x.responseText);
    }
    x.send(JSON.stringify({}));
  }

  onClickClean() {

    let x = new XMLHttpRequest();

    x.open("GET", "http://localhost/SC/odata/standard.odata", true);
    x.withCredentials = true;
    
    x.onload = function () {
      console.log(x.responseText);
    }
    x.send(null);
  }
//http://localhost/SC/odata/standard.odata/Catalog_sampleref?$format=json
  onClickSimplest() {
    let x = new XMLHttpRequest();
    x.open("GET", "http://localhost/", true);
    x.onload = function () {
      alert(x.responseText);
    }
    x.send(null);
  }
}

export default App;
