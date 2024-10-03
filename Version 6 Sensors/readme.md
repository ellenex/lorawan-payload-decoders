Ellenex lorawan Payload decoders for new generation.

This folder contains the payload decoder for CBOR packets.

This decoder is for all the devices and decodes data as per the Lorawan Integration guide. 
This has not been implemented on TTN Repository. If the device is Version 6 then this decoder has to be used.

This decoder has to be manually add to the device payload formatter on any platform.
Steps to add it to platform.
Example for TTN.
1. Log in to the TTN Console:
Visit the TTN Console and log in with your account credentials.
2. Add the device to the preffered Application:
Once logged in, go to Applications from the sidebar and add the device  and go to thet particular device.
3. Go to Payload Formatters:
After going into the device section, navigate to the Payload Formatters tab.
4. Choose Uplink Formatters:
Under the Payload Formatters section, you’ll see options for both Uplink and Downlink formatters. Choose Uplink to decode data being sent from your device to the network.
5. Select Custom JavaScript:
In the Uplink Payload Formatter section, select Custom Javascript. This allows you to write custom JavaScript to decode your device’s payload.
6. Write the Decoder Function:
Copy the whole code from cbor.js file and paste it.
8. Save the Decoder:
After Pasting the decoder function, click Save Changes to apply the decoder to the application.
9. Monitor Data:
Once the decoder is in place, it will automatically decode the uplink messages from your device. You can check the Data tab in the application to see decoded payloads.

