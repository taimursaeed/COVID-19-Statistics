var worldwide = false;
var url = new URL(document.location);
var params = url.searchParams;
var countryID = params.get("country");
var apiURL = "https://thevirustracker.com/free-api";
var useProxy = true;

countryID &&
$("#country option[value=" + countryID.toUpperCase() + "]").length > 0
  ? (countryID = countryID.toUpperCase())
  : (countryID = "WW");

$(document).ready(function () {
  $("#country").val(countryID);
  countryID == "WW"
    ? ((worldwide = true), showData(apiURL + "?global=stats"))
    : showData(apiURL + "?countryTotal=" + countryID);

  $("#country").on("change", function () {
    worldwide = false;
    var selectedValue = $(this).val();
    selectedValue == "WW"
      ? ((worldwide = true), showData(apiURL + "?global=stats"))
      : showData(apiURL + "?countryTotal=" + selectedValue);
    params.set("country", selectedValue);
    window.history.replaceState({}, "", `?country=${selectedValue}`);
  });
  var delay = 0.1;
  $(".has-animation").each(function () {
    $(this).css("transition-delay", delay + "s");
    $(this).removeClass("has-animation");
    delay += 0.1;
  });
});

function showData(url) {
  if (useProxy) {
    $.ajaxPrefilter(function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        options.url = "https://cors-anywhere.herokuapp.com/" + options.url;
      }
    });
  }

  $.ajax({
    url: url,
    dataType: "json",
    beforeSend: function () {
      $(".loader").show();
      $(".count").hide();
      $(".loader").addClass("animate");
      $(".count").removeClass("animate");
    },
    success: function (data) {
      $("#total>div,#new>div").each(function () {
        var text;
        worldwide
          ? (text = data.results[0][$(this)[0].id].toLocaleString())
          : (text = data["countrydata"][0][$(this)[0].id].toLocaleString());
        $(this).find(".count").text(text);
      });
      $(".loader").hide();
      $(".count").show();
      $(".loader").removeClass("animate");
      $(".count").addClass("animate");
    },
  });
}
