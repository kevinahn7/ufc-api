import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Fighter } from './fighter.js';
import { Roster } from './roster.js';

$(document).ready(function() {

  //let fighterOneSearch = $("#fighterOneInput").val();

  let fighterList = new Roster();
  let promise = fighterList.getStatsAll();
  let rosterList = {};
  let newFighter;
  promise.then(function(response) {
    let body = JSON.parse(response);
    for(let i = 0; i < body.length; i++) {
      let newFighter = new Fighter(body[i].id, body[i].first_name, body[i].last_name)
      rosterList[newFighter.id] = newFighter;
    }
    console.log(rosterList[5].firstName);
  });
});
