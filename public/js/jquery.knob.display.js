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


//button-loop-1
$(function () {
  $('#button-loop-1').knob({
    min: '10',
    max: '10',
    width:'100',
    height:'100',
    thickness: '0.1',
    fgColor: '#f00', // font color
    bgColor:'#ffef7c', //border of circle
    background: '#ccc000',
    readOnly: true
  });
  // $('#button-loop-1').val(10927).trigger('change');
var button1 = 0;
$('#button-loop-1').click(function(e){
  // e.preventDefault();
  if (button1 === 0) {
    button1 ++;
    console.log(button1);
    console.log("button1 is pressed");
    $('#button-loop-1').trigger(
      'configure',
      {
        fgColor:"#001",
        bgColor:"#001" //border of circle
      }
    );
  } else {
    button1 --;
    console.log(button1);
    console.log("button1 is off");
    $('#button-loop-1').trigger(
      'configure',
      {
        fgColor:"#f00",
        bgColor:"#ffef7c" //border of circle
      }
    );
  }
});
});

//button-loop-2
$(function () {
  $('#button-loop-2').knob({
    min: '10',
    max: '10',
    width:'100',
    height:'100',
    thickness: '0.1',
    fgColor: '#f00',
    bgColor:'#f00',
    background: '#ccc000',
    readOnly: true
  });
var button1 = 0;
$('#button-loop-2').click(function(e){
  // e.preventDefault();
  if (button1 === 0) {
    button1 ++;
    $('#button-loop-2').trigger(
      'configure',
      {
        fgColor:"#001",
        bgColor:"#001"
      }
    );
  } else {
    button1 --;
    $('#button-loop-2').trigger(
      'configure',
      {
        fgColor:"#f00",
        bgColor:"#FF0000"
      }
    );
  }
});
});

//button-loop-3
$(function () {
  $('#button-loop-3').knob({
    min: '10',
    max: '10',
    width:'100',
    height:'100',
    thickness: '0.1',
    fgColor: '#f00',
    bgColor:'#f00',
    background: '#ccc000',
    readOnly: true
  });
var button1 = 0;
$('#button-loop-3').click(function(e){
  // e.preventDefault();
  if (button1 === 0) {
    button1 ++;
    $('#button-loop-3').trigger(
      'configure',
      {
        fgColor:"#001",
        bgColor:"#001"
      }
    );
  } else {
    button1 --;
    $('#button-loop-3').trigger(
      'configure',
      {
        fgColor:"#f00",
        bgColor:"#FF0000"
      }
    );
  }
});
});


//button-loop-4
$(function () {
  $('#button-loop-4').knob({
    min: '10',
    max: '10',
    width:'100',
    height:'100',
    thickness: '0.1',
    fgColor: '#f00',
    bgColor:'#f00',
    background: '#ccc000',
    readOnly: true
  });
var button1 = 0;
$('#button-loop-4').click(function(e){
  // e.preventDefault();
  if (button1 === 0) {
    button1 ++;
    $('#button-loop-4').trigger(
      'configure',
      {
        fgColor:"#001",
        bgColor:"#001"
      }
    );
  } else {
    button1 --;
    $('#button-loop-4').trigger(
      'configure',
      {
        fgColor:"#f00",
        bgColor:"#FF0000"
      }
    );
  }
});
});

//button-loop-5
$(function () {
  $('#button-loop-5').knob({
    min: '10',
    max: '10',
    width:'100',
    height:'100',
    thickness: '0.1',
    fgColor: '#f00',
    bgColor:'#f00',
    background: '#ccc000',
    readOnly: true
  });
var button1 = 0;
$('#button-loop-5').click(function(e){
  // e.preventDefault();
  if (button1 === 0) {
    button1 ++;
    $('#button-loop-5').trigger(
      'configure',
      {
        fgColor:"#001",
        bgColor:"#001"
      }
    );
  } else {
    button1 --;
    $('#button-loop-5').trigger(
      'configure',
      {
        fgColor:"#f00",
        bgColor:"#FF0000"
      }
    );
  }
});
});

//button-loop-6
$(function () {
  $('#button-loop-6').knob({
    min: '10',
    max: '10',
    width:'100',
    height:'100',
    thickness: '0.1',
    fgColor: '#f00',
    bgColor:'#f00',
    background: '#ccc000',
    // skin:"tron",
    readOnly: true
  });
var button1 = 0;
$('#button-loop-6').click(function(e){
  // e.preventDefault();
  if (button1 === 0) {
    button1 ++;
    
    $('#button-loop-6').trigger(
      'configure',
      {
        fgColor:"#001",
        bgColor:"#001"
      }
    );
  } else {
    button1 --;
    $('#button-loop-6').trigger(
      'configure',
      {
        fgColor:"#f00",
        bgColor:"#FF0000"
      }
    );
  }
});
});
