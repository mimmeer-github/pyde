let mybutton = document.getElementById("button")

mybutton.addEventListener("click", async () => 
  try {
    let usbDevOpt = {
      "filters": [
        {
          "vendorId": 0x2e8a,
          "productId": 0x000f
        }
      ]
    };
    
    let microCont = await navigator.usb.requestDevice(usbDevOpt);

    console.log(microCont);
  }
  catch {
    console.log("Oops! Something went wrong, did you close the dialogue - or was it blocked?");
  }
});
