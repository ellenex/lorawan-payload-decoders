**Ellenex lorawan Payload decoders for new generation.**

This folder contains the payload decoder for CBOR packets which can be used for any platforms by making some changes on the code.

This decoder is for all the devices and decodes data as per the Lorawan Integration guide. 
This has not been implemented on any Repository. If the device is Version 6 then this decoder has to be used.

The main idea is that different LoRaWAN platforms expect different formats for the payload decoder output. The underlying CBOR decoding logic is the same, but the “wrapper” around it changes.
For each different platform the changes has to be made on the (// --- Generic entry point) section.

**1️⃣ TTN / TTS (The Things Network / The Things Stack)**

    Entry point: Must be a function called decodeUplink.
    Input: An object with a bytes array (input.bytes) representing the payload.
    Output: Must be an object with these keys:
    
      {
        "data": { ...decoded payload... },
        "warnings": [ ...optional messages... ],
        "errors": [ ...optional messages... ]
      }

**Example**

      function decodeUplink(input) {
        try {
          const parsed = decodeCBOR(input.bytes);
          return { data: parsed, warnings: [], errors: [] };
        } catch (e) {
          return { data: {}, warnings: [], errors: [e.message] };
        }
      }
**TTN console will call this automatically for each uplink, and it expects this exact format**

**2️⃣ ChirpStack**

      Entry point: Can be any function, TTN-style wrapper is not required.
      Input: Typically just the payload in bytes (or base64, depending on your setup).
      Output: Return the JSON object directly (no warnings or errors wrapper needed).

**Example:**

      function decodeChirpStack(input) {
        const parsed = decodeCBOR(input.bytes);
        return parsed; // JSON object
      }
**ChirpStack will use the returned object as the device payload fields.**

**3️⃣ Helium / Loriot / Custom MQTT broker**

      Entry point: Typically your own function (e.g., decode).
      Input: The payload bytes, often from MQTT (payload), not wrapped in input.bytes.
      Output: Return the decoded object, or process it however you need.

**Example:**

    function decode(payload) {
    
      // convert base64 or hex to byte array first if needed
      const bytes = Array.from(payload); 
      const parsed = decodeCBOR(bytes);
      return parsed;
    }
**You can then publish the parsed object to your database, dashboard, or analytics pipeline.**

**3️⃣ Actility / ThingPark**

      Entry point: Typically your own function (e.g., decodeActility).
      Input: The payload bytes, sometimes from hex or base64, depending on configuration. You may need to convert to a byte array.
      Output: Return the decoded JSON object. No wrapper (data/warnings/errors) is required.

**Example:**

        function decodeActility(payloadBytes) {
      // If payload is a base64 string, convert it to a byte array first:
      // const bytes = Array.from(Buffer.from(payloadBytes, 'base64'));
    
      // If payload is already a byte array:
      const bytes = payloadBytes;
    
      const parsed = decodeCBOR(bytes);
      return parsed; // JSON object
    }

      
If you have any questions or quieries regarding payload decoders then please feel free to contact us at Support@lpwan.group
