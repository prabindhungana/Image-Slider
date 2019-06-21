var marginLeft = 0;
flag = 0;
var stop = false;
var interval = null;
var timeOut = null;
var buttons =[];
var slider1 = document.getElementById('carousel-image-wrapper');
slider1.style.width = 800 + 'px';
slider1.style.height = 500 + 'px';
var width = slider1.clientWidth;
slider1.style.position = 'relative';

function createContainer() {
    var container = document.getElementById('carousel-container');
    container.style.width = 800 + 'px';
    container.style.height = 500 + 'px';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.marginLeft = 'auto';
    container.style.marginRight = 'auto';
    var width = container.clientWidth;
    var btnLeft = document.createElement('button');
    var btnRight = document.createElement('button');
    btnLeft.style.position = 'absolute';
    btnRight.style.position = 'absolute';
    btnLeft.innerHTML = '<';
    btnRight.innerHTML = '>';
    btnLeft.style.top = 50 + '%';
    btnLeft.style.left = 0;
    btnRight.style.top = 50 + '%';
    btnRight.style.right = 0;
    container.appendChild(btnLeft);
    container.appendChild(btnRight);
    btnLeft.onclick = moveLeft;
    btnRight.onclick = moveRight;
}


function setimagePosition() {
    var images = document.querySelectorAll('#carousel-image-wrapper img');
    images.forEach(function (value, index) {
        value.style.width = 100 + '%';
        value.style.height = 100 + '%';
        value.style.position = 'absolute';
        value.style.left = index * width;
    });
    return images;
}

function createBtn()
{
   var wrapper =document.getElementById('carousel-container');

   var imgLength = imagearr.length;
   for(var i = 0; i <imgLength; i++){
    buttons.push(document.createElement('button'));
   }
   for(var i=0; i<imgLength;i++)
   {
   buttons[i].style.position = 'absolute';
   buttons[i].style.bottom = 5 + 'px';
   buttons[i].style.left = 45 + i * 3+ '%';
   buttons[i].style.border = 0;
   buttons[i].style.borderRadius = 50+'%';
   buttons[i].innerHTML = i+1;
   wrapper.appendChild(buttons[i]);
   }
   buttons.forEach(function(value, index){
    value.onclick = function(){
        marginLeft = -(index * width);
    }
   });
}

function slide() {

    if (((Math.abs(marginLeft) % width) == 0)) {
        stop = true;
        clearInterval(interval);
        carouselTriggerer();
    }

    slider1.style.marginLeft = marginLeft + 'px';

    if (flag == 0) {
        if (marginLeft === -(imagearr.length - 1) * width) {
            flag = 1;
        }
        else {
            marginLeft--;

        }
    }
    else {
        if (marginLeft === 0) {
            flag = 0;
        }
        else {
            marginLeft++;
        }
    }


}

function carouselTriggerer() {
    if (!stop) {
        interval = setInterval(slide, 0);
    }
    else {
        timeOut = setTimeout(function () {
            interval = setInterval(slide, 0);
        }, 3000);
    }
}

function moveLeft() {
    flag = 0;
    for (var i = 1; i <= width; i++) {
        slider1.style.marginLeft = marginLeft + 'px';
        if (i === width) {
            flag = 1;
        }
        else {
            if (marginLeft == 0) {
                return;
            }
            else {
                marginLeft++;
            }

        }
    }
}

function moveRight() {
    flag = 1;
    for (var i = 1; i <= width; i++) {
        slider1.style.marginLeft = marginLeft + 'px';
        if (i === width) {
            flag = 0;
        }
        else {
            if (marginLeft === -(imagearr.length - 1) * width) {
                return;
            }
            else {
                marginLeft--;
            }
        }
    }
}

createContainer();
var imagearr = setimagePosition(width);
carouselTriggerer();
createBtn();