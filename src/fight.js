export class Fight {
  constructor(eventList) {
    this.eventList = eventList;
  }
  getEvents() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://ufc-data-api.ufc.com/api/v1/us/events`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
  // findFightersByName(name) {
  //   let findfighterReturn = []
  //   for (let i = 0; i < this.rosterList.length; i++) {
  //     if(this.rosterList[i].firstName.includes(name) || this.rosterList[i].lastName.includes(name) || name === (this.rosterList[i].firstName + " " + this.rosterList[i].lastName)) {
  //       findfighterReturn.push(this.rosterList[i]);
  //     }
  //   }
  //   return findfighterReturn;
  // }
  //
  // findFighterById(id) {
  //   for (let i = 0; i < this.rosterList.length; i++) {
  //     if(this.rosterList[i].id === parseInt(id)) {
  //       return this.rosterList[i];
  //     }
  //   }
  // }
}
