// $('.dial').knob(
// {
//   'min':10,
//   'max':10,
//   'width':100,
//   'height':100,
//   'displayInput':true,
//   'data-thickness':0.1,
//   'fgColor':"#FF0000",
//   'thickness':0.1,
//
// });


var x = 0;
$(function () {
  $('#dial').knob({
    min: '10',
    max: '10',
    width:'100',
    height:'100',
    thickness: '0.1',
    fgColor: '#f00',
    bgColor:"#f00",
    readOnly: true
  });
  $('#dial').val(10927).trigger('change');

$('#dial').click(function(e){
  // e.preventDefault();
  if (x === 0) {
    x ++;
    console.log(x);
    console.log("x is added");
    $('#dial').trigger(
      'configure',
      {
        fgColor:"#001",
        bgColor:"#001"
      }
    );
  } else {
    x --;
    console.log(x);
    console.log("x is subtracted");
    // $('#dial').trigger(
      'configure',
      {
        fgColor:"#f00",
        bgColor:"#FF0000"
      }
    // );


  }
});
});




var x = 0;
$(function () {
  $('.dial1').knob({
    min: '10',
    max: '10',
    width:'100',
    height:'100',
    thickness: '0.1',
    fgColor: '#f00',
    bgColor:"#f00",
    readOnly: true
  });
  $('.dial1').val(10927).trigger('change');

$('.dial1').click(function(e){
  // e.preventDefault();
  if (x === 0) {
    x ++;
    console.log(x);
    console.log("x is added");
    $('.dial1').trigger(
      'configure',
      {
        fgColor:"#001",
        bgColor:"#001"
      }
    );
  } else {
    x --;
    console.log(x);
    console.log("x is subtracted");
    $('.dial1').trigger(
      'configure',
      {
        fgColor:"#f00",
        bgColor:"#FF0000"
      }
    );


  }

});
});
