let mybutton = document.getElementById("button");
let mc = null;

async function loadMCData() {
  let resp = await fetch("../static/data/microcontrollers.json");
  if (!resp.ok) throw new Error(`microcontrollers.json couldn't be fetched with HTTP error: ${resp.status}`);
  let data = resp.json();
  return data;
}

async function getUsb() {
  let mcs = (await loadMCData()).microCont
  let options = {
    "filters": []
  }
  mcs.forEach((mc) => {
    options.filters.push({
      "vendorId": mc.usb_id_flash.vid,
      "productId": mc.usb_id_flash.pid
    });
  });
  try {
    let microCont = await navigator.usb.requestDevice(options);
    return microCont;
  }
  catch (err) {
    console.error(`We have a strange problem. ${err}`);
    return null;
  }
}

mybutton.addEventListener("click", async () => 
  {
    try {
      mc = await getUsb();
      console.log(mc);
    }
    catch {
      console.log("Oops! Something went wrong, did you close the dialogue - or was it blocked?");
    }
});
