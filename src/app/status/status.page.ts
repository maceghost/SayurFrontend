import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AuthLocalProvider } from '../providers/authenticate/authlocal';

declare let require: any;
let moment = require('moment');

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  @ViewChild('statusEntries') statusEntries;
  constructor(private auth:AuthLocalProvider, private renderer:Renderer2) {
  }

  ngOnInit() {
    console.log('statusEntries : '+this.statusEntries);
    setTimeout(()=>{
      this.updateStatus();
    }, 2000);
  }

  updateStatus() {
    let status = this.auth.getSystemStatus();
    status.then(results => {
        // console.log('getLocalControllerStatus returning : '+results);
        // if (results.length > 0) {
        //    for (let stat of results) {
             // let parsedLog = JSON.stringify(log);
             // console.log('logEntry : '+JSON.stringify(parsedLog));
            // let le:any = this.buildStatusString(stat);
             //create the DOM element
            var keys = Object.getOwnPropertyNames(results);
            for (let key of keys) {
                let value = results[key];
                // let text = this.makePairs(results);
                let div=this.renderer.createElement('div');
                // div.classList.add('entry');
                let p=this.renderer.createElement('p');
                p.classList.add('entry');
                let title = this.renderer.createElement('label');
                title.classList.add('title');
                let v = this.renderer.createElement('label');
                v.classList.add('value');
                title.innerHTML = key;
                v.innerHTML = value;
                //create text for the element
                // const text = this.renderer.createText(le);
                //append text to li element
                // this.renderer.appendChild(div, JSON.stringify(stat));
                this.renderer.appendChild(p, title);
                this.renderer.appendChild(p, v);
                this.renderer.appendChild(div, p);
                // p.innerHTML=text;
                // div.innerHTML=JSON.stringify(stat);
                //Now append the li tag to divMessages div
                this.renderer.appendChild(this.statusEntries.nativeElement,div);
                console.log('statusEntry : '+JSON.stringify(this.statusEntries.nativeElement));
             // this.logEntries.push(le);
           }
           // }
        // }
    }).catch(error => {
        console.log("getLocalControllerStatus - error calling populate : "+error);
    });
  }


  buildStatusString(logEntry:any):String {
    console.log('buildLogString building - '+logEntry);
    var color:String = "#555555";
    switch (logEntry.level) {
      case "error":
        color = "#ea1300";
        break;
      case "info":
        color = "#2e9ed8";
        break;
      case "debug":
        color = "#00d86c";
        break;
    }

    // var s:String = "<TEXTFORMAT><FONT COLOR='" + color + "'>" + logEntry.level.toUpperCase() + " | ";
    var s:String = "<font color='" + color + "'>" + logEntry.level.toUpperCase() + " | ";
    s += logEntry.source.toUpperCase() + " | ";

    var d:Date = new Date(logEntry.ts * 1000);
    s += moment(d).format("YYYY-MM-DD hh:mm"); // DateHelper.get12HourTime(d, true);
    console.log('buildLogString moment - '+s);
    s += this.makePairs(logEntry);
    // s += "</FONT></TEXTFORMAT><BR/>";
    s += "</font><br/>";
    console.log('buildLogString returning - '+s);
    return s;
  }


  makePairs(o:any):string {
    var e:any;
    var s:string = "";

    var keys = Object.getOwnPropertyNames(o);
    for (let key of keys) {
      if (key != "level" && key != "ts" && key != "source" &&
        key != "trace" && key != "exception") {
        e = o[key];
        s += " ";
        // if (!noPipes) s += "| ";
        s += key + ": " + (typeof(e) == "object" ? "{ " + this.makePairs(e) + " }" : e);
      }
      s += "<br/>";
    }
    return s;
  }

}
