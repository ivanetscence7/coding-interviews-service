import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SocketIoService } from '../service/socketio.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { transform } from '@babel/standalone';

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  @Input()
  text: string;

  @Input()
  areaOutput: string;

  executedCode: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  output: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  options = {
    lineNumbers: true,
    theme: 'material',
    mode: {
      name: 'javascript',
    },
  };

  private docSub: Subscription;

  private areaSub: Subscription;

  constructor(private socketService: SocketIoService, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this.activeRoute.snapshot.paramMap.get('candidate') !== null) {
      this.socketService.joinRoom(this.activeRoute.snapshot.paramMap.get('candidate'));
      this.docSub = this.socketService.receiveText().subscribe(doc => (this.text = doc));
      this.areaSub = this.socketService.receiveExecutedCode().subscribe(area => (this.areaOutput = area));
    } else {
      this.docSub = new Subscription();
      this.areaSub = new Subscription();
    }

    const add = (something: string) => {
      this.socketService.sendExecutedCode({
        room: this.activeRoute.snapshot.paramMap.get('candidate'),
        executedCode: something.toString(),
      });
      this.output.next(something);
    };

    console.log = function(...args) {
      args.forEach(add);
    };

    console.info = function(...args) {
      args.forEach(add);
    };

    console.warn = function(...args) {
      args.forEach(add);
    };

    console.error = function(...args) {
      args.forEach(add);
    };
  }

  editText() {
    this.socketService.sendText({ room: this.activeRoute.snapshot.paramMap.get('candidate'), message: this.text });
  }

  getEditorContent(event) {
    this.executedCode.next(event);
  }

  getResult(): Observable<string> {
    return this.output.asObservable();
  }

  executeCode() {
    if (this.socketService.receiveText()) {
      this.executedCode.next(this.text);
    }
    const transpile = transform(this.executedCode.getValue(), { presets: [['typescript', { allExtensions: true }]] })
      .code;
    try {
      new Function(transpile)();
    } catch (error) {
      console.error(error);
    }
  }

  leaveEditorRoom() {
    this.socketService.leaveRoom(this.activeRoute.snapshot.paramMap.get('candidate'));
    window.location.assign('coding-interviews/list');
  }

  ngOnDestroy() {
    this.docSub.unsubscribe();
    this.areaSub.unsubscribe();
  }
}
