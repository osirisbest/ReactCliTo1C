import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import logo from './omnic.png'
import './App.css'
//import Client from '../node_modules/another-rest-client';

const addr = 'http://192.168.200.139'

class App extends Component {
  constructor(props) {
    super()
    this.onClickCreateDocumentRequest = this.onClickCreateDocumentRequest.bind(this)
    this.onChangeError = this.onChangeError.bind(this)
    this.onChangeComment = this.onChangeComment.bind(this)
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
        <h1>Опишите свою проблему и нажмите клавишу 'Создать обращение' для отправки в сервисный центр</h1>
        <form className="commentForm">
          <textarea type="text" placeholder="Комментарий" cols="78" rows="5" onChange={this.onChangeComment} />
        </form>
        <form>
          <textarea type="text" placeholder="Опишите проблему" cols="78" rows="5" onChange={this.onChangeError} />
        </form>
        <ButtonGroup vertical>
          <Button bsStyle='success' onClick={this.onClickCreateDocumentRequest} >Создать обращение</Button>
        </ButtonGroup>
        <h2>{this.state.log}</h2>
      </div>
    );
  }

  onChangeError(event) {
    this.setState({ error: event.target.value })
  }

  onChangeComment(event) {
    this.setState({ error: event.target.comment })
  }

  onClickCreateDocumentRequest() {
    let x = new XMLHttpRequest();
    x.withCredentials = true;

    x.open("POST", addr + '/sc/odata/standard.odata/Document_СЦентр_Обращение?$format=json', true);

    x.onload = () => {
      console.log('status:' + x.status)
      console.log('statusText:' + x.statusText)
      console.log('responseText:' + x.responseText);
      this.setState({ log: x.responseText })
    }
    x.onerror = () => {
      console.log('status:' + x.status)
      console.log('statusText:' + x.statusText)
      console.log('responseText:' + x.responseText);
      this.setState({ log: x.status })
    }

    x.send(JSON.stringify({ "ОписаниеНеисправности": this.state.error, "Контрагент_Key": "4f2cfe01-7f9d-11e8-8079-d46e0e0c6a39", "Комментарий": this.state.comment }));
  }
}

export default App;