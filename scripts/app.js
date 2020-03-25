var worldwide = true;

$(document).ready(function() {
  showData("https://thevirustracker.com/free-api?global=stats");
  $("#country").on("change", function() {
    worldwide = false;
    $(this).val() == "ALL"
      ? ((worldwide = true),
        showData("https://thevirustracker.com/free-api?global=stats"))
      : showData(
          "https://thevirustracker.com/free-api?countryTotal=" + $(this).val()
        );
  });
});

function showData(url) {
  $.ajax({
    url: url,
    dataType: "json",
    beforeSend: function() {
      $(".count").hide();
      $(".loader").show();
    },
    success: function(data) {
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
    }
  });
}
