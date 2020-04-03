import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AuthLocalProvider } from '../providers/authenticate/authlocal';

declare let require: any;
let moment = require('moment');
// let tz = moment.tz.guess();

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {

  _lastTS = 0;
  // logEntries:any[] = [];
  @ViewChild('logEntries') logEntries;
  constructor(private auth:AuthLocalProvider, private renderer:Renderer2) {
  }

  ngOnInit() {
    console.log('logEntries : '+this.logEntries);
    setTimeout(()=>{
      this.updateLogs();
    }, 2000);
  }

  updateLogs() {
    let logs = this.auth.loadNextLogs(this._lastTS);
    logs.then(results => {
        // console.log('getLocalControllerStatus returning : '+results);
        if (results.length > 0) {
           this._lastTS = results[results.length-1].ts;
           for (let log of results) {
             // let parsedLog = JSON.stringify(log);
             // console.log('logEntry : '+JSON.stringify(parsedLog));
            let le:any = this.buildLogString(log);
             //create the DOM element
            let div=this.renderer.createElement('div');

            //create text for the element
            // const text = this.renderer.createText(le);

            //append text to li element
            // this.renderer.appendChild(div, text);
            div.innerHTML=le;
            //Now append the li tag to divMessages div
            this.renderer.appendChild(this.logEntries.nativeElement,div);
             // console.log('logEntry : '+JSON.stringify(le));
             // this.logEntries.push(le);
           }
        }
    }).catch(error => {
        console.log("getLocalControllerStatus - error calling populate : "+error);
    });
  }


  buildLogString(logEntry:any):String {
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
    }
    return s;
  }

}
