// Add this code block if the device is with Dry Contact on the Sensor Mapping Section.


"DC": {
  name: "Dry Contact",
  transform: v => {
    if (v === 0) return `0 = Open Circuit`;
    if (v === 1) return `1 = Closed Circuit`;
    return `${v} = Unknown state`;
  }
}
