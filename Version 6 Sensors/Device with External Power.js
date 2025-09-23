// if the device is with external power then you have to add this clode block on the Sensor mapping section.


  "ps": {
    name: "Pulse State",
    transform: v => {
      if (v === 0) return `0 = Device is operating on External Power Supply`;
      if (v === 1) return `1 = Device is operating on Battery`;
      return `${v} = Device is operating on Unknown`;
    }
  }
