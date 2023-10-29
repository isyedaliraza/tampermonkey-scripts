// ==UserScript==
// @name         Appointment (Individual)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Book appointment easily
// @author       Syed Ali Raza
// @match        *://pak.blsspainvisa.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
	"use strict";

	function playSound() {
		var audio = new Audio(
			"https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-the-sound-pack-tree/tspt_german_ambulance_sirens_wailing_loop_041.mp3"
		);
		audio.play();
	}

	function getAvailableDate(code) {
		let availableDatesIndex = code.indexOf("available_dates");
		let fullCapDatesIndex = code.indexOf("fullCapicity_dates");
		let availableDatesArray = code.substring(
			availableDatesIndex,
			fullCapDatesIndex
		);
		let availableDates = JSON.parse(
			availableDatesArray.substring(
				availableDatesArray.indexOf("["),
				availableDatesArray.indexOf("]") + 1
			)
		);

		if (availableDates.length > 0) {
			let availableDate = availableDates[0];
			let dd = availableDate.slice(0, 2);
			let mm = availableDate.slice(3, 5);
			let yyyy = availableDate.slice(6, 10);
			return [yyyy, mm, dd].join("-");
		}

		return undefined;
	}

	function fillFormData(availableDate) {
		//########################################################################
		//############### THIS IS THE PART YOU MUST CHANGE #######################
		//########################################################################

		let firstName = "";
		let lastName = "";
		let dateOfBirth = ""; // yyyy-mm-dd
		let pptNumber = "";
		let pptIssueDate = ""; // yyyy-mm-dd
		let pptExpiryDate = ""; // yyyy-mm-dd
		let pptIssuePlace = "";
		let visaTypeIndex = ""; // Index of visa type from dropdown
		let passportTypeIndex = ""; // Index of passport type from dropdown
		let sms = true;
		let formFilling = false;
		let photocopy = false;
		let photograph = false;
		let premiumLounge = false;
		let primeTime = false;

		//########################################################################
		//########################################################################

		playSound();
		$("#app_date").datepicker("update", availableDate);
		document.getElementById("app_time").selectedIndex =
			document.getElementById("app_time").length - 1;
		document.getElementById("first_name").value = firstName;
		document.getElementById("last_name").value = lastName;
		$("#dateOfBirth").datepicker("update", dateOfBirth);
		document.getElementById("passport_no").value = pptNumber;
		$("#pptIssueDate").datepicker("update", pptIssueDate);
		$("#pptExpiryDate").datepicker("update", pptExpiryDate);
		document.getElementById("pptIssuePalace").value = pptIssuePlace;
		document.getElementById("VisaTypeId").selectedIndex = visaTypeIndex;
		document.getElementById("passportType").selectedIndex = passportTypeIndex;

		if (sms) {
			$("#vasId12").prop("checked", true);
		}

		if (formFilling) {
			$("#vasId6").prop("checked", true);
		}

		if (photocopy) {
			$("#vasId3").prop("checked", true);
		}
		
		if (photograph) {
			$("#vasId5").prop("checked", true);
		}
		
		if (premiumLounge) {
			$("#vasId1").prop("checked", true);
		}
		
		if (primeTime) {
			$("#vasId2").prop("checked", true);
		}
	}

	for (var i = 0; i <= document.scripts.length; i++) {
		if (
			document.scripts[i] &&
			document.scripts[i].text.indexOf("available_dates") != -1
		) {
			//let code = document.scripts[i].text;
			let code = `\n\tvar today = new Date();\n\tvar dd = today.getDate()+1;\n\tvar mm = today.getMonth()+1; //January is 0!\n\tvar yyyy = today.getFullYear();\n\tif(dd<10){\n\t\tdd='0'+dd\n\t} \n\tif(mm<10){\n\t\tmm='0'+mm\n\t} \n\tvar today = yyyy+'-'+mm+'-'+dd;\n\tfunction formatDate(rawDate) {\n\t  var day = ("0" + rawDate.getDate()).slice(-2);\n\t  var month = ("0" + (rawDate.getMonth() + 1)).slice(-2);\n\t  return (day)+ "-" + (month)+ "-" +rawDate.getFullYear() ;\n\t}\t\t\n\t$(document).ready(function() {\n\t\tvar dt1  = '2023-10-29';\n\t\tvar checkService  = 'Normal';\n\t\t$('#dateOfBirth').datepicker({\n\t\t\tformat: "yyyy-mm-dd",\n            endDate: new Date(dt1),\n\t\t\tstartDate: '-100y',\n            autoclose: true,\n\t\t\tstartView: 2\n\t\t});\n\t\t$('#pptIssueDate').datepicker({\n\t\t\tformat: "yyyy-mm-dd",\n            endDate: new Date(dt1),\n\t\t\tstartDate: '-100y',\n            autoclose: true,\n\t\t\tstartView: 2\n\t\t});\n\t\t$('#pptExpiryDate').datepicker({\n\t\t\tformat: "yyyy-mm-dd",\n\t\t\tstartDate: new Date(dt1),\n            autoclose: true,\n\t\t\tstartView: 2\n\t\t});\n\t\tvar dt4  = '2023-10-30';\n\t\tvar blocked_dates = ["26-12-2016","02-01-2017","23-03-2017","13-04-2017","14-04-2017","01-05-2017","26-06-2017","27-06-2017","28-06-2017","14-08-2017","01-09-2017","02-09-2017","03-09-2017","04-09-2017","12-10-2017","29-09-2017","01-12-2017","25-12-2017","06-12-2017","01-01-2018","05-02-2018","23-03-2018","30-03-2018","01-05-2018","15-06-2018","16-06-2018","17-06-2018","18-06-2018","25-07-2018","14-08-2018","21-08-2018","22-08-2018","23-08-2018","20-09-2018","21-09-2018","12-10-2018","21-11-2018","06-12-2018","25-12-2018","31-12-2018","01-01-2019","05-02-2019","18-04-2019","19-04-2019","01-05-2019","05-06-2019","06-06-2019","07-06-2019","12-08-2019","13-08-2019","09-09-2019","10-09-2019","06-12-2019","25-12-2019","31-12-2019","30-12-2019","25-01-2021","26-01-2021","27-01-2021","28-01-2021","29-01-2021","30-01-2021","31-01-2021","05-02-2021","23-03-2021","25-03-2021","02-04-2021","13-05-2021","14-05-2021","10-05-2021","11-05-2021","12-05-2021","20-07-2021","21-07-2021","22-07-2021","18-08-2021","19-08-2021","19-10-2021","12-10-2021","06-12-2021","23-03-2022","23-03-2022","14-04-2022","15-04-2022","02-05-2022","03-05-2022","04-05-2022","05-05-2022","11-07-2022","12-07-2022","08-08-2022","09-08-2022","12-10-2022","12-10-2022","06-12-2022","26-12-2022","02-01-2023","23-03-2023","06-04-2023","07-04-2023","24-04-2023","01-05-2023","30-06-2023","28-07-2023","14-08-2023","15-08-2023","28-09-2023","12-10-2023","26-12-2016","02-01-2017","23-03-2017","13-04-2017","14-04-2017","01-05-2017","26-06-2017","27-06-2017","28-06-2017","14-08-2017","01-09-2017","02-09-2017","03-09-2017","04-09-2017","12-10-2017","29-09-2017","01-12-2017","25-12-2017","06-12-2017","01-01-2018","05-02-2018","23-03-2018","30-03-2018","01-05-2018","15-06-2018","16-06-2018","17-06-2018","18-06-2018","25-07-2018","14-08-2018","21-08-2018","22-08-2018","23-08-2018","20-09-2018","21-09-2018","12-10-2018","21-11-2018","06-12-2018","25-12-2018","31-12-2018","01-01-2019","05-02-2019","18-04-2019","19-04-2019","01-05-2019","05-06-2019","06-06-2019","07-06-2019","12-08-2019","13-08-2019","09-09-2019","10-09-2019","06-12-2019","25-12-2019","31-12-2019","30-12-2019","25-01-2021","26-01-2021","27-01-2021","28-01-2021","29-01-2021","30-01-2021","31-01-2021","05-02-2021","23-03-2021","25-03-2021","02-04-2021","13-05-2021","14-05-2021","10-05-2021","11-05-2021","12-05-2021","20-07-2021","21-07-2021","22-07-2021","18-08-2021","19-08-2021","19-10-2021","12-10-2021","06-12-2021","23-03-2022","23-03-2022","14-04-2022","15-04-2022","02-05-2022","03-05-2022","04-05-2022","05-05-2022","11-07-2022","12-07-2022","08-08-2022","09-08-2022","12-10-2022","12-10-2022","06-12-2022","26-12-2022","02-01-2023","23-03-2023","06-04-2023","07-04-2023","24-04-2023","01-05-2023","30-06-2023","28-07-2023","14-08-2023","15-08-2023","28-09-2023","12-10-2023"];\n\t\tvar available_dates = ["01-11-2023","02-11-2023","03-11-2023"];\n\t\tvar fullCapicity_dates = ["30-10-2023","31-10-2023","06-11-2023","07-11-2023","08-11-2023","09-11-2023","10-11-2023","13-11-2023","14-11-2023","15-11-2023","16-11-2023","17-11-2023","20-11-2023","21-11-2023","22-11-2023","23-11-2023","24-11-2023","27-11-2023","28-11-2023"];\n\t\tvar offDates_dates = ["04-11-2023","05-11-2023","11-11-2023","12-11-2023","18-11-2023","19-11-2023","25-11-2023","26-11-2023"];\n\t\tvar allowArray = [1,4];\n\t\tif(checkService == 'Normal')\n\t\t{\n\t\t\t/*if((jQuery.inArray(2, allowArray)!='-1') || (jQuery.inArray(3, allowArray)!='-1') || (jQuery.inArray(4, allowArray)!='-1')) \n\t\t\t{\n\t\t\t\tvar classFull = 'fullcapspecial';\n\t\t\t\tvar tooltipTitle = '&nbsp;';\n\t\t\t\tvar backDatetitle = 'Not Allowed';\n\t\t\t}else{\n\t\t\t\tvar classFull = 'fullcap';\n\t\t\t\tvar tooltipTitle = 'Slots Full';\n\t\t\t\tvar backDatetitle = 'Not Allowed';\n\t\t\t}*/\n\t\t\tvar classFull = 'fullcap';\n\t\t\tvar tooltipTitle = 'Slots Full';\n\t\t\tvar backDatetitle = 'Not Allowed';\n\t\t}else{\n\t\t\tvar classFull = 'fullcap';\n\t\t\tvar tooltipTitle = 'Slots Full';\n\t\t\tvar backDatetitle = 'Not Allowed';\n\t\t}\n\t\t$('.app_date').datepicker({\n\t\t\tlanguage: "en",\n\t\t\tDefault: true,\n\t\t\tformat: "yyyy-mm-dd",\n\t\t\tstartDate: new Date(dt4),\n\t\t\tendDate: '2023-11-28',\n\t\t\tautoclose: true,\n\t\t\tforceParse:true,\n\t\t\tstartView: 0,\n\t\t\tbeforeShowDay: function(date){\n\t\t\t\t   var formattedDate = formatDate(date);\n\t\t\t\t   if ($.inArray(formattedDate.toString(), blocked_dates) != -1){\n\t\t\t\t\t   return {\n\t\t\t\t\t\t  enabled : false,\n\t\t\t\t\t\t  classes: 'inactiveClass',\n\t\t\t\t\t\t  tooltip: 'Holiday'\n\t\t\t\t\t   };\n\t\t\t\t   }\n\t\t\t\t   if ($.inArray(formattedDate.toString(), available_dates) != -1){\n\t\t\t\t\t   return {\n\t\t\t\t\t\t  enabled : true,\n\t\t\t\t\t\t  classes: 'activeClass',\n\t\t\t\t\t\t  tooltip: 'Book'\n\t\t\t\t\t   };\n\t\t\t\t   }\n\n\t\t\t\t   if ($.inArray(formattedDate.toString(), fullCapicity_dates) != -1){\n\t\t\t\t\t   return {\n\t\t\t\t\t\t  enabled : false,\n\t\t\t\t\t\t  classes: classFull,\n\t\t\t\t\t\t  tooltip: tooltipTitle\n\t\t\t\t\t   };\n\t\t\t\t   }\n\t\t\t\t   if ($.inArray(formattedDate.toString(), offDates_dates) != -1){\n\t\t\t\t\t   return {\n\t\t\t\t\t\t  enabled : false,\n\t\t\t\t\t\t  classes: 'offday',\n\t\t\t\t\t\t  tooltip: 'Off Day'\n\t\t\t\t\t   };\n\t\t\t\t   }\n\t\t\t\t\treturn {\n\t\t\t\t\t  enabled : false,\n\t\t\t\t\t  tooltip: backDatetitle\n\t\t\t\t   };\n\t\t\t\t  return;\n\t\t\t  }\n\t    });\n\t\t/*====== CALL POP FOR PL/PT IN NORMAL CASE=======*/\t\t\n\t\tif(checkService == 'Normal')\n\t\t{\n\t\t\tif((jQuery.inArray(2, allowArray)!='-1') || (jQuery.inArray(3, allowArray)!='-1') || (jQuery.inArray(4, allowArray)!='-1')) \n\t\t    {\n\t\t\t\t/*$(document).on('click', '.fullcap,.fullcapspecial', function () {\n\t\t\t\t$(".datepicker").hide();\n\t\t\t\t$('.popupBG').show();\n\t\t\t\t$('#IDBodyPanel').show();\n\t\t\t\t});\n\t\t\t\t$(".popupCloseIcon").click(function() {\n\t\t\t\t$(".popupBG").hide();\n\t\t\t\t$("#IDBodyPanel").hide(); \n\t\t\t\t});*/\n\t\t\t\n\t\t\t\t/*$('input[type=radio][name=serviceChange]').change(function() {\n\t\t\t\tif (this.value == 'Premium') {\n\t\t\t\t\t$("#premiumService").prop('value', 'GO FOR PREMIUM');\n\t\t\t\t}\n\t\t\t\telse if (this.value == 'Prime') {\n\t\t\t\t\t$("#premiumService").prop('value', 'GO FOR PRIME TIME');\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t});*/\n\t\t\t}\n\t\t}\n\t\t/*====== CALL POP FOR PL/PT IN NORMAL CASE=======*/\n\t\tvar eventhandler = function(e) {\n\t\t   e.preventDefault();      \n\t\t}\n\t\tif (checkService == 'Premium' || checkService == 'Prime') {\n\t\t\t$('input[name="vasId[]"]:checked').each(function() {\n\t\t\t   $("#vasId"+this.value).bind('click', eventhandler);\n\t\t\t});\n\t\t}\n\t\t\n\t\tif (checkService != 'Premium')\n\t\t{\n\t\t\t$(document).on('click', '.chkbox', function () {\n\t\t\t\tif($(this).val() == 1)\n\t\t\t\t{\n\t\t\t\t\tif($(this).is(":checked")){\n\t\t\t\t\t  //$("#vasId6").prop('checked', true);\n\t\t\t\t\t  //$("#vasId6").bind('click', eventhandler);\n\t\t\t\t\t  //$("#vasId15").prop('checked', true);\n\t\t\t\t\t  //$("#vasId15").bind('click', eventhandler);\n\t\t\t\t\t}else{\n\t\t\t\t\t  //$("#vasId6").prop('checked', false);\t\n\t\t\t\t\t  //$("#vasId6").unbind('click', eventhandler);\n\t\t\t\t\t  //$("#vasId15").prop('checked', false);\t\n\t\t\t\t\t  //$("#vasId15").unbind('click', eventhandler);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\t\t\n\t});\n`;

			let availableDate = getAvailableDate(code);
			if (availableDate) {
				fillFormData(availableDate);
			} else {
				setTimeout(function () {
					window.location.reload(1);
				}, 30 * 1000);
			}
		}
	}
})();
