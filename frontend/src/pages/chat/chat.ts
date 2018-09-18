import { Component, ViewChild, ElementRef } from '@angular/core'
import { NavController, NavParams, Content, LoadingController } from 'ionic-angular'
import * as moment from 'moment'

// services
import { GlobalProvider } from '../../providers/global/global'
import { ContractProvider } from '../../providers/contract/contract'
import { UserProvider } from '../../providers/user/user'


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  msgList: any = [];
  user
  toUser
  editorMsg = ''
  id

  isLoading

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public globalProvider: GlobalProvider,
    private _contractProvider: ContractProvider,
    private _userProvider: UserProvider
  ) {
    this.isLoading = this.loadingCtrl.create()

    this.user = {
      id: this.globalProvider.profile.user_id,
      name: 'Tú', // this.globalProvider.profile.name
      avatar: this.globalProvider.profile.avatar ? this.globalProvider.galleryUrl + '/' + this.globalProvider.profile.avatar  : this.globalProvider.emptyProfile
    }

    const walker = this.navParams.get('walker')

    if(walker)
      this.toUser = {
        id: walker._id,
        name: walker.name,
        avatar: walker.avatar ? this.globalProvider.galleryUrl + '/' + walker.avatar : this.globalProvider.emptyProfile
      }

    else {
      const walkerId = this.navParams.get('walkerId')
      this._userProvider.getProfileById({id: walkerId}).subscribe(
        (response: any) => {

          if(response && response._id) {

            this.toUser = {
              id: response._id,
              name: response.name,
              avatar: response.avatar ? this.globalProvider.galleryUrl + '/' + response.avatar : this.globalProvider.emptyProfile
            }

            this.getMsg()
          }

        },
        (error) => {
          this.reject()
        }
      )
    }
    console.log('uid', this.globalProvider.profile, 'touser', this.toUser)
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id')

    if(this.id && this.toUser)
      this.getMsg()

    else
      this.isLoading.present()
  }


  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }


  getMsg() {
    this.isLoading.dismiss()

    const payload = {
      idcontract: this.id
    }

    // Get mock message list
    this._contractProvider.getChat(payload).subscribe(
      (response) => {
        // this.msgList = response;
        const messages: any = response
        this.workMessages(messages)
      }
    )
  }


  workMessages(messages) {
    let prevDate,
        actualDate,
        prevUser,
        actualUser


    messages.map((message, i) => {
      messages[i].id = message.id
      messages[i].userId = message.user[0]


      // set acutal date
      actualDate = moment(message.create)
      // set message hour
      messages[i].createdAt = actualDate.format('H:mm')
      // set message day
      if(prevDate) {
        let diff = moment(actualDate).diff(prevDate, 'days')
        if(diff > 0) {
          messages[i].showDate = actualDate.format('DD/MM/YYYY')
          messages[i].showUser = true
        }
      }
      else {
        messages[i].showDate = actualDate.format('DD/MM/YYYY')
        messages[i].showUser = true
      }
      prevDate = actualDate


      // set actual user
      actualUser = message.user[0]
      // set message day
      if(prevUser) {
        if(prevUser != actualUser)
          messages[i].showUser = true
      }
      else
        messages[i].showUser = true
      prevUser = actualUser


      // me
      if(message.userId === this.user.id) {
        messages[i].userName = this.user.name
        messages[i].userAvatar = this.user.avatar
      }

      // walker
      if(message.userId === this.toUser.id) {
        messages[i].userName = this.toUser.name
        messages[i].userAvatar = this.toUser.avatar
      }


      // FIXME remove this!!
      // if(!message.user[0]) {
      //   messages[i].userName = this.toUser.name
      //   messages[i].user = [this.toUser.id]
      //   messages[i].userId = this.toUser.id
      //   console.log('M', messages[i])
      // }


    })

    this.msgList = messages

    this.scrollToBottom();
  }


  sendMsg() {
    if (!this.editorMsg.trim()) return

    // Mock message
    const id = Date.now().toString(),
          message = this.editorMsg


    // this.pushNewMsg(newMsg);
    this.editorMsg = ''
    this.focus()
    const payload = {
            contract: this.id,
            message: message
          },
          chat = {
            sendId: id,
            create: new Date(),
            status: 'pending',
            text: message,
            user: [this.user.id],
            userId: this.user.id,
            userName: this.user.name,
            createdAt: moment(new Date()).format('H:mm')
          }

    this.pushNewMsg(chat)
    this.scrollToBottom()
    this.workMessages(this.msgList)

    this._contractProvider.newChatMessage(payload).subscribe(
      (response) => {
        let index = this.getMsgIndexById(id)
        if (index !== -1) {
          this.msgList[index].status = true
        }
      }
    )
  }


  pushNewMsg(msg) {
    /*
    const userId = this.user.id,
      toUserId = this.toUser.id;
    // Verify user relationships
    */
    //if (msg.userId === userId && msg.toUserId === toUserId) {
    this.msgList.push(msg);
    //} else if (msg.toUserId === userId && msg.userId === toUserId) {
    //  this.msgList.push(msg);
    //}
  }


  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.sendId === id)
  }


  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }


  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }


  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }


  reject() {
    this.navCtrl.pop()
    this.globalProvider.toast('No se pudo obtener información del usuario. Revisa tu conexión a internet')
  }

}
