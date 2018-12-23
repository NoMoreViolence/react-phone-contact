import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // 현재 컴포넌트에서 사용될 State
  state = {
    name: '',
    number: '',
    search: '',
    contacts: [
      {
        name: 'Lee',
        number: '010-8602-9926',
        changeName: '',
        changeNumber: '',
        changeMode: false
      },
      {
        name: 'Park',
        number: '010-4233-1234',
        changeName: '',
        changeNumber: '',
        changeMode: false
      },
      {
        name: 'Choi',
        number: '010-5678-4321',
        changeName: '',
        changeNumber: '',
        changeMode: false
      }
    ]
  };

  // 값 변경 메소드
  onChange = input =>
    this.setState({
      [input.currentTarget.name]: input.currentTarget.value
    });
  onChangeContact = (input, number) =>
    this.setState({
      contacts: this.state.contacts.map((contact, idx) =>
        idx === number ? { ...contact, [input.currentTarget.name]: input.currentTarget.value } : contact
      )
    });

  // 연락처 추가 메소드
  addContact = () =>
    this.setState({
      contacts: [{ name: this.state.name, number: this.state.number, changeMode: false }, ...this.state.contacts],
      name: '',
      number: ''
    });

  // 변경, 삭제 메소드
  switchChangeMode = number =>
    this.setState({
      contacts: this.state.contacts.map((contact, idx) =>
        idx === number
          ? { ...contact, changeName: contact.name, changeNumber: contact.number, changeMode: !contact.changeMode }
          : contact
      )
    });
  change = (name, phone, number) => {
    this.setState({
      contacts: this.state.contacts.map((contact, idx) =>
        idx === number ? { ...contact, name, number: phone, changeMode: !contact.changeMode } : contact
      )
    });
  };
  delete = number =>
    this.setState({
      contacts: this.state.contacts.filter((x, i) => number !== i)
    });

  // 렌더링
  render = () => {
    // 검색 결과 필터링
    const search = contacts => renderContacts(contacts.filter(info => info.name.indexOf(this.state.search) !== -1));
    // 렌더링
    const renderContacts = contacts => {
      return contacts.map((contact, i) => (
        <div className="contact" key={i}>
          <div>
            {contact.changeMode ? (
              <>
                <div>
                  이름:{' '}
                  <input
                    name="changeName"
                    type="text"
                    value={contact.changeName}
                    onChange={input => this.onChangeContact(input, i)}
                  />
                </div>
                <div>
                  번호:{' '}
                  <input
                    name="changeNumber"
                    type="text"
                    value={contact.changeNumber}
                    onChange={input => this.onChangeContact(input, i)}
                  />
                </div>
              </>
            ) : (
              <>
                <div>이름: {contact.name}</div>
                <div>번호: {contact.number}</div>
              </>
            )}
          </div>
          <div>
            {contact.changeMode ? (
              <>
                <button onClick={() => this.switchChangeMode(i)}>취소</button>
                <button onClick={() => this.change(contact.changeName, contact.changeNumber, i)}>확인</button>
              </>
            ) : (
              <>
                <button onClick={() => this.switchChangeMode(i)}>수정</button>
                <button onClick={() => this.delete(i)}>삭제</button>
              </>
            )}
          </div>
        </div>
      ));
    };

    return (
      <div className="app-container">
        <div className="app">
          <header>
            <span className="title">전화번호부</span>
          </header>
          <section>
            <div className="add">
              <div>
                <input name="name" type="text" placeholder="이름" value={this.state.name} onChange={this.onChange} />
                <input
                  name="number"
                  type="text"
                  placeholder="전화번호"
                  value={this.state.number}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <button onClick={this.addContact}>추가하기</button>
              </div>
            </div>
            <div className="search">
              <input
                name="search"
                type="text"
                placeholder="검색하세요"
                value={this.state.search}
                onChange={this.onChange}
              />
            </div>
            <div className="contacts">{search(this.state.contacts)}</div>
          </section>
        </div>
      </div>
    );
  };
}

export default App;
