$(document).ready(function() {
  var nurl;
  var worldwide = false;
  $("#country").on("change", function() {
    worldwide = false;
    $(this).val() == "ALL"
      ? ((nurl = "https://thevirustracker.com/free-api?global=stats"),
        (worldwide = true))
      : (nurl =
          "https://thevirustracker.com/free-api?countryTotal=" + $(this).val());

    $.ajax({
      url: nurl,
      dataType: "json",
      beforeSend: function() {
        $(".count").hide();
        $(".loader").show();
      },
      success: function(data) {
        $("#total div,#new div").each(function() {
          var text;
          worldwide
            ? (text = data.results[0][$(this)[0].id])
            : (text = data["countrydata"][0][$(this)[0].id]);
          $(this)
            .find(".count")
            .text(text);
        });
        $(".loader").hide();
        $(".count").show();
      }
    });
  });
});
