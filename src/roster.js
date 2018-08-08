export class Roster {
  constructor(rosterList) {
    this.rosterList = rosterList;
  }
  getStatsAll() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://ufc-data-api.ufc.com/api/v1/us/fighters`;
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
  findFighter(name) {
    let findfighterReturn = []
    for (var i = 0; i < this.rosterList.length; i++) {
      if(this.rosterList[i].firstName.includes(name) || this.rosterList[i].lastName.includes(name)) {
        findfighterReturn.push(this.rosterList[i]);
      }
    }
    return findfighterReturn;
  }
}
