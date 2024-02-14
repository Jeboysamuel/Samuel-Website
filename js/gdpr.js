class GDPR {

    constructor() {
        this.bindEvents();

        if(this.cookieStatus() !== 'accept' && this.cookieStatus() !== 'reject') this.showGDPR();

    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.hideGDPR();
        });

        let buttonDecline = document.querySelector('.gdpr-consent__button--reject');
        buttonDecline.addEventListener('click', () =>{
            this.cookieStatus('reject')
            this.hideGDPR()
        })

    }

    resetContent(){
        const classes = [
            '.content-gdpr-accept',

            '.content-gdpr-reject',

            '.content-gdpr-not-chosen'];

        for(const c of classes){
            document.querySelector(c).classList.add('hide');
            document.querySelector(c).classList.remove('show');
        }
    }


    cookieStatus(status) {

        // let yyyy = today.getFullYear();
        // let mm = today.getMonth() + 1; // Months start at 0!
        // let dd = today.getDate();
        //
        // if (dd < 10) dd = '0' + dd;
        // if (mm < 10) mm = '0' + mm;



        if (status){
            localStorage.setItem('gdpr-consent-choice', status);

            let today = new Date();
            let formattedDate = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
            let formattedTime = today.getHours() + ':' + today.getMinutes();

            let metData = {datum: formattedDate, tijd: formattedTime}

            localStorage.setItem('gdpr-time-date' ,  JSON.stringify(metData))
        }

//student uitwerking

        return localStorage.getItem('gdpr-consent-choice');
    }

//student uitwerking


    hideGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('hide');
        document.querySelector(`.gdpr-consent`).classList.remove('show');
    }

    showGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('show');
    }

}

const gdpr = new GDPR();

