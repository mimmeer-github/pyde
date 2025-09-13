let mybutton = document.getElementById("button");
let mc = null;

async function loadMCData() {
  let resp = await fetch("static/data/microcontrollers.json");
  if (!resp.ok) throw new Error(`microcontrollers.json couldn't be fetched with HTTP error: ${resp.status}`);
  let data = await resp.json();
  return data;
}

let data = await loadMCData();

async function getUsb() {
  let mcs = data.microCont
  let options = {
    "filters": []
  }
  mcs.forEach((mc) => {
    options.filters.push({
      "vendorId": mc.usb_id_flash.vid,
      "productId": mc.usb_id_flash.pid
    });
  });
  console.log(options);
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
