$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="main-message__user-info" data-message-id=${message.id}>
          <div class="main-message__user-info__username ">
            ${message.user_name}
          </div>
          <div class="main-message__user-info__date-time">
            ${message.created_at}
          </div>
        </div>
        <div class="main-message__message-box" data-message-id=${message.id}>
          ${message.content}
        </div>
        <img src=${message.image}>`
      return html;
    } else {
      var html =
       `<div class="main-message__user-info" data-message-id=${message.id}>
          <div class="main-message__user-info__username">
            ${message.user_name}
          </div>
          <div class="main-message__user-info__date-time">
            ${message.created_at}
          </div>
        </div>
        <div class="main-message__message-box" data-message-id=${message.id}>
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
      var html = buildHTML(data);
      $(".main-message").append(html);
      $('form')[0].reset();
      $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.submit-btn').attr('disabled', false);
    });
  })
  var reloadMessages = function() {
    var last_message_id = $('.main-message__user-info:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-message').append(insertHTML);
        $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});