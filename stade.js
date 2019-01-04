

/* var equipes = [ 

  { label: "TSG 1899 Hoffenheim", category: "Allemagne" },
  { label: "Bayer 04 Leverkusen", category: "Allemagne" },
  { label: "BV Borussia 09 Dortmund", category: "Allemagne" },
  { label: "FC Bayern München", category: "Allemagne" },
  { label: "FC Schalke 04", category: "Allemagne" },
  { label: "Hannover 96", category: "Allemagne" },
  { label: "Hertha BSC", category: "Allemagne" },
  { label: "VfB Stuttgart", category: "Allemagne" },
  { label: "VfL Wolfsburg", category: "Allemagne" },
  { label: "SV Werder Bremen", category: "Allemagne" },
  { label: "1. FC Nürnberg", category: "Allemagne" },
  { label: "1. FSV Mainz 05", category: "Allemagne" },
  { label: "FC Augsburg", category: "Allemagne" },
  { label: "SC Freiburg", category: "Allemagne" },
  { label: "Borussia Mönchengladbach", category: "Allemagne" },
  { label: "Eintracht Frankfurt", category: "Allemagne" },
  { label: "TSV Fortuna 95 Düsseldorf", category: "Allemagne" },
  { label: "RB Leipzig", category: "Allemagne" },
  { label: "AFC Bournemouth", category: "Angleterre" },
  { label: "Arsenal FC", category: "Angleterre" },
  { label: "Brighton & Hove Albion FC", category: "Angleterre" },
  { label: "Burnley FC", category: "Angleterre" },
  { label: "Cardiff City FC", category: "Angleterre" },
  { label: "Chelsea FC", category: "Angleterre" },
  { label: "Crystal Palace FC", category: "Angleterre" },
  { label: "Everton FC", category: "Angleterre" },
  { label: "Fulham FC", category: "Angleterre" },
  { label: "Huddersfield Town AFC", category: "Angleterre" },
  { label: "Leicester City FC", category: "Angleterre" },
  { label: "Liverpool FC", category: "Angleterre" },
  { label: "Manchester City FC", category: "Angleterre" },
  { label: "Manchester United FC", category: "Angleterre" },
  { label: "Newcastle United FC", category: "Angleterre" },
  { label: "Southampton FC", category: "Angleterre" },
  { label: "Tottenham Hotspur FC", category: "Angleterre" },
  { label: "Watford FC", category: "Angleterre" },
  { label: "West Ham United FC", category: "Angleterre" },
  { label: "Wolverhampton Wanderers FC", category: "Angleterre" },
  { label: "Amiens SC", category: "France" },
  { label: "Angers SCO", category: "France" },
  { label: "AS Monaco FC", category: "France" },
  { label: "AS Saint-Étienne", category: "France" },
  { label: "Dijon Football Côte d'Or", category: "France" },
  { label: "En Avant Guingamp", category: "France" },
  { label: "FC Girondins de Bordeaux", category: "France" },
  { label: "FC Nantes", category: "France" },
  { label: "Lille OSC", category: "France" },
  { label: "Montpellier HSC", category: "France" },
  { label: "Nîmes Olympique", category: "France" },
  { label: "OGC de Nice Côte d'Azur", category: "France" },
  { label: "Olympique de Marseille", category: "France" },
  { label: "Olympique Lyonnais", category: "France" },
  { label: "Paris Saint-Germain FC", category: "France" },
  { label: "RC Strasbourg Alsace", category: "France" },
  { label: "SM Caen", category: "France" },
  { label: "Stade de Reims", category: "France" },
  { label: "Stade Rennais FC 1901", category: "France" },
  { label: "Toulouse FC", category: "France" },
]; */

//click sur bouton recherche ------------------------>
function recherche() {
  $(document).ready(function () {
    $.ajax({
      url: "stade.json",
      dataType: 'json',
      type: 'GET',
    }).done(function (response) {
      var choixEquipe = document.getElementById("search").value;
      console.log(choixEquipe);
      var teamId = "";
      for (i = 0; i < response.teams.length; i++) {
        if (choixEquipe == response.teams[i].name) {
          teamId = response.teams[i].id;
        }
      }
      console.log(teamId);
      console.log(response);
      document.getElementById("output").innerHTML = "";
      var apartir = document.getElementById("alternateFrom").value;
      console.log(apartir);
      var jusqua = document.getElementById("alternateTo").value;
      console.log(jusqua);
      $.ajax({
        headers: { 'X-Auth-Token': 'ec6c6b0d72b848a5acd69179e0fe86e0' },
        url: 'https://api.football-data.org/v2/teams/' + teamId + '/matches?dateFrom=' + apartir + '&dateTo=' + jusqua,
        dataType: 'json',
        type: 'GET',
      }).done(function (response) {
        for (i = 0; i < response.matches.length; i++) {
          document.getElementById("output").innerHTML += response.matches[i].utcDate + " : " + response.matches[i].homeTeam.name + " contre " + response.matches[i].awayTeam.name + "<br>";

          // do something with the response, e.g. isolate the id of a linked resource   
          console.log(response);
        }
      })
    })
  })
}

//Datepicker ------------------------>
$(function () {
  var dateFormat = "dd/mm/yy",
    from = $("#from")
      .datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        autoSize: true,
        dayNamesMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
        dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        maxDate: +365,
        showAnim: "fade",
        altField: "#alternateFrom",
        altFormat: "yy-mm-dd",
      })

      .on("change", function () {
        to.datepicker("option", "minDate", getDate(this));
      }),
    to = $("#to").datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      autoSize: true,
      dateFormat: "dd/mm/yy",
      dayNamesMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
      dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      firstDay: 1,
      maxDate: +365,
      showAnim: "fade",
      altField: "#alternateTo",
      altFormat: "yy-mm-dd",


    })
      .on("change", function () {
        from.datepicker("option", "maxDate", getDate(this));
      });

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }

    return date;
  }
});

//Barre de recherche ------------------------>
$(function () {
  $(document).ready(function () {
    $.ajax({
      url: "stade.json",
      dataType: 'json',
      type: 'GET',
    }).done(function (response) {
      console.log(response);
      var equipes = [{ label: "", category: "" }];
      for (i = 0; i < response.teams.length; i++) {
        var labelEquipes = response.teams[i].name;
        var categoryEquipes = response.teams[i].category;
        equipes.push({label: labelEquipes, category: categoryEquipes });
      }

      $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function () {
          this._super();
          this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        },
        _renderMenu: function (ul, items) {
          var that = this,
            currentCategory = "";
          $.each(items, function (index, item) {
            var li;
            if (item.category != currentCategory) {
              ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
              currentCategory = item.category;
            }
            li = that._renderItemData(ul, item);
            if (item.category) {
              li.attr("aria-label", item.category + " : " + item.label);
            }
          });
        }
      });
      var accentMap = {
        "à": "a",
        "É": "e",
        "î": "i",
        "ü": "u",
        "ö": "o",
      };
      var normalize = function (term) {
        var ret = "";
        for (var i = 0; i < term.length; i++) {
          ret += accentMap[term.charAt(i)] || term.charAt(i);
        }
        return ret;
      };

      $("#search").catcomplete({
        delay: 0,
        source: equipes,
        source: function (request, response) {
          var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
          response($.grep(equipes, function (value) {
            value = value.label || value.value || value;
            return matcher.test(value) || matcher.test(normalize(value));
          }));
        }
      });
    })
  })
});

