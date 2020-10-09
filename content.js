chrome.runtime.onMessage.addListener(
  function() {
    //If on the App 400, copy the data on screen
    if (document.querySelector("title").innerText.indexOf("Customer Order") != -1) {
      //The letter variables below were coded to grab very specific elements, designed only to work with App 400
      let a = document.querySelectorAll("strong")[2].innerText;
      let b = document.querySelectorAll("span")[29].innerText;
      //if b contins a comma, split everything that comes after into variable "c", Address Line 2
      let c = null;
      if (b.split(", ")[1]) {
        c = b.split(", ")[1];
        b = b.split(", ")[0];
      }
      let d = document.querySelectorAll("span")[30].innerText.split(",")[0].replace(/,/g, '');
      let e = document.querySelectorAll("span")[30].innerText.split(", ")[1];
      e = e.split(" ")[0];
      let f = document.querySelectorAll("span")[30].innerText.split(", ")[1].replace(/\D/g,'');
      let g = document.querySelector("h2").innerText.split("-")[1];
      let h = document.querySelectorAll("strong")[3].innerText;

      chrome.storage.local.set({CBNa: a, CBAd1: b, CBCi: d, CBSt: e, CBZi: f, CBON: g, CBPN: h}, function() {
        console.log("Copied");
      });
      if (c) {
        chrome.storage.local.set({CBAd2: c});
      }
      alert("Double Check Data copied:\n " + a + " \n " + b + " \n " + c + " \n " + d + " \n " + e + " \n " + f + " \n " + g + " \n " + h + " \n");

    }
    //If on the FedEx page, run the paste command
    if (document.querySelector("title").innerText === "FedEx Ship Manager - Create a Shipment") {
      console.log("FedEx Site Detected, running paste");

      chrome.storage.local.get(['CBNa', 'CBAd1', 'CBCi', 'CBSt', 'CBZi', 'CBON', 'CBPN'], function(result) {
        console.log(result);
        document.getElementById("toData.contactName").value = result.CBNa;
        document.getElementById("toData.addressLine1").value = result.CBAd1;
        document.getElementById("toData.zipPostalCode").value = result.CBZi;
        document.getElementById("toData.city").value = result.CBCi;
        document.getElementById("toData.stateProvinceCode").value = result.CBSt;
        document.getElementById("toData.phoneNumber").value = result.CBPN;
        document.getElementById("billingData.yourReference").value = "SS 404 " + result.CBON;
        document.getElementById("psd.mps.row.weight.0").value = "1";
      });

      chrome.storage.local.get(['CBAd2'], function(result) {
        if (result) {
          document.getElementById("toData.addressLine2").value = result.CBAd2;
        }
      });
      //Data is cleared immediately after it is inputted on Fedex to prevent mistakes such as using the data for a different order
      //A user would have to copy the data again from the App 400 to paste it again.
      chrome.storage.local.set({CBNa: null, CBAd1: null, CBAd2: null, CBCi: null, CBSt: null, CBZi: null, CBON: null, CBPN: null}, function() {
        console.log("Data erased");
      });
    }
  }
);



