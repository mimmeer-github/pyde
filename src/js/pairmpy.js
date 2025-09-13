let mybutton = document.getElementById("button")

mybutton.addEventListener("click", async () => {
  let usbDevOpt = {
    "filters": [
      {
        "vendorId": 0x2e8a,
        "productId": 0x000f
      }
    ]
  };

  let microCont = await navigator.usb.requestDevice(usbDevOpt);
});
