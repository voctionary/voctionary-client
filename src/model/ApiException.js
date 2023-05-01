export default class ApiException
{

    httpStatus;
	message;
    isError;
    dateTime;

    constructor(data){
        if(data.httpStatus && data.message && data.isError !== undefined && data.dateTime){
            this.httpStatus = data.httpStatus;
            this.message = data.message;
            this.isError = data.isError;
            this.dateTime = data.dateTime;
        }
    }

}