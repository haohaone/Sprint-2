import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import {AppUser} from "../model/app-user";
import {ChatBox} from "../model/chat";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-chat-real-time',
  templateUrl: './chat-real-time.component.html',
  styleUrls: ['./chat-real-time.component.css']
})
export class ChatRealTimeComponent implements OnInit {
  appUserList: AppUser[] = [];
  chats: ChatBox[] = [];
  myAccount: string;
  myGender: number;
  anotherAccount: string;
  anotherAccountGender: number;
  chatForm: FormGroup;
  roomName = '';
  appUserNow: AppUser = null;
  myUserName = '';
  notification = new Map();

  constructor() { }

  ngOnInit(): void {
    this.myAccount = sessionStorage.getItem('username');
    this.myGender = Number(sessionStorage.getItem('gender'));
    this.myUserName = sessionStorage.getItem('username');
    for (let i = 0; i < this.myUserName.length; i++) {
      if (this.myUserName.charAt(i) === '@'){
        this.myUserName = this.myUserName.replace('@', '');
      }else if (this.myUserName.charAt(i) === '.'){
        this.myUserName = this.myUserName.replace('.', '');
      }
    }

    firebase.database().ref('notification').on("value", req => {
      snapshotToArray(req).filter(value => {
        if (value.username !== this.myAccount && value.key.search(this.myUserName) > -1){
          this.notification.set(value.username, 'have email')
        }
      });
    })

    this.chatForm = new FormGroup({
      message: new FormControl('', Validators.required)
    })
    firebase.database().ref('users/').on('value', (resp2: any) => {
      if (sessionStorage.getItem('roles') == 'ADMIN'){
        this.appUserList = snapshotToArray(resp2).filter((value: AppUser) => value.appRoles.name == 'MEMBER');
      }else {
        this.appUserList = snapshotToArray(resp2).filter((value: AppUser) => value.appRoles.name == 'ADMIN');
      }
    });
  }

  joinRoomChat(user: AppUser) {
    this.appUserNow = user;
    this.anotherAccount = user.username;
    this.anotherAccountGender = user.gender;
    let username = user.username;
    for (let i = 0; i < username.length; i++) {
      if (username.charAt(i) === '@'){
        username = username.replace('@', '');
      }else if (username.charAt(i) === '.'){
        username = username.replace('.', '');
      }
    }

    if (user.appRoles.name === 'MEMBER'){
      this.roomName = this.myUserName + username;
    }else {
      this.roomName = username + this.myUserName;
    }

    firebase.database().ref('chats/' + this.roomName).on('value', a => {
      if (a.exists()) {
        this.chats = snapshotToArray(a);
      }else {
        this.chats = [];
      }
    })
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'MMM d, y, h:mm:ss a', 'en-US');
  }

  sendMail(){
    const chat: ChatBox = {
      message: this.chatForm.value.message,
      date: this.getCurrentDateTime(),
      username: this.myAccount
    }

    const newMessage = firebase.database().ref('chats/' + this.roomName).push();
    newMessage.set(chat);
    firebase.database().ref('notification/' + this.roomName).set(
      {
        username: this.myAccount,
        status: 'sent mail'
      }
    )
    this.notification.delete(this.anotherAccount);
    this.chatForm.reset();
  }
}
