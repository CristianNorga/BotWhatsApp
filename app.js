const client = null;
const sessionLocation = './session.json';
const session = null;
	
if (!this.data.client && !this.data.waInitialized) {
  try {
    if (fs.existsSync(this.data.sessionLocation)) {
      //
    } else {
      this.data.client = new Client();

      this.data.client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        qrcode.generate(qr, { small: true });
      });

      this.data.client.on('authenticated', (session) => {
        this.data.session = session;
        fs.writeFile(
          this.data.sessionLocation,
          JSON.stringify(session),
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
      });

      this.data.client.initialize();
      this.data.waInitialized = true;
    }

    this.data.client.on('ready', () => {
      console.log('Client is ready!');
    });

    this.data.client.on('message', (msg) => {
      if (msg.body == '!ping') {
        msg.reply('pong');
      }
    });
  } catch (error) {
    console.log(error);
  }
}
