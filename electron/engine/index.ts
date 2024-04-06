// @ts-ignore
import SockJS from 'sockjs-client';
import {extractNecessaryDataFromMessage, getNecessaryInfosByUserId} from "./apis";
import {createMyNotification} from "../notification";
import notification from "../notification/Notification";

let sock: any = null;

const checkProject = (notificationOption) => {

    // country filter
    if (notificationOption.country === 'India' &&
        notificationOption.country === 'Pakistan' &&
        notificationOption.country === 'Bangladesh')
        return false;

    // verified filter
    if (!notificationOption.payment_verified ||
        !notificationOption.deposit_made)
        return false;

    // price filter
    if (notificationOption.projectType === 'hourly' &&
        notificationOption.maxBudget > 0 &&
        notificationOption.maxBudget < 15)
        return false;

    if (notificationOption.projectType === 'fixed' &&
        notificationOption.maxBudget < 150
    )
        return false;


    return true;
}

const handleProject = async (projectData) => {

    const userId = projectData.userId;
    const data = await getNecessaryInfosByUserId(userId);
    const exractedData = extractNecessaryDataFromMessage(projectData);
    console.log("__________________________")
    const notificationOption = {
        ...data,
        ...exractedData
    };
    console.log(notificationOption)
    console.log("__________________________")
    if (checkProject(notificationOption)) {
        createMyNotification(notificationOption);
    }
}

const initSockJS = () => {

    const requestArray = [
        `{"channel":"auth","body":{"hash2":"YHYZMEcVNy1K7ZtGFyEqv3v96pk1vRkAGP7R41QIeGk=","user_id":75346685}}`,
        `{"channel":"onlineoffline","body":{"route":"getsub","users":[]}}`,
        `{"channel":"channels","body":{"channels":[335,9,669,3,69,704,1092,237,113,598,1315,343,90,2372,2376,500,759,979,1126,535,22,1402,292,995,13,1189,1212,7,39,20,158,119,95,913,197,59,58,44,15,2047,695,116,1935,2397,287,31,30,564,2791,2836,147,36,55,712,318]}}`
    ];

    sock = new SockJS("https://notifications.freelancer.com");

    sock.onopen = (e) => {
        console.log("socket onOpen", e);

        for(let i = 0; i < requestArray.length; i ++) {
            sock.send(requestArray[i]);
        }
    };

    sock.onclose = (e) => {
        console.log("socket onClose", e);
    };

    sock.onmessage = (e) => {
        console.log("onMessage", e);
        try {

            const message = JSON.parse(e.data);
            if (message.channel === 'user' && message.body.type === 'project') {
                handleProject(message.body.data);
            }

        } catch(e) {

        }
    };

    sock.onerror = (e) => {
        console.log("socket onError", e);
    };

}

export const runEngine = () => {

    initSockJS();

}
