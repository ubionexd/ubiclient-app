const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();
const msmc = require("msmc");
const fetch = require("node-fetch");
//msmc's testing enviroment sometimes runs into this issue that it can't load node fetch
msmc.setFetch(fetch)
msmc.fastLaunch("raw",
    (update) => {
        //A hook for catching loading bar events and errors, standard with MSMC
        console.log("CallBack!!!!!")
        console.log(update)
    }).then(result => {
        //Let's check if we logged in?
        if (msmc.errorCheck(result)){
            console.log(result.reason)
            return;
        }
        //If the login works
        let opts = {
            clientPackage: null,
            // Pulled from the Minecraft Launcher core docs , this function is the star of the show
            authorization: msmc.getMCLC().getAuth(result),
            root: "./minecraft",
            version: {
                number: "1.18.1",
                type: "release",
                custom: "fabric"
            },
            memory: {
                max: "6G",
                min: "4G"
            }
        }
        console.log("Starting!")
        launcher.launch(opts);

        launcher.on('debug', () => console.log(null));
        launcher.on('data', () => console.log(null));
    }).catch(reason => {
        //If the login fails
        console.error(new Error("We failed to log someone in because : " + reason));
    })