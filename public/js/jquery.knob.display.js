
// function revertButtonColor () {
//   for (var i = 1; i < 7; i++) {
//     $("#button-loop-" + i).trigger(
//       'configure',
//       {
//         fgColor:"#f00",
//         skin:"tron",
//         bgColor:"#b0d5f4" //border of circle
//       }
//     );
//
//   }
// }

//button-loop-1
$(function () {
  $('#button-loop-1').knob({
    'min':10,
    'max':10,
    'readOnly': true,
    'width': 110,
    'height': 110,
    'fgColor': 'black', //font color
    'bgColor': '#b0d5f4', // color of border
    'thickness': 0.2,
    // 'tickColorizeValues': true,
    'skin':'tron',
    'draw': function() {
      $(this.i).css('outline', 'none').css('font-size', '16pt');
    }
  });


  // $('#button-loop-1').val(10927).trigger('change');
  var button1 = 0;
  $('#button-loop-1').click(function(e){
    // e.preventDefault();

    if (button1 === 0) {
      button1 ++;
      // console.log(button1);
      // console.log("button1 is pressed");
      $('#button-loop-1').trigger(
        'configure',
        {
          fgColor:"#001",
          skin:"tron",
          bgColor:"#45a4f6" //border of circle
        }
      );
    } else {
      button1 --;
      // console.log(button1);
      // console.log("button1 is off");
      $('#button-loop-1').trigger(
        'configure',
        {
          fgColor:"#f00",
          skin:"tron",
          bgColor:"#b0d5f4" //border of circle
        }
      );
    }
  });
});


//button-loop-2
$(function () {
  $('#button-loop-2').knob({
    'min':10,
    'max':10,
    'readOnly': true,
    'width': 110,
    'height': 110,
    'fgColor': 'black', //font color
    'bgColor': '#b0d5f4', // color of border
    'thickness': 0.2,
    // 'tickColorizeValues': true,
    'skin':'tron',
    'draw': function() {
      $(this.i).css('outline', 'none').css('font-size', '16pt');
    }
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
          skin:"tron",
          bgColor:"#45a4f6" //border of circle
        }
      );
    } else {
      button1 --;
      $('#button-loop-2').trigger(
        'configure',
        {
          fgColor:"#f00",
          skin:"tron",
          bgColor:"#b0d5f4" //border of circle
        }
      );
    }
  });
});

//button-loop-3
$(function () {
  $('#button-loop-3').knob({
    'min':10,
    'max':10,
    'readOnly': true,
    'width': 110,
    'height': 110,
    'fgColor': 'black', //font color
    'bgColor': '#b0d5f4', // color of border
    'thickness': 0.2,
    // 'tickColorizeValues': true,
    'skin':'tron',
    'draw': function() {
      $(this.i).css('outline', 'none').css('font-size', '16pt');
    }
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
          skin:"tron",
          bgColor:"#45a4f6" //border of circle
        }
      );
    } else {
      button1 --;
      $('#button-loop-3').trigger(
        'configure',
        {
          fgColor:"#f00",
          skin:"tron",
          bgColor:"#b0d5f4" //border of circle
        }
      );
    }
  });
});


//button-loop-4
$(function () {
  $('#button-loop-4').knob({
    'min':10,
    'max':10,
    'readOnly': true,
    'width': 110,
    'height': 110,
    'fgColor': 'black', //font color
    'bgColor': '#b0d5f4', // color of border
    'thickness': 0.2,
    // 'tickColorizeValues': true,
    'skin':'tron',
    'draw': function() {
      $(this.i).css('outline', 'none').css('font-size', '16pt');
    }
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
          skin:"tron",
          bgColor:"#45a4f6" //border of circle
        }
      );
    } else {
      button1 --;
      $('#button-loop-4').trigger(
        'configure',
        {
          fgColor:"#f00",
          skin:"tron",
          bgColor:"#b0d5f4" //border of circle
        }
      );
    }
  });
});

//button-loop-5
$(function () {
  $('#button-loop-5').knob({
    'min':10,
    'max':10,
    'readOnly': true,
    'width': 110,
    'height': 110,
    'fgColor': 'black', //font color
    'bgColor': '#b0d5f4', // color of border
    'thickness': 0.2,
    // 'tickColorizeValues': true,
    'skin':'tron',
    'draw': function() {
      $(this.i).css('outline', 'none').css('font-size', '16pt');
    }
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
          skin:"tron",
          bgColor:"#45a4f6" //border of circle
        }
      );
    } else {
      button1 --;
      $('#button-loop-5').trigger(
        'configure',
        {
          fgColor:"#f00",
          skin:"tron",
          bgColor:"#b0d5f4" //border of circle
        }
      );
    }
  });
});

//button-loop-6
$(function () {
  $('#button-loop-6').knob({
    'min':10,
    'max':10,
    'readOnly': true,
    'width': 110,
    'height': 110,
    'fgColor': 'black', //font color
    'bgColor': '#b0d5f4', // color of border
    'thickness': 0.2,
    // 'tickColorizeValues': true,
    'skin':'tron',
    'draw': function() {
      $(this.i).css('outline', 'none').css('font-size', '16pt');
    }
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
          skin:"tron",
          bgColor:"#45a4f6" //border of circle
        }
      );
    } else {
      button1 --;
      $('#button-loop-6').trigger(
        'configure',
        {
          fgColor:"#f00",
          skin:"tron",
          bgColor:"#b0d5f4" //border of circle
        }
      );
    }
  });
});
