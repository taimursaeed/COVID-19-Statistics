var worldwide = false;
var url = new URL(document.location);
var params = url.searchParams;
var countryID = params.get("country");
countryID &&
$("#country option[value=" + countryID.toUpperCase() + "]").length > 0
  ? (countryID = countryID.toUpperCase())
  : (countryID = "WW");

$(document).ready(function() {
  $("#country").val(countryID);
  countryID == "WW"
    ? ((worldwide = true),
      showData("https://thevirustracker.com/free-api?global=stats"))
    : showData(
        "https://thevirustracker.com/free-api?countryTotal=" + countryID
      );

  $("#country").on("change", function() {
    worldwide = false;
    var selectedValue = $(this).val();
    selectedValue == "WW"
      ? ((worldwide = true),
        showData("https://thevirustracker.com/free-api?global=stats"))
      : showData(
          "https://thevirustracker.com/free-api?countryTotal=" + selectedValue
        );
    params.set("country", selectedValue);
    window.history.replaceState({}, "", `?country=${selectedValue}`);
  });
});

function showData(url) {
  $.ajax({
    url: url,
    dataType: "json",
    beforeSend: function() {
      $(".loader").show();
      $(".count").hide();
      $(".loader").addClass("animate");
      $(".count").removeClass("animate");
    },
    success: function(data) {
      // debugger;
      $("#total>div,#new>div").each(function() {
        var text;
        worldwide
          ? (text = data.results[0][$(this)[0].id].toLocaleString())
          : (text = data["countrydata"][0][$(this)[0].id].toLocaleString());
        $(this)
          .find(".count")
          .text(text);
      });
      $(".loader").hide();
      $(".count").show();
      $(".loader").removeClass("animate");
      $(".count").addClass("animate");
    }
  });
}
