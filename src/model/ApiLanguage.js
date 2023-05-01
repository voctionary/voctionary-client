export default class ApiLanguage
{

    key;
    alternateKey;
    name;

    constructor(data){
        if(data.key && data.alternateKey && data.name){
            ApiLanguages.
            this.key = data.key;
            this.alternateKey = data.alternateKey;
            this.name = data.name;
        }
    }

}