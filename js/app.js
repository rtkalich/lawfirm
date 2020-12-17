$(() => {
    $(".btn-toggle").on("click", function (e) {
      e.preventDefault;
      $(this).toggleClass("btn-toggle_active");
      $(".menu").toggleClass("menu__active");
    });
  });
  $(()=> {
    $('.contact__box_item').on("click", function(e){
      e.preventDefault();
      let top = $('#form').offset().top;
      $('html', 'body').animate({
        scrollTop: top
      }, 1000 );
    })
  })
  const scroll = new SmoothScroll('.contact__box_item[href="#form"]', {
    speed: 1500
  }); 
"use strict"

document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    let formData = new FormData(form);
   

    if( error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method:'POST',
        body:formData
        
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert('Ошибка')
        form.classList.remove('_sending');
      }
    }
  }

  function formValidate(form){
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index=0; index < formReq.length; index++){
      const input = formReq[index];
      formRemoveError(input);
      
      if(input.classList.contains('_email')) {
        if(emailTest(input)) {
          formAddError(input);
          error++;
        }
      }else if(input.value === '') {
        formAddError(input);
        error++;
      }

    }
      return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
})

function scrollTo(element) {
  window.scroll({
    left: 0, 
    top: element.offsetTop, 
    behavior: 'smooth'
  })
}

var button = document.querySelector('.contact__box_item');
var footer = document.querySelector('#form');

button.addEventListener('click', () => {
  scrollTo(footer);
})