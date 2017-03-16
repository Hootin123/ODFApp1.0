/**
 * Created by pc on 2017/2/28.
 */
window.alert = function(msg){
    if(document.querySelectorAll('.alertBox').length){
        clearTimeout(window.alert.time);
        document.body.removeChild(document.querySelector('.alertBox'))
    }
    var obj = document.createElement('div')
    obj.setAttribute('class', 'alertBox');
    obj.innerHTML = msg;
    document.body.appendChild(obj);
    window.alert.time = setTimeout(function () {
        document.body.removeChild(document.querySelector('.alertBox'))
    }, 1500);
}
String.prototype.getParam = function(n){
    var r = new RegExp("[\?\&]"+n+"=([^&?]*)(\\s||$$)", "gi");
    var r1=new RegExp(n+"=","gi");
    var m=this.match(r);
    if(m==null){
        return "";
    }else{
        return typeof(m[0].split(r1)[1])=='undefined'?'':decodeURIComponent(m[0].split(r1)[1]);
    }
};

var productId = location.search.getParam("productId");
var productName=location.search.getParam("productName");
var token=location.search.getParam("sid");
// var coinRate=location.search.getParam("coinRate");
// var minIncome=location.search.getParam("minIncome");
// var minChange=location.search.getParam("minChange");

var start_ev = ('ontouchstart' in window ) ? 'touchstart' : 'mousedown';
var end_ev = ('ontouchend' in window ) ? 'touchend' : 'mouseup';
var move_ev = ('ontouchend' in window ) ? 'touchmove' : 'mousemove';
$.fn.Touch = function (obj) {
    var moveEvent = move_ev;
    if (typeof obj == 'function') {
        obj.fun = obj;
    }

    this.each(function () {
        var $dom = $(this).eq(0);//转为dom对象
        var ifMove = false;
        var t = 0;
        $dom.on(moveEvent, function () {
            ifMove = true;
            clearTimeout(t);
            t = setTimeout(function () {
                ifMove = false
            }, 250);
        })
        if (obj.children) {
            $dom.on(end_ev, obj.children, function (e) {
                if (ifMove && end_ev == 'touchend') {
                    ifMove = false;
                    e.stopPropagation();
                    return false;
                }
                obj.fun.call(this, this);
            })
        }
        else {
            $dom.on(end_ev, function (e) {
                if (ifMove && end_ev == 'touchend') {
                    ifMove = false;
                    e.stopPropagation();
                    return 0;
                }
                obj.fun.apply(this, [this, e]);
            })
        }
    });
};




//   切换
$('.mod-tab-min li').on('click',function () {
    $(this).addClass('active').siblings().removeClass('active')
})
$('.daily3').on('click',function(){
    myChart3.setOption(option3);
    timeTicket3();
    $('#chart').hide();
    $('#chart5').hide()
    $('#chartDay').hide();
    $('#chartAll').hide();
    $('#chart3').show()
})
$('.tick').on('click',function(){
    $('#chart3').hide();
    $('#chart5').hide();
    $('#chartDay').hide();
    $('#chartAll').hide();
    $('#chart').show()
})
$('.daily5').on('click',function(){
    myChart5.setOption(option5);
    timeTicket5();
    $('#chart').hide();
    $('#chart3').hide();
    $('#chartDay').hide();
    $('#chartAll').hide();
    $('#chart5').show()
})
$('.daily').on('click',function(){
    myChartDay.setOption(optionDay);
    $('#chart').hide();
    $('#chart3').hide();
    $('#chart5').hide();
    $('#chartAll').hide();
    $('#chartDay').show()
})
$('.today').on('click',function(){
    myChartAll.setOption(optionAll);
    // timeTicketAll();
    $('#chart').hide();
    $('#chart3').hide();
    $('#chart5').hide();
    $('#chartDay').hide();
    $('#chartAll').show()
})



    // 打开一个 web socket
    var ws = new WebSocket("ws://192.168.2.179:8383/quotations");
    var xinT={
        "type":"5",
    }
    var postData={
        "type":"1",
    }
    var postData=JSON.stringify(postData);
    var xinT=JSON.stringify(xinT)
    ws.onopen = function()
    {
        // Web Socket 已连接上，使用 send() 方法发送数据
        ws.send(postData);
    };

    ws.onmessage = function (evt)
    {
        ws.send(xinT);
        var getData = JSON.parse(evt.data);
        console.log(getData);
        if(getData.data!=undefined){
            var nowPrice=getData.data.lastPrice;
            var askPrice=getData.data.askPrice;
            var bidPrice=getData.data.bidPrice;
            var openingPrice=getData.data.openingPrice;
            var askVolume=getData.data.askVolume; //卖量
            var bidVolume =getData.data.bidVolume; //买量
            console.log(nowPrice,askPrice,bidPrice,openingPrice,askVolume)
            changeData(nowPrice,askPrice,bidPrice,openingPrice,askVolume,bidVolume); //分时



        }

    };

    ws.onclose = function()
    {
        alert("连接已关闭...");
    };





//分时
function changeData(nowPrice,askPrice,bidPrice,openingPrice,askVolume,bidVolume) {
    var noDate=[new Date().getFullYear(), addZero(new Date().getMonth()+1), addZero(new Date().getDate()),addZero(new Date().getHours()),addZero(new Date().getMinutes())].join("")
    var atCutDate1=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), '00','00','0','0');
    var atCutDate2=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), '07','00', '0', '0');
    var atCutDate3=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), '13','00', '0', '0');
    var atCutDate4=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), '19', '00', '0', '0');
    var arrTime=[new Date().getFullYear(), addZero(new Date().getMonth()+1), addZero(new Date().getDate()),addZero(new Date().getHours()),addZero(new Date().getMinutes()),addZero(new Date().getSeconds())].join("")
    var startId1=getCurDate() + "000000";
    var startId2=getCurDate() + "070000";
    var startId3=getCurDate() + "130000";
    var startId4=getCurDate() + "190000";
    if (parseInt(noDate) < parseInt(END_ID) || parseInt(noDate) >=parseInt(START_ID) )
    {
        if(arrTime==startId1){
            var dtTimeAM=atCutDate1;
            arrCurTime=[];
            line_data=[]
            for (var i=0; i<=360; i++){
                arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
                dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
            }
        } else if(arrTime==startId2){
            var dtTimeAM=atCutDate2;
            arrCurTime=[];
            line_data=[]
            for (var i=0; i<=360; i++){
                arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
                dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
            }
        } else if(arrTime==startId3){
            var dtTimeAM=atCutDate3;
            arrCurTime=[];
            line_data=[]
            for (var i=0; i<=360; i++){
                arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
                dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
            }

        }else  if(arrTime==startId4){
            var dtTimeAM=atCutDate4;
            arrCurTime=[];
            line_data=[]
            for (var i=0; i<=300; i++){
                arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
                dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
            }
        }



        time_pos = [addZero(new Date().getHours()), addZero(new Date().getMinutes())].join(":");
        var pos = getDataPos(time_pos);
        if (pos == undefined) {
            line_data.push( {name: time_pos, value: nowPrice} );

        } else{
            // 替换数组对应点
            line_data.splice(pos, 1, {name: time_pos, value: nowPrice});
        }

        myChart.setOption({
            series: [{
                data : line_data
            }],
            xAxis:{
                data: arrCurTime,
            }
        });


        $('.text-xxl').html(nowPrice);
        $('.priceUp').html(askPrice);
        $('.priceDown').html(bidPrice);
        $('.askVolume').html(askVolume);
        $('.bidVolume').html(bidVolume);




        if(nowPrice>openingPrice){
            $('.text-lows').addClass('active1')
            $('.sit1').html('+'+parseInt((nowPrice-openingPrice)*100)/100);
            $('.sit2').html('+'+parseInt((nowPrice-openingPrice)/openingPrice*10000)/100+'%');
        } else if(nowPrice<openingPrice){
            $('.text-lows').addClass('active2')
            $('.sit1').html('-'+parseInt((nowPrice-openingPrice)*100)/100);
            $('.sit2').html('-'+parseInt((nowPrice-openingPrice)/openingPrice*10000)/100+'%');
        }else{
            $('.text-lows').removeClass('active1');
            $('.text-lows').removeClass('active2')
            $('.sit1').html(parseInt((nowPrice-openingPrice)*100)/100);
            $('.sit2').html(parseInt((nowPrice-openingPrice)/openingPrice*10000)/100+'%');
        }
        $('.askVolumeWidth').css('width',askVolume/40+'rem')
        $('.bidVolumeWidth').css('width',bidVolume/40+'rem');



    }
}

//全天

function changeDataAll(nowPrice) {
    var noDate=[new Date().getFullYear(), addZero(new Date().getMonth()+1), addZero(new Date().getDate()),addZero(new Date().getHours()),addZero(new Date().getMinutes())].join("")
    if (parseInt(noDate) < parseInt(END_ID) || parseInt(noDate) >=parseInt(START_ID) )
    {

        time_pos1 = [addZero(new Date().getHours()), addZero(new Date().getMinutes())].join(":");
        console.log(time_pos1)
        var pos1 = getDataPos1(time_pos1);
        console.log(pos1)
        if (pos1 == undefined) {

            line_dataAll.push( {name: time_pos1, value: nowPrice} );

        } else{

            // 替换数组对应点
            line_dataAll.splice(pos1, 1, {name: time_pos1, value:nowPrice});
        }
        myChartAll.setOption({
            series: [{
                data : line_dataAll,
            }],
            xAxis:{
                data: arrCurTimeAll,
            }
        });

    }
}






//    画图
function addZero(val, len, top)
{
    if (!arguments[1]) len = 2;
    if (!arguments[2]) top = true;

    if (val.toString().length < len)
    {
        while (len != val.toString().length)
        {
            if (top) val = "0" + val.toString();
            else val = val.toString() + "0";
        }
    }
    return val.toString();
}
function getCurDate()
{
    return [new Date().getFullYear(), addZero(new Date().getMonth()+1), addZero(new Date().getDate())].join("");
}

var STOCK_CODE = "601099";
var START_ID = getCurDate() + "0700";
var END_ID = getCurDate() + "0600";
var short_date = getCurDate();
var short_id = "0700";
var time_pos = "07:00";

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('chart'));
var myChartAll = echarts.init(document.getElementById('chartAll'));
var myChart3 = echarts.init(document.getElementById('chart3'));
var myChart5 = echarts.init(document.getElementById('chart5'));
var myChartDay = echarts.init(document.getElementById('chartDay'));


//***************************************************************//
// 初始化 x轴
//***************************************************************//



//分时图
var arrCurTime = [];

getInit()
function getInit(){

    var dtCurDate = new Date();
    var atCutDate1=new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), '00','00', '0', '0');
    var atCutDate2=new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), '07','00', '0', '0');
    var atCutDate3=new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), '13','00', '0', '0');
    var atCutDate4=new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), '19', '00', '0', '0');
    var atCutDate5=new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), '24', '00', '0', '0');
    if(new Date().getTime()>=atCutDate1 && new Date().getTime()< atCutDate4){
        if(new Date().getTime()>=atCutDate1 && new Date().getTime()< atCutDate2){
            var dtTimeAM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), '00', '00', '0', '0')

        }else if(new Date().getTime()>=atCutDate2 && new Date().getTime()< atCutDate3){
            var dtTimeAM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), '07', '00', '0', '0')

        }else if(new Date().getTime()>=atCutDate3 && new Date().getTime()< atCutDate4){
            var dtTimeAM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), '13', '00', '0', '0')
        }
        num = parseInt((dtCurDate.getTime()-dtTimeAM.getTime())/60/1000);

        for (var i=0; i<=360; i++){
            arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
            dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
        }

    }else if(new Date().getTime()>=atCutDate4 && new Date().getTime()< atCutDate5){
        var dtTimeAM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), '19', '00', '0', '0')
        num = parseInt((dtCurDate.getTime()-dtTimeAM.getTime())/60/1000)

        for (var i=0; i<=300; i++){
            arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
            dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
        }



    }


}

//***************************************************************//
var line_data = [];
var value=1190;
for (var i=0; i<=num; i++){
    value=parseInt( (value + Math.random() * 21 - 10)*10)/10;
    line_data.push( {name: arrCurTime[i], value: value} );
}
function getDataPos(time)
{
    for (var i=0; i<line_data.length; i++)
    {
        if (time == line_data[i].name) return i;
    }
}

option1 = {
    title : {
    },
    tooltip : {
        trigger : 'axis',
        axisPointer : {
            type : 'line'
        },
        position : 'top'
    },
    grid : {
        top : '2%',
        left : '10%',
        right : '2%',
        bottom : '8%'
    },
    xAxis : {
        boundaryGap : false,
        type : 'category',
        splitLine : {
            show : true,
            interval : function (index, value) {
                if (value == "00:00"
                    || value == "02:00"
                    || value == "06:00"
                    || value == "07:00"
                    || value == "09:00"
                    ||value == "13:00"
                    || value == "15:00"
                    || value == "19:00"
                    || value == "21:00"


                ) {
                    return true;
                }
                else return false;
            }
        },
        data: arrCurTime,
        scale: true,
        axisTick : {
            show : true,
            interval : function (index, value) {
                if (value == "00:00"
                    || value == "02:00"
                    || value == "06:00"
                    || value == "07:00"
                    || value == "09:00"
                    ||value == "13:00"
                    || value == "15:00"
                    || value == "19:00"
                    || value == "21:00"

                ) {
                    return true;
                }
                else return false;
            }
        },
        axisLabel : {
            show : true,
            interval : 0,
            formatter: function (value, index) {
                if (value == "00:00"
                    || value == "02:00"
                    || value == "06:00"
                    || value == "07:00"
                    || value == "09:00"
                    ||value == "13:00"
                    || value == "15:00"
                    || value == "19:00"
                    || value == "21:00"

                ) {
                    return value;
                } else {
                    return "";
                }
            }
        },
    },
    yAxis : [ {
        scale : true,
        splitArea : {
            show : true
        },
        boundaryGap: [0, '100%'],
        // min:1193,
        // max:1200,
    }],
    series : [ {
        name : '当前价格',
        type:'line',
        smooth: true,
        showSymbol: false,
        itemStyle: {
            normal: {
                color: 'rgb(47, 132, 204)',
                lineStyle:{
                    width:1,
                }
            }
        },
        data : line_data
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option1);

// var app = {};
// app.timeTicket = setInterval(function () {
//     var noDate=[new Date().getFullYear(), addZero(new Date().getMonth()+1), addZero(new Date().getDate()),addZero(new Date().getHours()),addZero(new Date().getMinutes())].join("")
//     var atCutDate1=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), '00','00','0','0');
//     var atCutDate2=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), '07','00', '0', '0');
//     var atCutDate3=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), '13','00', '0', '0');
//     var atCutDate4=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), '19', '00', '0', '0');
//     var arrTime=[new Date().getFullYear(), addZero(new Date().getMonth()+1), addZero(new Date().getDate()),addZero(new Date().getHours()),addZero(new Date().getMinutes()),addZero(new Date().getSeconds())].join("")
//     var startId1=getCurDate() + "000000";
//     var startId2=getCurDate() + "070000";
//     var startId3=getCurDate() + "130000";
//     var startId4=getCurDate() + "190000";
//     if (parseInt(noDate) < parseInt(END_ID) || parseInt(noDate) >=parseInt(START_ID) )
//     {
//             if(arrTime==startId1){
//                 var dtTimeAM=atCutDate1;
//                 arrCurTime=[];
//                 line_data=[]
//                 for (var i=0; i<=360; i++){
//                     arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
//                     dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
//                 }
//             } else if(arrTime==startId2){
//                 var dtTimeAM=atCutDate2;
//                 arrCurTime=[];
//                 line_data=[]
//                 for (var i=0; i<=360; i++){
//                     arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
//                     dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
//                 }
//             } else if(arrTime==startId3){
//                 var dtTimeAM=atCutDate3;
//                 arrCurTime=[];
//                  line_data=[]
//                 for (var i=0; i<=360; i++){
//                     arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
//                     dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
//                 }
//
//             }else  if(arrTime==startId4){
//                 var dtTimeAM=atCutDate4;
//                 arrCurTime=[];
//                 line_data=[]
//                 for (var i=0; i<=300; i++){
//                     arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
//                     dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
//                 }
//             }
//
//
//
//                 time_pos = [addZero(new Date().getHours()), addZero(new Date().getMinutes())].join(":");
//                 var pos = getDataPos(time_pos);
//                 if (pos == undefined) {
//                     value = value + Math.random() * 21 - 10;
//                     line_data.push( {name: time_pos, value:  Math.round( value)} );
//
//                 } else{
//                     value = value + Math.random() * 20 - 10;
//                     // 替换数组对应点
//                     line_data.splice(pos, 1, {name: time_pos, value: Math.round( value)});
//                 }
//
//                 myChart.setOption({
//                     series: [{
//                         data : line_data
//                     }],
//                     xAxis:{
//                         data: arrCurTime,
//                     }
//                 });
//
//
//         $('.text-xxl').html(line_data[line_data.length-1].value)
//     }
//     // else if (parseInt(short_date+short_id) == parseInt(END_ID))
//     // {
//     // 	// getLineData();
//     // 	clearInterval(app.timeTicket);
//     // }
// }, 1000);





//3分钟图

var arrCurTime3 = [];
var line_data3 = [];
var Volumn=[];
getData3()
function getData3(){

    var dtCurDate = new Date();
    var atCutDate1=new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(),'06','00', '0', '0');
    var atCutDate2=new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), '07','00', '0', '0');
    if(new Date().getTime()>=atCutDate2 || new Date().getTime()< atCutDate1){
        for (var i=0; i<=60; i++){
            arrCurTime3.push([addZero(dtCurDate.getHours()), addZero(dtCurDate.getMinutes())].join(":"));

            dtCurDate = new Date(dtCurDate.getTime() - 60*3000);
        }
        arrCurTime3.reverse()


    }


    for (var i=0; i<=60; i++){
        value = value + Math.random() * 21 - 10;
        line_data3.push([Math.round( value)+ Math.round(Math.random() * 10),Math.round( value)+ Math.round(Math.random() * 20),Math.round( value)+ Math.round(Math.random() * 5),Math.round( value)+ Math.round(Math.random() * 20)+10,Math.round( value)]);
        Volumn.push(Math.round( value))
    }

}



option3 = {
    backgroundColor: '#fff',
    animation: false,
    legend: {
        bottom: 10,
        left: 'center',

    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line'
        },

    },
    grid: [
        {

            height: '50%',
            top : '2%',
            left : '6%',
            right : '2%',
            bottom : '8%'
        },
        {
            left: '6%',
            right: '2%',
            top: '63%',
            height: '16%'
        }
    ],
    xAxis: [
        {
            type: 'category',
            data: arrCurTime3,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            axisLabel: {
                show: true,
                interval:20,
            },
            splitNumber: 10,
            min: 'dataMin',
            max: 'dataMax'
        },
        {
            type: 'category',
            gridIndex: 1,
            data: arrCurTime3,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {
                show: true,
                interval:20,
            },
            splitNumber: 10,
            min: 'dataMin',
            max: 'dataMax'
        }
    ],
    yAxis: [
        {
            scale: true,
            splitArea: {
                show: true
            }
        },
        {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }
    ],
    series: [
        {
            name: '3分钟',
            type: 'candlestick',
            data: line_data3,
            itemStyle: {
                normal: {
                    color: '#f22f2f',
                    color0: '#13b17b',
                    borderColor: '#f22f2f',
                    borderColor0: '#13b17b'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                },
                formatter: function (param) {
                    var param = param[0];
                    return [
                        '时间: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                        '开始: ' + param.data[0] + '<br/>',
                        '结束: ' + param.data[1] + '<br/>',
                        '最低: ' + param.data[2] + '<br/>',
                        '最高: ' + param.data[3] + '<br/>'
                    ].join('');
                }

            },
        },

        {
            name: '交易量',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: Volumn,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList;
                        if (line_data3[params.dataIndex][1]>line_data3[params.dataIndex][0]) {
                            colorList = '#f22f2f';
                        } else {
                            colorList = '#13b17b';
                        }
                        return colorList;
                    },
                }
            }
        }
    ]
}

function timeTicket3(){
    setInterval(function(){
        var noDate=[new Date().getFullYear(), addZero(new Date().getMonth()+1), addZero(new Date().getDate()),addZero(new Date().getHours()),addZero(new Date().getMinutes())].join("")

        if (parseInt(noDate) < parseInt(END_ID) || parseInt(noDate) >parseInt(START_ID) )
        {

            value = value + Math.random() * 21 - 10;
            line_data3.push([Math.round( value)+ Math.round(Math.random() * 10),Math.round( value)+ Math.round(Math.random() * 20),Math.round( value)+ Math.round(Math.random() * 5),Math.round( value)+ Math.round(Math.random() * 20)+10,Math.round( value)]);
            line_data3.shift();
            arrCurTime3.push([addZero(new Date().getHours()), addZero(new Date().getMinutes())].join(":"));
            arrCurTime3.shift();

            myChart3.setOption({
                series: [{
                    data : line_data3
                }],
                xAxis:{
                    data: arrCurTime3,
                }
            });
        }
    },180000)
}



//5分钟图

var arrCurTime5 = [];
var line_data5 = [];
var Volumn5=[];
getData5()
function getData5(){

    var dtCurDate = new Date();
    var atCutDate1=new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(),'06','00', '0', '0');
    var atCutDate2=new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), '07','00', '0', '0');
    if(new Date().getTime()>=atCutDate2 || new Date().getTime()< atCutDate1){
        for (var i=0; i<=60; i++){
            arrCurTime5.push([addZero(dtCurDate.getHours()), addZero(dtCurDate.getMinutes())].join(":"));

            dtCurDate = new Date(dtCurDate.getTime() - 60*5000);
        }
        arrCurTime5.reverse()


    }


    for (var i=0; i<=60; i++){
        value = value + Math.random() * 21 - 10;
        line_data5.push([Math.round( value)+ Math.round(Math.random() * 10),Math.round( value)+ Math.round(Math.random() * 20),Math.round( value)+ Math.round(Math.random() * 5),Math.round( value)+ Math.round(Math.random() * 20)+10,Math.round( value)]);
        Volumn5.push(Math.round( value))
    }

}



option5 = {
    backgroundColor: '#fff',
    animation: false,
    legend: {
        bottom: 10,
        left: 'center',

    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line'
        },

    },
    grid: [
        {

            height: '50%',
            top : '2%',
            left : '6%',
            right : '2%',
            bottom : '8%'
        },
        {
            left: '6%',
            right: '2%',
            top: '63%',
            height: '16%'
        }
    ],
    xAxis: [
        {
            type: 'category',
            data: arrCurTime5,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            axisLabel: {
                show: true,
                interval:20,
            },
            splitNumber: 10,
            min: 'dataMin',
            max: 'dataMax'
        },
        {
            type: 'category',
            gridIndex: 1,
            data: arrCurTime5,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {
                show: true,
                interval:20,
            },
            splitNumber: 10,
            min: 'dataMin',
            max: 'dataMax'
        }
    ],
    yAxis: [
        {
            scale: true,
            splitArea: {
                show: true
            }
        },
        {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }
    ],
    series: [
        {
            name: '5分钟',
            type: 'candlestick',
            data: line_data5,
            itemStyle: {
                normal: {
                    color: '#f22f2f',
                    color0: '#13b17b',
                    borderColor: '#f22f2f',
                    borderColor0: '#13b17b'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                },
                formatter: function (param) {
                    var param = param[0];
                    return [
                        '时间: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                        '开始: ' + param.data[0] + '<br/>',
                        '结束: ' + param.data[1] + '<br/>',
                        '最低: ' + param.data[2] + '<br/>',
                        '最高: ' + param.data[3] + '<br/>'
                    ].join('');
                }

            },
        },

        {
            name: '交易量',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: Volumn5,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList;
                        if (line_data3[params.dataIndex][1]>line_data3[params.dataIndex][0]) {
                            colorList = '#f22f2f';
                        } else {
                            colorList = '#13b17b';
                        }
                        return colorList;
                    },
                }
            }
        }
    ]
}
function timeTicket5(){
    setInterval(function(){
        var noDate=[new Date().getFullYear(), addZero(new Date().getMonth()+1), addZero(new Date().getDate()),addZero(new Date().getHours()),addZero(new Date().getMinutes())].join("")

        if (parseInt(noDate) < parseInt(END_ID) || parseInt(noDate) >=parseInt(START_ID) )
        {

            value = value + Math.random() * 21 - 10;
            line_data5.push([Math.round( value)+ Math.round(Math.random() * 10),Math.round( value)+ Math.round(Math.random() * 20),Math.round( value)+ Math.round(Math.random() * 5),Math.round( value)+ Math.round(Math.random() * 20)+10,Math.round( value)]);
            line_data5.shift();
            arrCurTime5.push([addZero(new Date().getHours()), addZero(new Date().getMinutes())].join(":"));
            arrCurTime5.shift();

            myChart5.setOption({
                series: [{
                    data : line_data5
                }],
                xAxis:{
                    data: arrCurTime5,
                }
            });
        }
    },300000)
}



//日K

var arrCurTimeDay = [];
var line_dataDay = [];
var VolumnDay=[];
getDataDay()
function getDataDay(){

    var dtCurDate = new Date();
    var atCutDate1=new Date(dtCurDate.getFullYear(), dtCurDate.getMonth()+1, dtCurDate.getDate(),'06','00', '0', '0');
    var atCutDate2=new Date(dtCurDate.getFullYear(), dtCurDate.getMonth()+1, dtCurDate.getDate(), '07','00', '0', '0');
    if(new Date().getTime()>=atCutDate2 || new Date().getTime()< atCutDate1){
        for (var i=0; i<=60; i++){
            arrCurTimeDay.push([addZero(dtCurDate.getMonth()+1), addZero(dtCurDate.getDate())].join("-"));

            dtCurDate = new Date(dtCurDate.getTime() - 24*60*60*1000);
        }
        arrCurTimeDay.reverse()


    }


    for (var i=0; i<=60; i++){
        value = value + Math.random() * 21 - 10;
        line_dataDay.push([Math.round( value)+ Math.round(Math.random() * 10),Math.round( value)+ Math.round(Math.random() * 20),Math.round( value)+ Math.round(Math.random() * 5),Math.round( value)+ Math.round(Math.random() * 20)+10,Math.round( value)]);
        VolumnDay.push(Math.round( value))
    }

}



optionDay = {
    backgroundColor: '#fff',
    animation: false,
    legend: {
        bottom: 10,
        left: 'center',

    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line'
        },

    },
    grid: [
        {

            height: '50%',
            top : '2%',
            left : '6%',
            right : '2%',
            bottom : '8%'
        },
        {
            left: '6%',
            right: '2%',
            top: '63%',
            height: '16%'
        }
    ],
    xAxis: [
        {
            type: 'category',
            data: arrCurTimeDay,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            axisLabel: {
                show: true,
                interval:10,
            },
            splitNumber: 10,
            min: 'dataMin',
            max: 'dataMax'
        },
        {
            type: 'category',
            gridIndex: 1,
            data: arrCurTimeDay,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {
                show: true,
                interval:10,
            },
            splitNumber: 10,
            min: 'dataMin',
            max: 'dataMax'
        }
    ],
    yAxis: [
        {
            scale: true,
            splitArea: {
                show: true
            }
        },
        {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }
    ],
    series: [
        {
            name: '日K',
            type: 'candlestick',
            data: line_dataDay,
            itemStyle: {
                normal: {
                    color: '#f22f2f',
                    color0: '#13b17b',
                    borderColor: '#f22f2f',
                    borderColor0: '#13b17b'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                },
                formatter: function (param) {
                    var param = param[0];
                    return [
                        '时间: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                        '开始: ' + param.data[0] + '<br/>',
                        '结束: ' + param.data[1] + '<br/>',
                        '最低: ' + param.data[2] + '<br/>',
                        '最高: ' + param.data[3] + '<br/>'
                    ].join('');
                }

            },
        },

        {
            name: '交易量',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: VolumnDay,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList;
                        if (line_data3[params.dataIndex][1]>line_data3[params.dataIndex][0]) {
                            colorList = '#f22f2f';
                        } else {
                            colorList = '#13b17b';
                        }
                        return colorList;
                    },
                }
            }
        }
    ]
}



//全天
var arrCurTimeAll = [];

getDataAll()
function getDataAll(){
    var dtCurDate = new Date();
    var dtTimeAM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), '07', '00', '0', '0');
       numAll = parseInt((dtCurDate.getTime()-dtTimeAM.getTime())/60/1000);
    for (var i=0; i<=1380; i++){
        arrCurTimeAll.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
        dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
    }


}

//***************************************************************//
var line_dataAll = [];
var value=1190;
for (var i=0; i<=numAll; i++){
    value =parseInt( (value + Math.random() * 21 - 10)*10)/10;
    line_dataAll.push( {name: arrCurTimeAll[i], value:  value} );
}
function getDataPos1(time)
{
    for (var i=0; i<line_dataAll.length; i++)
    {
        if (time == line_dataAll[i].name) return i;
    }
}
optionAll = {
    backgroundColor:'#fff',
    title : {
    },
    tooltip : {
        trigger : 'axis',
        axisPointer : {
            type : 'line'
        },
        position : 'top'
    },
    grid : {
        top : '2%',
        left : '10%',
        right : '2%',
        bottom : '8%'
    },
    xAxis : {
        boundaryGap : false,
        type : 'category',
        splitLine : {
            show : true,
            interval : function (index, value) {
                if (value == "00:00"
                    || value == "06:00"
                    || value == "07:00"
                    ||value == "13:00"
                    || value == "19:00"


                ) {
                    return true;
                }
                else return false;
            }
        },
        data: arrCurTimeAll,
        scale: true,
        axisTick : {
            show : true,
            interval : function (index, value) {
                if (value == "00:00"
                    || value == "06:00"
                    || value == "07:00"
                    ||value == "13:00"
                    || value == "19:00"

                ) {
                    return true;
                }
                else return false;
            }
        },
        axisLabel : {
            show : true,
            interval : 0,
            formatter: function (value, index) {
                if (value == "00:00"
                    || value == "06:00"
                    || value == "07:00"
                    ||value == "13:00"
                    || value == "19:00"

                ) {
                    return value;
                } else {
                    return "";
                }
            }
        },
    },
    yAxis : [ {
        scale : true,
        splitArea : {
            show : true
        },
        boundaryGap: [0, '100%'],
    }],
    series : [ {
        name : '当前价格',
        type:'line',
        smooth: true,
        showSymbol: false,
        itemStyle: {
            normal: {
                color: 'rgb(47, 132, 204)',
                lineStyle:{
                    width:1,
                }
            }
        },
        data : line_dataAll
    }]
};

function timeTicketAll(){
    setInterval(function () {
        var noDate=[new Date().getFullYear(), addZero(new Date().getMonth()+1), addZero(new Date().getDate()),addZero(new Date().getHours()),addZero(new Date().getMinutes())].join("")
        if (parseInt(noDate) < parseInt(END_ID) || parseInt(noDate) >=parseInt(START_ID) )
        {

            time_pos1 = [addZero(new Date().getHours()), addZero(new Date().getMinutes())].join(":");
            console.log(time_pos1)
            var pos1 = getDataPos1(time_pos1);
            console.log(pos1)
            if (pos1 == undefined) {
                value = value + Math.random() * 21 - 10;
                line_dataAll.push( {name: time_pos1, value:  Math.round( value)} );

            } else{
                value = value + Math.random() * 20 - 10;
                // 替换数组对应点
                line_dataAll.splice(pos1, 1, {name: time_pos1, value: Math.round( value)});
            }
            myChartAll.setOption({
                series: [{
                    data : line_dataAll,
                }],
                xAxis:{
                    data: arrCurTimeAll,
                }
            });

        }
        // else if (parseInt(short_date+short_id) == parseInt(END_ID))
        // {
        // 	// getLineData();
        // 	clearInterval(app.timeTicket);
        // }
    }, 1000);
}





echarts.connect(myChart);
window.onresize = function(){

    myChart.resize();



};

var fada={
    productId:productId,
}
$.ajax({
    url: 'http://192.168.2.133:9090/odt-web/trade/product/getConfig.do?sid='+token,
    method: 'POST',
    data: fada,
    crossDomain:true,
    success: function(data) {
        if(data.code=='000000'){

            $('.title-count-list').html();
            $('.title-stopLoss-list').html();
            var data2=data.data;
            var profitPoints1=data2.riskManages[0].profitPoints;
            coinRate=data2.coinRate;
            minChange=data2.minChange;
            minIncome=data2.minIncome;
            profitPoints= profitPoints1[profitPoints1.length-1]
            var lostPoint=[];
            var purchaseAmount=data2.purchaseAmount.split(';');
            var riskManages=data2.riskManages;

            for (var i = 0; i < riskManages.length; i++) {
                lostPoint.push(riskManages[i].lostPoint)
            }
            $('#l-stopLoss').html(lostPoint[0]);
            $('#l-count').html(purchaseAmount[0]);
            for (var i = 0; i < purchaseAmount.length; i++) {
                $('.title-count-list').append("<li><span>"+purchaseAmount[i]+"</span>手</li>")
            }
            for (var i = 0; i < purchaseAmount.length; i++) {
                $('.title-stopLoss-list').append('<li>$<span>'+lostPoint[i]+'</span></li>')

            };
            $('.title-stopLoss-list li ').on('click',function(){
                $('#l-stopLoss').html($(this).find('span').html());
                $('.title-stopLoss-list').hide()
            })

            $('.title-count-list li ').on('click',function(){
                $('#l-count').html($(this).find('span').html());
                $('.title-count-list').hide()
            });


        }
    }
})

var fams={
    productId:productId,
}
$.ajax({
    url: 'http://192.168.2.133:9090/odt-web/vr/trade/getProPositions.do?sid='+token,
    method: 'POST',
    data: fams,
    crossDomain:true,
    success: function(data) {
        if(data.code=='000000'){
            var num =data.data.length;

            if(num!=0){
                $('.orderNum').css('display','block').html(num)
            } else{
                $('.orderNum').css('display','none')
            }
        }
    }
})






var fa3={
    "Sign":"goLogin" ,
}

//    闪电下单
$('.check').on('click',function(){
    var data=$(this).attr('data')

    if(token=='00000' || token=='' || token==undefined){
        WebViewBridge.send(JSON.stringify(fa3))

    }else{
        if(data=='1'){
            $('.title-order').addClass('title-order-open')
            $('.check img').attr('src','../img/sd_xd001.png');
            $(this).attr('data','2').addClass('checkActive');
            $('.setType').html('(已开启)');
            $('.buyUp').html('(闪电买涨)');
            $('.buyDown').html('(闪电买跌)');

        }
        if(data=='2'){
            $('.title-order').removeClass('title-order-open')
            $('.check img').attr('src','../img/sd_xd01.png');
            $(this).attr('data','1').removeClass('checkActive');
            $('.setType').html('(已关闭)');
            $('.buyUp').html('(买涨)');
            $('.buyDown').html('(买跌)');
        }
    }



})


//买涨
var fa1={
    "Sign":"Entrust" ,
    "Data":{
        "type":'1',
        'price':$('.priceUp').html(),
        'productId':productId
    }
}

$('.buy-high').on('click',function(){

    if(token=='00000' || token=='' || token==undefined){
        WebViewBridge.send(JSON.stringify(fa3))

    }else  if($('.buyUp').html()=='(闪电买涨)'){

        var fam={
            productId:productId,
            purchasePrice:$('.priceUp').html(),
            onlyProfit:profitPoints,
            stop: $('#l-stopLoss').html(),
            direction:'1',
            counts: $('#l-count').html(),
        }


        var faUp={
            "Sign":"HoldPosition" ,
            "Data":{
                'productId':productId,
                'coinRate':coinRate,
                'minChange':minChange,
                'minIncome':minIncome,
                'stop': $('#l-stopLoss').html(),
                'onlyProfit':profitPoints,
            }
        }
        $.ajax({
            url: 'http://192.168.2.133:9090/odt-web/vr/trade/purchase.do?sid='+token,
            method: 'POST',
            data: fam,
            crossDomain:true,
            success: function(data) {
                if (data.code == '000000') {

                    WebViewBridge.send(JSON.stringify(faUp))
                }else {
                    alert(data.msg)
                }
            }
        })


    }else{
        WebViewBridge.send(JSON.stringify(fa1))
    }


})

//买跌
var fa2={
    "Sign":"Entrust" ,
    "Data":{
        "type":'-1',
        'price':$('.priceDown').html(),
        'productId':productId
    }
}


$('.buy-low').on('click',function(){

    if(token=='00000' || token=='' || token==undefined){
        WebViewBridge.send(JSON.stringify(fa3))
    }else  if(  $('.buyDown').html()=='(闪电买跌)'){
        var fam={
            productId:productId,
            purchasePrice:$('.priceDown').html(),
            onlyProfit:profitPoints,
            stop: $('#l-stopLoss').html(),
            direction:'-1',
            counts: $('#l-count').html(),
        }

        var faDown={
            "Sign":"HoldPosition" ,
            "Data":{
                'productId':productId,
                'coinRate':coinRate,
                'minChange':minChange,
                'minIncome':minIncome,
                'stop': $('#l-stopLoss').html(),
                'onlyProfit':profitPoints,
            }
        }
        $.ajax({
            url: 'http://192.168.2.133:9090/odt-web/vr/trade/purchase.do?sid='+token,
            method: 'POST',
            data: fam,
            crossDomain:true,
            success: function(data) {
                if (data.code == '000000') {

                    WebViewBridge.send(JSON.stringify(faDown))
                }else {
                    alert(data.msg)
                }
            }
        })
    }else{
        WebViewBridge.send(JSON.stringify(fa2))
    }

})



//订单
    $('.order').on('click',function(){

        if(token=='00000' || token=='' || token==undefined){
            WebViewBridge.send(JSON.stringify(fa3))
        }else{
            var  fa4={
                "Sign":"HoldPosition" ,
                "Data":{
                    'productId':productId,
                    'coinRate':coinRate,
                    'minIncome':minIncome,
                    'minChange':minChange,
                }
            }
            WebViewBridge.send(JSON.stringify(fa4))
        }
    })




//触发止损
$('.title-stopLoss span').on('click',function(){
    $('.title-stopLoss-list').toggle()
})
$('.title-count span').on('click',function(){
    $('.title-count-list').toggle()
})
