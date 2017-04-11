var btnL = document.querySelector('.btn-l'),
	btnR = document.querySelector('.btn-r'),
	bannerBox = document.querySelector('.banner-box'),
	botBox = document.querySelector('.bot-box'),
	bots = botBox.querySelectorAll('li'),
	num = 0;
//
setInterval(function() {
		console.log(num)
		num++;
		if(num >= 6) {
			num = 0;
		}
		if(num < 0) {
			num = bots.length - 1;
		}
		console.log(num)
		move(bannerBox, {
			marginLeft: -num * 1200
		})
		for(var i = 0, len = bots.length; i < len; i++) {
			bots[i].className = "";
		}
		bots[num].className = "active";
	}, 2500)
	//
btnR.onclick = function() {
	num++;
	if(num === bots.length) {
		num = 0;
	}
	move(bannerBox, {
		marginLeft: -num * 1200
	})
	for(var i = 0, len = bots.length; i < len; i++) {
		bots[i].className = "";
	}
	bots[num].className = "active";
}
btnL.onclick = function() {
	console.log(num)
	num--;
	if(num < 0) {
		num = bots.length - 1;
	}
	console.log(num)
	move(bannerBox, {
		marginLeft: -num * 1200
	})
	for(var i = 0, len = bots.length; i < len; i++) {
		bots[i].className = "";
	}
	bots[num].className = "active";
}
for(var i = 0, len = bots.length; i < len; i++) {
	bots[i].index = i;
	bots[i].onmouseover = function() {
		//alert(this.index)
		num = this.index;
		move(bannerBox, {
			marginLeft: -num * 1200
		})
		for(var j = 0; j < bots.length; j++) {
			bots[j].className = "";
		}
		this.className = "active";
	}
}
//将速度去掉,速度靠计算得到
function move(obj, json, fn) {
	clearInterval(obj.timer);
	var cur = 0;
	obj.timer = setInterval(function() {
		var isTrue = true;
		for(var attr in json) {
			//如果attr是opacity
			if(attr === "opacity") {
				cur = Math.round(getStyle(obj, attr) * 100);
			} else {
				cur = parseInt(getStyle(obj, attr));
			}

			speed = (json[attr] - cur) / 8;
			//对速度取整
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if(cur !== json[attr]) {
				isTrue = false;
				if(attr === "opacity") {
					obj.style.opacity = (cur + speed) / 100
					obj.style.filter = "alpha(opacity=" + (cur + speed) + ")";
				} else {
					obj.style[attr] = cur + speed + 'px';
				}
			}
		}
		console.log(isTrue)
			//等所有属性都到达目标值  再结束动画
		if(isTrue) {
			clearInterval(obj.timer);
			fn && fn.call(obj);
		}
	}, 30)
}

function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}





//--------------------渐入渐出
var li=document.getElementsByClassName('li');//获取class为li的元素
for (var i=0;i<li.length;i++) {
	li[i].index=i;
	var liBox;
	li[i].onmousemove=function(){
		liBox=li[this.index].getElementsByClassName('li-box')[0];//li下要出来的div
		var hp=liBox.getElementsByTagName('p');//要出来div里面的p
		for (var j=0;j<hp.length;j++) {
			var hpH=hp[j].offsetHeight;//出来div里面的li的高度
		}
		var height=hp.length*hpH;//总高度      数量乘以高度
		liBox.style.height=height+'px';//把高度给了div
	}
	li[i].onmouseout=function(){
		liBox.style.height='0';
	}
}
