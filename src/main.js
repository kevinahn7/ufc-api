
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Fighter } from './fighter.js';
import { Roster } from './roster.js';
import { Fight } from './fight.js';

$(document).ready(function() {

  //let fighterOneSearch = $("#fighterOneInput").val();

  let fighterList = new Roster();
  let fightList = new Fight();
  let promise = fighterList.getStatsAll();
  let promiseTwo = fightList.getFights();
  let rosterList = [];
  let eventList = [];
  let newFighter;
  let currentRoster;
  let currentFight;
  let fighterOne;
  let fighterTwo;
  promise.then(function(response) {
    let body = JSON.parse(response);

    for(let i = 0; i < body.length; i++) {
      newFighter = new Fighter(body[i].id, body[i].first_name, body[i].last_name, body[i].weight_class, body[i].thumbnail)
      rosterList.push(newFighter);
    }

    currentRoster = new Roster(rosterList);

    $('#fighterOne').submit((event) => {
      event.preventDefault();
      let nameOne = $('#nameOne').val();
      let fighterResultArray = currentRoster.findFightersByName(nameOne);
      $("#fighterNames").html("");
      for(let j = 0; j < fighterResultArray.length; j++) {
        $('#fighterNames').append('<li>' + fighterResultArray[j].firstName + ' ' + fighterResultArray[j].lastName + '</li><button value="' + fighterResultArray[j].id + '" class="buttonOneClick">Add to slot 1</button><button value="' + fighterResultArray[j].id + '" class="buttonTwoClick">Add to slot 2</button>');
      }

      $(".buttonOneClick").click(function() {
        let fighterId = $(this).val();
        let fighterResult = currentRoster.findFighterById(fighterId);
        fighterOne = fighterResult;
        console.log(fighterResult);
        $('#fighterOneContent').html(`<img src="${fighterResult.pictureLink}"><br> <br><p>${fighterResult.firstName} ${fighterResult.lastName}</p><br><p>${fighterResult.weightClass}</p>`);
      })

      $(".buttonTwoClick").click(function() {
        let fighterId = $(this).val();
        let fighterResult = currentRoster.findFighterById(fighterId);
        fighterTwo = fighterResult;
        console.log(fighterResult);
        $('#fighterTwoContent').html(`<img src="${fighterResult.pictureLink}"><br> <br><p>${fighterResult.firstName} ${fighterResult.lastName}</p><br><p>${fighterResult.weightClass}</p>`);
      })
    });
  }, (error) => {
    $('.showErrors').text(`There was an error processing your request: ${error.message}`);
  });
  promiseTwo.then((response) => {
    let body = JSON.parse(response);

    for(let i = 0; i < body.length; i++) {
      $('.fights').append('<tr><td>' + body[i].title_tag_line + '</td><td>' + body[i].arena + '</td><td>' + body[i].location + '</td><td>' + body[i].subtitle + '</td><td>' + body[i].event_time_text + '</td></tr>');
    }
  }, (error) => {
    $('.showErrorsEvents').text(`There was an error processing your request: ${error.message}`);
  });
});
