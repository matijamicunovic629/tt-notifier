import SockJS from 'sockjs-client';

let sock = null;


const initSockJS = () => {

    const requestArray = JSON.parse('[{"channel":"auth","body":{"hash2":"YHYZMEcVNy1K7ZtGFyEqv3v96pk1vRkAGP7R41QIeGk=","user_id":75346685}},{"channel":"onlineoffline","body":{"route":"getsub","users":[75346685,72847638]}},{"channel":"channels","body":{"channels":[15,704,913,6,106,320,77,20,335,323,7,9,669,305,500,3,13,759,68,17]}},{"channel":"channels","body":{"channels":["channel_resource_5_75259","channel_resource_5_1365","channel_resource_5_744"]}},{"channel":"onlineoffline","body":{"route":"getsub","users":[75346685,72847638]}},{"channel":"channels","body":{"channels":[15,704,913,6,106,320,77,20,335,323,7,9,669,305,500,3,13,759,68,17]}},{"channel":"onlineoffline","body":{"route":"getsub","users":[75346685,72847638]}}]');

    sock = new SockJS("https://notifications.freelancer.com");

    sock.onopen = (e) => {
        console.log("socket onOpen", e);

        for(let i = 0; i < requestArray.length; i ++) {
            sock.send(JSON.stringify(requestArray[i]));
        }
    };

    sock.onclose = (e) => {
        console.log("socket onClose", e);
    };

    sock.onmessage = (e) => {
        console.log("onMessage", e);
    };

    sock.onerror = (e) => {
        console.log("socket onError", e);
    };

}

export const runEngine = () => {

    initSockJS();

}
