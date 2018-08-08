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
  let rosterList = [];
  let newFighter;
  let currentRoster;
  promise.then(function(response) {
    let body = JSON.parse(response);
    for(let i = 0; i < body.length; i++) {
      newFighter = new Fighter(body[i].id, body[i].first_name, body[i].last_name, body[i].weight_class, body[i].thumbnail)
      rosterList.push(newFighter);
    }
    currentRoster = new Roster(rosterList);

    $('#fighterOne').submit(function(event){
      event.preventDefault();
      let nameOne = $('#nameOne').val();
      let fighterResultArray = currentRoster.findFighter(nameOne);
      $("#fighterNames").html("");
      for(let j = 0; j < fighterResultArray.length; j++) {
        $('#fighterNames').append('<li>' + fighterResultArray[j].firstName + ' ' + fighterResultArray[j].lastName + '</li><button value="' + fighterResultArray[j] + '" class="buttonOneClick">Add to slot 1</button><button>Add to slot 2</button>');
      }

      $(".buttonOneClick").click(function() {
        console.log($(".buttonOneClick").val().last);
      })

    });


  });


});
