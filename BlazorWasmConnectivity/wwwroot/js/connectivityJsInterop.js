let isOnline;
let interval;

export const connectivityStatusIndicator = {

    registerConnectivityStatusHandler: async function (dotNetObjRef) {

        const checkStatus = async () => {
            const result = await checkOnlineStatus();
            if (isOnline !== result) {
                isOnline = result;
                dotNetObjRef.invokeMethodAsync("OnConnectivityChanged", result);
            }
        };

        const connectivityStatusHandler = async () => {
            interval = setInterval(async () => {
                await checkStatus();
                console.log("ONCHECK");
            }, 30000);

            await checkStatus();
        };

        connectivityStatusHandler();        
    },
    dispose: function() {
        if (interval !== null) {
            clearInterval(interval);
        }
    }
};

const checkOnlineStatus = async () => {
    try {
        const online = await fetch("https://endereco_de_alguma_imagem_em_um_servidor?" + + (new Date()).getTime());
        return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
        return false;
    }
};


