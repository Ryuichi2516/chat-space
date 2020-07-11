$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="main-message__user-info">
          <div class="main-message__user-info__username ">
            ${message.user_name}
          </div>
          <div class="main-message__user-info__date-time">
            ${message.created_at}
          </div>
        </div>
        <div class="main-message__message-box">
          ${message.content}
        </div>
        <img src=${message.image} >`
      return html;
    } else {
      var html =
       `<div class="main-message__user-info">
          <div class="main-message__user-info__username ">
            ${message.user_name}
          </div>
          <div class="main-message__user-info__date-time">
            ${message.created_at}
          </div>
        </div>
        <div class="main-message__message-box">
          ${message.content}
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data);
      var html = buildHTML(data);
      $(".main-message").append(html);
      $('form')[0].reset();
      $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
      $('.submit-btn').attr('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').attr('disabled', false);
    });
  })
})