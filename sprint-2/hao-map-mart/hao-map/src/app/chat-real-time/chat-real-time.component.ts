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
  constructor() { }

  ngOnInit(): void {
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
    this.myAccount = sessionStorage.getItem('username');
    this.myGender = Number(sessionStorage.getItem('gender'));
  }

  joinRoomChat(user: AppUser) {
    this.anotherAccount = user.username;
    this.anotherAccountGender = user.gender;
    let username = user.username.replace('@', '');
    if (user.appRoles.name === 'MEMBER'){
      this.roomName = sessionStorage.getItem('username') + username;
    }else {
      this.roomName = username + sessionStorage.getItem('username');
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
      username: sessionStorage.getItem('username')
    }

    const newMessage = firebase.database().ref('chats/' + this.roomName).push();
    newMessage.set(chat);
    this.chatForm.reset();
  }
}
