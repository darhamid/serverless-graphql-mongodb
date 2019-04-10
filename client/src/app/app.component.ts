import { Component, OnInit } from "@angular/core";
import { AppService } from "./services/app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "welcome to dream job..";
  appId: AppId = new AppId();
  id: string = null;
  data:AppId = new AppId();
  success = false;
  constructor(public appService: AppService) {}

  ngOnInit() {
  }

  createAppID() {
    const postData: IAppId = <IAppId>{
      appId: {
        _id: null,
        name: this.appId.name,
        email: this.appId.email
      }
    };
    this.appService.saveAppDetails(postData).subscribe((result: any) => {
      this.id = result.upserted[0]._id;
      this.getAppDetails();
    });
  }

  getAppDetails() {
    this.appService.getAppDetails(this.id).subscribe((result: any) => {
      if (result) {
        this.data = result.data.appId;
        this.success = true;
      }
    });
  }
}

class AppId {
  _id: string = null;
  name: string = null;
  email: string = null;
}

interface IAppId {
  appId: AppId;
}
