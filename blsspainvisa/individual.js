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

		let firstName = "Ali";
		let lastName = "Raza";
		let dateOfBirth = "1994-08-23"; // yyyy-mm-dd
		let pptNumber = "PL123456";
		let pptIssueDate = "2017-08-1"; // yyyy-mm-dd
		let pptExpiryDate = "2027-07-30"; // yyyy-mm-dd
		let pptIssuePlace = "Rawalpindi";
		let visaTypeIndex = "3"; // Index of visa type from dropdown
		let passportTypeIndex = "7"; // Index of passport type from dropdown
		let sms = true;
		let formFilling = false;
		let photocopy = false;
		let photograph = true;
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
			let code = document.scripts[i].text;

			let availableDate = getAvailableDate(code);
			if (availableDate) {
				fillFormData(availableDate);
			} else {
				setTimeout(function () {
					window.location.reload(1);
				}, 15 * 1000);
			}
		}
	}
})();
